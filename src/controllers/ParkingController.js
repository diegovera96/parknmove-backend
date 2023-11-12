const db = require("../models");
const Parking = db.parking;
const Parking_User = db.parking_user;

// Función para obtener todos los datos del estacionamiento
const getAllParkingData = async (req, res) => {
  try {
    const parkingData = await Parking.findAll();
    res.status(200).json(parkingData);
  } catch (error) {
    console.error("Error fetching parking data:", error);
    res.status(500).json({ error: "Error fetching parking data" });
  }
};

const getOccupiedSpaces = async (req, res) => {
  try {
    const occupiedSpaces = await Parking_User.findAll({
      where: {
        exit_time: null,
      },
    });

    res.json(occupiedSpaces.length);
  } catch (error) {
    console.error("Error fetching occupied spaces:", error);
    res.status(500).json({ error: "Error fetching occupied spaces" });
  }
};

// Función para calcular el precio total (Manteniendo tu función original)
const calculateExtraFee = async (req, res) => {
  try {
    const parkingId = 1;
    const places = await Parking_User.findAll({
      where: {
        parking_id: parkingId,
        exit_time: null
      },
    });

    const parking = await Parking.findOne({
      where: {
        id: parkingId, // Reemplaza con tu condición
      },
    });
    const occupiedPlaces = places.length;
    const totalPlaces = parking.floor_count * parking.places_per_floor;
    const ExtraFee = (parking.base_price * occupiedPlaces) / totalPlaces;

    res.status(200).json({ ExtraFee });
  } catch (error) {
    console.error("Error calculating total places:", error);
    res.status(500).json({ error: "Error calculating total places" });
  }
};

const calculateFinalPayment = async (req, res) => {
  try {
    const parkingId = 1;
    const userId = req.body.user_id;
    const transaction = await Parking_User.findOne({
      where: {
        parking_Id: parkingId,
        user_Id: userId,
        // Reemplaza con tu condición
      },
    });

    const parking = await Parking.findOne({
      where: {
        id: parkingId, // Reemplaza con tu condición
      },
    });

    const dateToHours = (transaction.exit_time - transaction.entry_time)/3600000;
    const FinalPayment = Math.round(parking.base_price + transaction.extra_fee * dateToHours);

    const paymentUpdate = await Parking_User.update({
      total_price: FinalPayment,
    }, {
      where: {
        parking_Id: parkingId,
        user_Id: userId,
      },
    });

    res.status(200).json( FinalPayment );
  } catch (error) {
    console.error("Error calculating payment:", error);
    res.status(500).json({ error: "Error calculating payment" });
  }
};

const registerPayment = async (req, res) => {
  try{
    const parkingId = 1;
    const userId = req.body.user_id;

    const registerDate = new Date();
    const transaction = await Parking_User.update({
      exit_time: registerDate,
    }, {
      where: {
        parking_Id: parkingId,
        user_Id: userId,
      },
    });
    res.status(200).json({ registerDate });
  }catch(error){
    console.error("Error registering payment:", error);
    res.status(500).json({ error: "Error registering payment" });
  }
};

const getParkingUserData = async (req, res) => {
  try{
    const parkingId = req.body.parking_id;
    const userId = req.body.user_id;

    const info = await Parking_User.findOne({
      where: {
        parking_Id: parkingId,
        user_Id: userId,
        exit_time: null,
      },
    });

    res.status(200).json( info );
  }catch(error){
    console.error("Error getting parking user data:", error);
    res.status(500).json({ error: "Error getting parking user data" });
  }
};

const getHistory = async (req, res) => {
  try{
    const userId = req.params.userId;

    const history = await Parking_User.findAll({
      where: {
        user_Id: userId,
      },
    });

    res.status(200).json({ history });
  }catch(error){
    console.error("Error getting historial:", error);
    res.status(500).json({ error: "Error getting historial" });
  }
}

export const methods = {
  getAllParkingData,
  calculateExtraFee,
  calculateFinalPayment,
  getHistory,
  getOccupiedSpaces,
  registerPayment,
  getParkingUserData
};

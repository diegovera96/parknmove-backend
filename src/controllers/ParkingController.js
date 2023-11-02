const db = require("../models");
const Parking = db.parking;
const Parking_User = db.parking_user;

// Función para obtener todos los datos del estacionamiento
const getAllParkingData = async (req, res) => {
  try {
    const parkingData = await Parking.findAll();
    res.json(parkingData);
  } catch (error) {
    console.error("Error fetching parking data:", error);
    res.status(500).json({ error: "Error fetching parking data" });
  }
};

const getOccupiedSpaces = async (req, res) => {
  try {
    const parkingId = 1;

    const occupiedSpaces = await Parking_User.findAll({
      where: {
        parking_id: parkingId,
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
    const parkingId = req.query.id;
    const places = await Parking_User.findAll({
      where: {
        parking_id: parkingId,
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

    console.log(ExtraFee);
    res.json({ ExtraFee });
  } catch (error) {
    console.error("Error calculating total places:", error);
    res.status(500).json({ error: "Error calculating total places" });
  }
};

const calculateFinalPayment = async (req, res) => {
  try {
    const parkingId = req.query.parkingid;
    const userId = req.query.userid;

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

    const FinalPayment = parking.base_price + transaction.extra_fee;

    console.log(FinalPayment);
    res.json({ FinalPayment });
  } catch (error) {
    console.error("Error calculating payment:", error);
    res.status(500).json({ error: "Error calculating payment" });
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

    console.log(history);
    res.json({ history });
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
};

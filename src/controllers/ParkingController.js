const db = require("../models");
const Parking = db.parking;

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

// Función para calcular el precio total (Manteniendo tu función original)
const calculateTotalPlaces = async (req, res) => {
  try {
    const places = await ParkingUser.findAll({
      where: {
        parking_id: 1,
      },
    });

    const allParkingPlaces = await Parking.findAll();

    const basePriceRecord = await Parking.findOne({
      where: {
        id: 1, // Reemplaza con tu condición
      },
    });

    const totalPlaces = allParkingPlaces.length;
    const placesOccupied = places.length;
    const basePrice = basePriceRecord ? basePriceRecord.base_price : 0;

    const total_price = (placesOccupied / totalPlaces + 1) * basePrice * 5;

    console.log(total_price, totalPlaces, basePrice, placesOccupied);
    res.json({ total_price });
  } catch (error) {
    console.error("Error calculating total places:", error);
    res.status(500).json({ error: "Error calculating total places" });
  }
};

export const methods = {
  getAllParkingData,
  calculateTotalPlaces,
};

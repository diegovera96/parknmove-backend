const db = require("../models");

const Parking = db.parking;
const ParkingUser = db.parking_user;

const calculateTotalPlaces = async (req, res) => {
  const places = await ParkingUser.findAll({
    where: {
      parking_id: 1,
    },
  });

  const allParkingPlaces = await Parking.findAll();

  const basePriceRecord = await Parking.findOne({
    where: {
      id: 1, // Replace with your condition
    },
  });

  const totalPlaces = allParkingPlaces.length;
  const placesOccupied = places.length;
  const basePrice = basePriceRecord ? basePriceRecord.base_price : 0;

  const total_price = (placesOccupied / totalPlaces + 1) * basePrice * 5;

  console.log(total_price, totalPlaces, basePrice, placesOccupied);
  res.json({ total_price });
};

export const methods = {
  calculateTotalPlaces,
};

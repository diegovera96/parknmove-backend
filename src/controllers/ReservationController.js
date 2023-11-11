const db = require("../models");
const Reservation = db.parking_user;

// Función para crear una reserva
const createReservation = async (req, res) => {
  try {
    const { user_id, parking_id, total_price, entry_time, exit_time, extra_fee } = req.body;
    
    const validation = await Reservation.findOne({
      where: {
        parking_id: req.body.parking_id,
        user_id: req.body.user_id,
      },
    });

    if (validation){
      res.status(400).json({ error: "Ya existe una reserva con ese usuario y estacionamiento" });
    } else {
      // Crea una nueva reserva en la base de datos
      const reservation = await Reservation.create({
      user_id: req.body.user_id,
      parking_id: req.body.parking_id,
      total_price: 0,
      entry_time: req.body.entry_time,
      exit_time: req.body.exit_time,
      extra_fee: req.body.extra_fee,
    });
    // Devuelve la reserva creada en la respuesta
    res.status(201).json(reservation);
    }
    

  } catch (error) {
    console.error("Error al crear la reserva:", error);
    res.status(500).json({ error: "Error al crear la reserva" });
  }
};

export const reservationController = {
  createReservation,
};

const db = require("../models");
const Reservation = db.parking_user;

// Función para crear una reserva
const createReservation = async (req, res) => {
  try {
    const { user_id, parking_id, entry_time } = req.body;
    
    // Crea una nueva reserva en la base de datos
    const reservation = await Reservation.create({
      user_id,
      parking_id,
      entry_time,
    });
    
    // Devuelve la reserva creada en la respuesta
    res.status(201).json(reservation);
  } catch (error) {
    console.error("Error al crear la reserva:", error);
    res.status(500).json({ error: "Error al crear la reserva" });
  }
};

export const reservationController = {
  createReservation,
};

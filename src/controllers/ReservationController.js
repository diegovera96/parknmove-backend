const db = require("../models");
const Reservation = db.parking_user;

// Función para crear una reserva
const createReservation = async (req, res) => {
  console.log(req.body);
  try {
    const { user_id, parking_id, total_price, entry_time, exit_time, extra_fee } = req.body;
    
    const validation = await Reservation.findOne({
      where: {
        parking_id: req.body.parking_id,
        user_id: req.body.user_id,
        exit_time: null,
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

const getReservationByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    // Busca una reserva con el user_id proporcionado y exit_time nulo
    const reservation = await Reservation.findOne({
      where: {
        user_id: userId,
        exit_time: null,
      },
    });

    if (reservation) {
      // Si se encuentra una reserva, devuélvela en la respuesta
      res.status(200).json(reservation);
    } else {
      // Si no se encuentra ninguna reserva, devuelve un mensaje indicando eso
      res.status(404).json({ message: "No se encontró ninguna reserva activa para este usuario." });
    }

  } catch (error) {
    console.error("Error al obtener la reserva:", error);
    res.status(500).json({ error: "Error al obtener la reserva" });
  }
};

const getHistory = async (req, res) => {
  try{
    

    const history = await Parking_User.findAll({
    });

    res.status(200).json({ history });
  }catch(error){
    console.error("Error getting historial:", error);
    res.status(500).json({ error: "Error getting historial" });
  }
}

export const reservationController = {
  createReservation,
  getReservationByUserId,
  getHistory,
};

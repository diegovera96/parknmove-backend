import { Router } from "express";
import { methods as ParkingController } from "../controllers/ParkingController";
import { reservationController } from "../controllers/ReservationController";

const router = Router();

// Obtener todos los datos de estacionamientos
router.get("/parking/", ParkingController.getAllParkingData);

router.get("/", (req, res) => {
  res.send("Parknmove API");
});

// Calcular costo adicional
router.get("/calculateExtraFee", ParkingController.calculateExtraFee);

// Calcular pago final
router.post("/calculateFinalPayment", ParkingController.calculateFinalPayment);

// Crear una nueva reserva (nueva ruta POST)
router.post("/reservations", reservationController.createReservation);

// Ruta para obtener espacios ocupados en un estacionamiento específico
router.get("/parking/occupiedSpaces", ParkingController.getOccupiedSpaces);

router.get("/parking/history/:userId", ParkingController.getHistory);

router.post("/registerPayment", ParkingController.registerPayment);

router.post("/parkinguserdata", ParkingController.getParkingUserData);

// Ruta para obtener una reserva por user_id y exit_time nulo
router.get("/reservations/user/:userId", reservationController.getReservationByUserId);

router.get("/parking/getParkings", ParkingController.getParkings);

export default router;

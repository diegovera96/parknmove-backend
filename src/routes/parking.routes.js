import { Router } from "express";
import { methods as ParkingController } from "../controllers/ParkingController";
import { reservationController } from "../controllers/ReservationController"; // Asegúrate de importar correctamente el controlador de reservas

const router = Router();

// Obtener todos los datos de estacionamientos
router.get("/parking", ParkingController.getAllParkingData);

router.get("/", (req, res) => {
  res.send("Parknmove API");
});

// Calcular costo adicional
router.get("/calculateExtraFee", ParkingController.calculateExtraFee);

// Calcular pago final
router.get("/calculateFinalPayment", ParkingController.calculateFinalPayment);

// Crear una nueva reserva (nueva ruta POST)
router.post("/reservations", reservationController.createReservation);

// Otras rutas relacionadas con reservas...

export default router;

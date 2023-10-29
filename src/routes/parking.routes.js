import { Router } from "express";
import { methods as ParkingController, methods } from "../controllers/ParkingController";

const router = Router();

// Obtener todos los datos de estacionamientos
router.get("/parking", ParkingController.getAllParkingData);

router.get("/", (req, res) => {
  res.send("Parknmove API");
});
// /calculateExtraFee?id=1
router.get("/calculateExtraFee", ParkingController.calculateExtraFee);
// //calculateFinalPayment?parkingid=1&userid=2
router.get("/calculateFinalPayment", ParkingController.calculateFinalPayment);

// /Historial?userid=1
router.get(/Historial/, ParkingController.getHistorial);
export default router;




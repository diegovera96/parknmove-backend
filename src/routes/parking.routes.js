import { Router } from "express";
import { methods as ParkingController, methods } from "../controllers/ParkingController";

const router = Router();

// Obtener todos los datos de estacionamientos
router.get("/parking", ParkingController.getAllParkingData);

router.get("/", (req, res) => {
  res.send("Parknmove API");
});

export default router;




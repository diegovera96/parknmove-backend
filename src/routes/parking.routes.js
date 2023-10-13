import { Router } from "express";
import {
  methods as ParkingController,
  methods,
} from "../controllers/ParkingController";
const router = Router();

router.get("/", (req, res) => {
  res.send("Hello World");
});

router.get("/parking", methods.calculateTotalPlaces);
export default router;

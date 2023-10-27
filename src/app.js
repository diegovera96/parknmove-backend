import express from "express";
import morgan from "morgan";
import cors from "cors"; // Importa CORS
import jwt from "jsonwebtoken";

const app = express();

//Importing routes
import userRoutes from "./routes/user.routes";
import parkingRoutes from "./routes/parking.routes";

// Habilita CORS para permitir solicitudes desde cualquier dominio
app.use(cors());

//Settings
app.set("port", 4000);

//Middlewares
app.use(morgan("dev"));

app.use(parkingRoutes);

export default app;

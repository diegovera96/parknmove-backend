import express from "express";
import cors from "cors"; // Importa CORS
import jwt from "jsonwebtoken";
import path from "path";
import bodyParser from "body-parser";
import logger from "morgan";
import cookieParser from "cookie-parser";


const app = express();

//Importing routes
import userRouter from "./routes/user.routes";
import parkingRouter from "./routes/parking.routes";
var pug = require('pug');

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Habilita CORS para permitir solicitudes desde cualquier dominio
app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.urlencoded({ extended: false }));
// Configura bodyParser para parsear JSON
app.use(bodyParser.json());
//Settings
app.set("port", 4000);

app.use(userRouter);
app.use(parkingRouter);
export default app;

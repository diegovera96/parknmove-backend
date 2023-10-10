import express from "express";
import morgan from "morgan";

const app = express();
//Importing routes
import userRoutes from "./routes/user.routes";
import parkingRoutes from "./routes/parking.routes";

//Settings
app.set("port", 4000);

//Middlewares
app.use(morgan("dev"));

app.use(parkingRoutes);

export default app;

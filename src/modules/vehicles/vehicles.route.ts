import { Router } from "express";
import { vehicleController } from "./vehicles.controller";

const route = Router();
route.post("/", vehicleController.createVehicles);
route.get("/", vehicleController.getAllVehicles);
export const vehicleRoute = route;

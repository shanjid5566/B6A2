import { Router } from "express";
import { vehicleController } from "./vehicles.controller";

const route = Router();
route.post("/", vehicleController.createVehicles);
export const vehicleRoute = route;

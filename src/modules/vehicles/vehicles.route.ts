import { Router } from "express";
import { vehicleController } from "./vehicles.controller";

const route = Router();
route.post("/", vehicleController.createVehicles);
route.get("/", vehicleController.getAllVehicles);
route.get("/:vehicleId", vehicleController.getSingleVehicle);
export const vehicleRoute = route;

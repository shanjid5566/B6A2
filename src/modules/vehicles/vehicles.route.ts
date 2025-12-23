import { Router } from "express";
import { vehicleController } from "./vehicles.controller";
import authMiddleware from "../../middleware/auth.middleware";

const route = Router();
route.post("/",authMiddleware("admin"), vehicleController.createVehicles);
route.get("/", vehicleController.getAllVehicles);
route.get("/:vehicleId", vehicleController.getSingleVehicle);
route.put("/:vehicleId", vehicleController.updateVehicle);
export const vehicleRoute = route;

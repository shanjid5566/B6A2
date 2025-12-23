import { Request, Response } from "express";
import { vehicleServices } from "./vehicles.services";

const createVehicles = async (req: Request, res: Response) => {
  try {
    const result = await vehicleServices.createVehicles(req.body);
    res.status(201).json({
      success: true,
      message: "Successfully vehicle Created.",
      user: result?.rows[0] ?? null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create vehicle.",
      error: (error as Error)?.message ?? "Unknown error",
    });
  }
};
const getAllVehicles = async (req: Request, res: Response) => {
  try {
    const result = await vehicleServices.getAllVehicles();
    res.status(201).json({
      success: true,
      message: "Successfully Get all vehicles.",
      user: result?.rows ?? null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create vehicle.",
      error: (error as Error)?.message ?? "Unknown error",
    });
  }
};
export const vehicleController = {
  createVehicles,
  getAllVehicles,
};

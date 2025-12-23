import { Request, Response } from "express";
import { vehicleServices } from "./vehicles.services";
import { pool } from "../../config/db";

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

const getSingleVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehicleServices.getSingleVehicle(
      req.params.vehicleId as string
    );
    res.status(201).json({
      success: true,
      message: "Successfully single Get vehicles.",
      user: result?.rows[0] ?? null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get single vehicle.",
      error: (error as Error)?.message ?? "Unknown error",
    });
  }
};

const updateVehicle = async (req: Request, res: Response) => {
  const {
    vehicle_name,
    registration_number,
    daily_rent_price,
    availability_status,
  } = req.body;
  try {
    const result = await vehicleServices.updateVehicle(
      vehicle_name,
      registration_number,
      daily_rent_price,
      availability_status,
      req.params.vehicleId as string
    );
    res.status(201).json({
      success: true,
      message: "Successfully updated vehicle.",
      user: result?.rows[0] ?? null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed update vehicle.",
      error: (error as Error)?.message ?? "Unknown error",
    });
  }
};
const deleteVehicle = async (req: Request, res: Response) => {
  // console.log(req.params.vehicleId);
  try {
    const result = await vehicleServices.deleteVehicle(req.params.vehicleId as string);
    console.log(result)

    if (!result || result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Vehicle deleted successfully",
        data: result.rows,
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
export const vehicleController = {
  createVehicles,
  getAllVehicles,
  getSingleVehicle,
  updateVehicle,
  deleteVehicle,
};

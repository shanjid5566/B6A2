import { Request, Response } from "express";
import { bookingServices } from "./booking.services";

const createBooking = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const customerIdRaw = (req.user as any).id ?? (req.user as any).user_id;
  if (customerIdRaw === undefined) {
    return res.status(401).json({ error: "Invalid token: missing user id. Please sign in again." });
  }

  const { vehicle_id, rent_start_date, rent_end_date, daily_rate } = req.body;
  if (!vehicle_id || !rent_start_date || !rent_end_date || daily_rate === undefined) {
    return res.status(400).json({ error: "Missing required fields: vehicle_id, rent_start_date, rent_end_date, daily_rate" });
  }

  const daily_rate_number = Number(daily_rate);
  if (!isFinite(daily_rate_number) || daily_rate_number < 0) {
    return res.status(400).json({ error: "Invalid daily_rate" });
  }

  const startDate = new Date(rent_start_date as string);
  const endDate = new Date(rent_end_date as string);
  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    return res.status(400).json({ error: "Invalid rent_start_date or rent_end_date" });
  }

  const msPerDay = 1000 * 60 * 60 * 24;
  let days = Math.round((endDate.getTime() - startDate.getTime()) / msPerDay);
  if (days < 0) {
    return res.status(400).json({ error: "rent_end_date must be after rent_start_date" });
  }
  days = Math.max(days, 1);

  const total_price = daily_rate_number * days;

  try {
    const result = await bookingServices.createBooking(
      String(customerIdRaw),
      String(vehicle_id),
      String(rent_start_date),
      String(rent_end_date),
      total_price
    );
    res.status(201).json({
      success: true,
      message: "Booking created successfully.",
      user: result?.rows[0] ?? null,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "server",
      error: (error as Error).message,
    });
  }
};

export const bookingController = {
  createBooking,
};

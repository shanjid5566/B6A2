import { Request, Response } from "express";
import { pool } from "../../config/db";

const createBooking = async (
  customer_id: string,
  vehicle_id: string,
  rent_start_date: string,
  rent_end_date: string,
  total_price: number
) => {
  const result = await pool.query(
    `
        INSERT INTO bookings(customer_id,vehicle_id,rent_start_date,rent_end_date,total_price) VALUES ($1,$2,$3,$4,$5)
        `,
    [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price]
  );
  return result;
};

export const bookingServices = {
  createBooking,
};

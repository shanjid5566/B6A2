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

const getAllBookings = async () => {
  const result = await pool.query(`SELECT * FROM bookings ORDER BY id DESC`);
  return result;
};

const getBookingsByCustomer = async (customer_id: string) => {
  const result = await pool.query(
    `SELECT * FROM bookings WHERE customer_id = $1 ORDER BY id DESC`,
    [customer_id]
  );
  return result;
};

const hasOverlappingBooking = async (
  vehicle_id: string,
  rent_start_date: string,
  rent_end_date: string
) => {
  const result = await pool.query(
    `SELECT * FROM bookings WHERE vehicle_id = $1 AND NOT (rent_end_date < $2 OR rent_start_date > $3)`,
    [vehicle_id, rent_start_date, rent_end_date]
  );
  return result;
};

export const bookingServices = {
  createBooking,
  getAllBookings,
  getBookingsByCustomer,
  hasOverlappingBooking,
};

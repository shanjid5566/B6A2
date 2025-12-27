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

const getBookingById = async (id: string) => {
  const result = await pool.query(`SELECT * FROM bookings WHERE id = $1`, [id]);
  return result;
};

const deleteBookingById = async (id: string) => {
  const result = await pool.query(`DELETE FROM bookings WHERE id = $1 RETURNING *`, [id]);
  return result;
};

const markBookingReturned = async (bookingId: string) => {
  // find booking
  const bookingRes = await pool.query(`SELECT * FROM bookings WHERE id = $1`, [bookingId]);
  const booking = bookingRes.rows[0];
  if (!booking) return null;
  const vehicleId = booking.vehicle_id;
  const updateRes = await pool.query(`UPDATE vehicles SET availability_status = $1, updated_at = now() WHERE id = $2 RETURNING *`, [
    'available',
    vehicleId,
  ]);
  return { booking, vehicle: updateRes.rows[0] };
};

const autoReturnExpiredBookings = async () => {
  // mark vehicles available where booking end date is before today
  const result = await pool.query(`
    UPDATE vehicles
    SET availability_status = $1, updated_at = now()
    WHERE id IN (
      SELECT vehicle_id FROM bookings WHERE rent_end_date < CURRENT_DATE
    ) RETURNING *
  `, ['available']);
  return result;
};

export const bookingServices = {
  createBooking,
  getAllBookings,
  getBookingsByCustomer,
  hasOverlappingBooking,
  getBookingById,
  deleteBookingById,
  markBookingReturned,
  autoReturnExpiredBookings,
};

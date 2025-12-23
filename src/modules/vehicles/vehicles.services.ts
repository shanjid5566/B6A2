import { pool } from "../../config/db";

const createVehicles = async (payload: Record<string, unknown>) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = payload;
  try {
    const result = await pool.query(
      `
        INSERT INTO vehicles(vehicle_name,type,registration_number,daily_rent_price,availability_status) VALUES ($1,$2,$3,$4,$5) RETURNING *
        `,
      [
        vehicle_name,
        type,
        registration_number,
        daily_rent_price,
        availability_status,
      ]
    );
    return result;
  } catch (error: any) {
    console.log(error.message);
  }
};

const getAllVehicles = async () => {
  try {
    const result = await pool.query(`SELECT * FROM vehicles`);
    return result;
  } catch (error: any) {
    console.log(error.message);
  }
};
const getSingleVehicle = async (vehicleId: string) => {
  try {
    const result = await pool.query(
      `
    SELECT * FROM vehicles WHERE id = $1
    `,
      [vehicleId]
    );
    return result;
  } catch (error: any) {
    console.log(error.message);
  }
};
const updateVehicle = async (
  vehicle_name: string,
  registration_number: string,
  daily_rent_price: number,
  availability_status: string,
  vehicleId: string
) => {
  try {
    const result = await pool.query(
      `
    UPDATE vehicles SET vehicle_name=$1, registration_number=$2, daily_rent_price=$3,availability_status=$4 WHERE id=$5 RETURNING *
    `,
      [
        vehicle_name,
        registration_number,
        daily_rent_price,
        availability_status,
        vehicleId,
      ]
    );
    return result;
  } catch (error: any) {
    console.log(error.message);
  }
};
export const vehicleServices = {
  createVehicles,
  getAllVehicles,
  getSingleVehicle,
  updateVehicle
};

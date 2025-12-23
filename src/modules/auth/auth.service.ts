import { pool } from "../../config/db";
import bcrypt from "bcryptjs";

const signup = async (payload: Record<string, unknown>) => {
  const { name, email, password, phone, role } = payload;
  const hasPass = await bcrypt.hash(password as string, 10);
  console.log(hasPass);
  try {
    const result = await pool.query(
      `
           INSERT INTO users(name,email,password,phone,role) VALUES ($1,$2,$3,$4,$5) RETURNING *
            `,
      [name, email, hasPass, phone, role]
    );
    return result;
  } catch (error: any) {
    console.log(error.message);
  }
};

export const authServices = {
  signup,
};

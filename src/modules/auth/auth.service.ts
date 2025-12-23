import jwt from "jsonwebtoken";
import config from "../../config";
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
const signin = async (email: string, password: string) => {
  const result = await pool.query(
    `
        SELECT * FROM users WHERE email=$1`,
    [email]
  );
  if (result.rows.length === 0) {
    return null;
  }
  const user = result.rows[0];
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return false;
  }
  const secret = config.user_secret_key as string;
  const token = jwt.sign(
    { name: user.name, email: user.email, role: user.role },
    secret,
    {
      expiresIn: "7d",
    }
  );
  return { token, user };
};
export const authServices = {
  signup,
  signin,
};

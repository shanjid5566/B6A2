import { Request, Response } from "express";
import { authServices } from "./auth.service";

const signup = async (req: Request, res: Response) => {
  //   const { name, email, password, phone, role } = req.body;

  try {
    const result = await authServices.signup(req.body);
    res.status(201).json({
      success: true,
      message: "Successfully User Created.",
      user: result?.rows ?? null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create user.",
      error: (error as Error)?.message ?? "Unknown error",
    });
  }
};
export const authController = {
  signup,
};

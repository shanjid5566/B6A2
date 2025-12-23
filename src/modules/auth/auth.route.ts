import { Router } from "express";
import { authController } from "./auth.controller";

const route = Router();

route.post("/auth/signup",authController.signup);
route.post("/auth/signin",authController.signin);
export const authRoute =  route;

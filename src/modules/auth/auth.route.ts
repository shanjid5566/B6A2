import { Router } from "express";
import { authController } from "./auth.controller";

const route = Router();

route.post("/signup",authController.signup);
route.post("/signin",authController.signin);
export const authRoute =  route;

import { Router } from "express";
import authMiddleware from "../../middleware/auth.middleware";
import { bookingController } from "./booking.controller";

const route = Router();
route.post(
  "/",
  authMiddleware("admin","user"),
  bookingController.createBooking
);

export const bookingRoute = route;

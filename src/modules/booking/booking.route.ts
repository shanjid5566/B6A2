import { Router } from "express";
import authMiddleware from "../../middleware/auth.middleware";
import { bookingController } from "./booking.controller";

const route = Router();
route.post(
  "/",
  authMiddleware("admin","user"),
  bookingController.createBooking
);
route.get(
  "/",
  authMiddleware("admin","user"),
  bookingController.getBooking
);
export const bookingRoute = route;

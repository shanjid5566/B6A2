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
route.delete(
  "/:id",
  authMiddleware("admin","user"),
  bookingController.cancelBooking
);
route.post(
  "/:id/return",
  authMiddleware("admin"),
  bookingController.markReturned
);
route.post(
  "/auto-return",
  authMiddleware("admin"),
  bookingController.autoReturn
);
export const bookingRoute = route;

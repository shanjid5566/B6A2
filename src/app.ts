import express, { Request, Response } from "express";
import { authRoute } from "./modules/auth/auth.route";
import { vehicleRoute } from "./modules/vehicles/vehicles.route";
import { bookingRoute } from "./modules/booking/booking.route";

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

// sign up new user
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/vehicles", vehicleRoute);
app.use("/api/v1/bookings",bookingRoute)

export default app;

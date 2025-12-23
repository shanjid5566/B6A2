import express, { Request, Response } from "express";
import { authRoute } from "./modules/auth/auth.route";

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

// sign up new user
app.use("/api/v1", authRoute);

export default app;

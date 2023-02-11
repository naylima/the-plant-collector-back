import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { makePayment } from "@/controllers";

const paymentRouter = Router();

paymentRouter
  .all("/*", authenticateToken)
  .post("/", makePayment)

export { paymentRouter };
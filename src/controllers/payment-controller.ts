import paymentService from "@/services/payment-service";
import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";

import httpStatus from "http-status";

export async function makePayment(req: AuthenticatedRequest, res: Response) {
  const { user_id } = req;
  try {
    await paymentService.processPayment(user_id, req.body);

    return res.sendStatus(httpStatus.OK);
  } catch (error) {
    if (error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
  }
}
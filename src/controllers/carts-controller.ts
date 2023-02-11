import cartService from "@/services/carts-service";
import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import { CartProduct } from "@prisma/client";
import httpStatus from "http-status";

export async function listCartProducts(req: AuthenticatedRequest, res: Response) {
  const { user_id } = req;

  try {
    const cartProducts = await cartService.listManyByUserId(user_id);

    return res.status(httpStatus.OK).send(cartProducts);
  } catch (error) {
    if (error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
  }
}

export async function addToCart(req: AuthenticatedRequest, res: Response) {
  const { user_id } = req;
  const { product_id, amount } = req.body as CartProduct;

  try {
    await cartService.addToCart(user_id, product_id, amount);

    return res.sendStatus(httpStatus.OK);
  } catch (error) {
    if (error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
  }
}
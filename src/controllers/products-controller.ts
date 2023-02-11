import productsService from "@/services/products-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function getProductsByType(req: Request, res: Response) {
  const { type_id } = req.params
  try {
    const products = await productsService.getProductsByType(type_id);

    return res.status(httpStatus.OK).send(products);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
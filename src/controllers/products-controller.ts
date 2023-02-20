import productsService from "@/services/products-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function getProductsByType(req: Request, res: Response) {
  const { type_id } = req.params;
  try {
    const products = await productsService.getProductsByType(type_id);

    return res.status(httpStatus.OK).send(products);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function getProducts(req: Request, res: Response) {
  const keyword = req.query.keyword as string;
  
  try {
    if(keyword) {
      const products = await productsService.getProductsByName(keyword);
    
      return res.status(httpStatus.OK).send(products);
    }
    const products = await productsService.getProductsBySell();
   
    return res.status(httpStatus.OK).send(products);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

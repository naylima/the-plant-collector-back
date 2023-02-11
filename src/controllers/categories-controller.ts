import categoriesService from "@/services/categories-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function getCategories(req: Request, res: Response) {
  try {
    const categories = await categoriesService.getCategoriesWithTypes();

    return res.status(httpStatus.OK).send(categories);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
import { Router } from "express";

import { getProductsByType, getProducts } from "@/controllers";

const productsRouter = Router();

productsRouter 
.get("/:type_id", getProductsByType)
.get("/", getProducts);

export { productsRouter };
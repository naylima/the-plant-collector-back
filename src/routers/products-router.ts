import { Router } from "express";

import { getProductsByType } from "@/controllers";

const productsRouter = Router();

productsRouter.get("/:type_id", getProductsByType);

export { productsRouter };
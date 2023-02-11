import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { listCartProducts, addToCart } from "@/controllers";

const cartsRouter = Router();

cartsRouter
  .all("/*", authenticateToken)
  .get("/", listCartProducts)
  .post("/", addToCart)

export { cartsRouter };
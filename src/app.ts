import "reflect-metadata";
import "express-async-errors";
import express, { Express } from "express";
import cors from "cors";

import { loadEnv, connectDb, disconnectDB } from "@/config";
import { handleApplicationErrors } from "@/middlewares";

import {
  usersRouter,
  authenticationRouter,
  enrollmentsRouter,
  categoriesRouter,
  productsRouter,
  cartsRouter,
  paymentRouter
} from "@/routers";

loadEnv();

const app = express();
app
  .use(cors())
  .use(express.json())
  .get("/health", (_req, res) => res.send("OK!"))
  .use("/users", usersRouter)
  .use("/auth", authenticationRouter)
  .use("/enrollments", enrollmentsRouter)
  .use("/categories", categoriesRouter)
  .use("/products", productsRouter)
  .use("/carts", cartsRouter)
  .use("/payments", paymentRouter)
  .use(handleApplicationErrors);

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;
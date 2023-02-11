import { singInPost, authSingInPost, signOut } from "@/controllers";
import { validateBody, authenticateToken } from "@/middlewares";
import { signInSchema, authSignInSchema } from "@/schemas";
import { Router } from "express"; 

const authenticationRouter = Router();

authenticationRouter
  .post("/sign-in", validateBody(signInSchema), singInPost)
  .post("/auth-sign-in", validateBody(authSignInSchema), authSingInPost)
  .delete("/sign-out", authenticateToken, signOut);

export { authenticationRouter };
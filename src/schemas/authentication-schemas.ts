import { SignInParams, AuthSignInParams } from "@/services";
import Joi from "joi";

export const signInSchema = Joi.object<SignInParams>({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const authSignInSchema = Joi.object<AuthSignInParams>({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
});
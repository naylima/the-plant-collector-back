import sessionRepository from "@/repositories/session-repository";
import userRepository from "@/repositories/user-repository";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { invalidCredentialsError } from "@/errors";
import { exclude } from "@/utils/prisma-utils";
import { User } from "@prisma/client";

export async function signIn(params: SignInParams): Promise<SignInResult> {
  const { email, password } = params;

  const user = await getUserOrFail(email);

  await validatePasswordOrFail(password, user.password);

  const token = await createSession(user.id);

  return {
    user: exclude(user, "password"),
    token,
  };
}

export async function authSignIn(email: string): Promise<SignInResult> {
  const user = await getUserOrFail(email);

  const token = await createSession(user.id);

  return {
    user: exclude(user, "password"),
    token,
  };
}

export async function signOut(token: string) {
  return await sessionRepository.deleteByToken(token);
}

async function getUserOrFail(email: string): Promise<GetUserOrFailResult> {
  const user = await userRepository.findByEmail(email, { id: true, name: true, email: true, password: true });
  if (!user) throw invalidCredentialsError();

  return user;
}

async function createSession(user_id: string) {
  const token = jwt.sign({ user_id }, process.env.JWT_SECRET);
  await sessionRepository.create({
    token,
    user_id,
  });

  return token;
}

async function validatePasswordOrFail(password: string, userPassword: string) {
  const isPasswordValid = await bcrypt.compare(password, userPassword);
  if (!isPasswordValid) throw invalidCredentialsError();
}

export type SignInParams = Pick<User, "email" | "password">;
export type AuthSignInParams = Pick<User, "name" | "email">;

type SignInResult = {
  user: Pick<User, "id" | "name" | "email">;
  token: string;
};

type GetUserOrFailResult = Pick<User, "id" | "name" | "email" | "password">;

const authenticationService = {
  signIn,
  authSignIn,
  signOut
};

export default authenticationService;
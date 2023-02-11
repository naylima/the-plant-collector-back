import userRepository from "@/repositories/user-repository";
import bcrypt from "bcrypt";

import { duplicatedEmailError } from "@/errors";
import { User } from "@prisma/client";

export async function createUser({ name, email, password }: CreateUserParams): Promise<User> {
  await validateUniqueEmailOrFail(email);

  const hashedPassword = await bcrypt.hash(password, 12);
  return userRepository.create({
    name,
    email,
    password: hashedPassword,
  });
}

export async function createAuthUser({ name, email }: CreateAuthUserParams): Promise<User> {
  const userWithSameEmail = await userRepository.findByEmail(email);
  if (userWithSameEmail) {
    return;
  }

  return userRepository.create({
    name,
    email
  });
}

async function validateUniqueEmailOrFail(email: string) {
  const userWithSameEmail = await userRepository.findByEmail(email);
  
  if (userWithSameEmail) {
    throw duplicatedEmailError();
  }
}

export type CreateUserParams = Pick<User, "name" | "email" | "password">;
export type CreateAuthUserParams = Pick<User, "name" | "email">;

const userService = {
  createUser,
  createAuthUser
};

export default userService;
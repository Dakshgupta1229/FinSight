import { PrismaClient } from "@prisma/client";
import { hashPassword, comparePassword } from "../utils/hash.js";
import { generateToken } from "../utils/jwt.js";
import { RegisterUser, LoginUser } from "../types/auth.types.js";

const prisma = new PrismaClient();

export const registerUser = async (data: RegisterUser) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await hashPassword(data.password);

  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
    },
  });

  const token = generateToken(user.id);

  // Remove password before sending response
  const { password, ...userWithoutPassword } = user;

  return {
    user: userWithoutPassword,
    token,
  };
};

export const loginUser = async (data: LoginUser) => {
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const validPassword = await comparePassword(
    data.password,
    user.password
  );

  if (!validPassword) {
    throw new Error("Invalid credentials");
  }

  const token = generateToken(user.id);

  // Remove password before sending response
  const { password, ...userWithoutPassword } = user;

  return {
    user: userWithoutPassword,
    token,
  };
};
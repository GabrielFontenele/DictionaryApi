import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { UsersRepositoryPrisma } from "@modules/users/repositories/prisma/UsersRepositoryPrisma";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token missing");
  }

  const secret = process.env.SECRET ?? "";

  if (!secret) {
    throw new AppError("Internal Error");
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(token, secret) as IPayload;

    const usersRepositoryPrisma = new UsersRepositoryPrisma();

    const user = await usersRepositoryPrisma.findById(user_id);

    if (!user) throw new AppError("User not found");

    const userId = {
      id: user_id,
    };
    request.user = userId;

    next();
  } catch {
    throw new AppError("Invalid token");
  }
}

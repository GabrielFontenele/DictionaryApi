import { Request, Response } from "express";

import { UsersRepositoryPrisma } from "@modules/users/repositories/prisma/UsersRepositoryPrisma";

import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

export class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { password, email } = request.body;

    const usersRepositoryPrisma = new UsersRepositoryPrisma();
    const authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryPrisma,
    );

    const token = await authenticateUserUseCase.execute({ password, email });

    return response.json(token);
  }
}

import { Request, Response } from "express";

import { UsersRepositoryPrisma } from "@modules/users/repositories/prisma/UsersRepositoryPrisma";

import { ShowUserUseCase } from "./ShowUserUseCase";

export class ShowUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;

    const usersRepositoryPrisma = new UsersRepositoryPrisma();
    const showUserUseCase = new ShowUserUseCase(usersRepositoryPrisma);

    const user = await showUserUseCase.execute(userId);

    return response.json(user);
  }
}

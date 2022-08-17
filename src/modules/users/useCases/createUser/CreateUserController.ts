import { Request, Response } from "express";

import { UsersRepositoryPrisma } from "@modules/users/repositories/prisma/UsersRepositoryPrisma";

import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, password, email } = request.body;
    const usersRepositoryPrisma = new UsersRepositoryPrisma();
    const createUserUseCase = new CreateUserUseCase(usersRepositoryPrisma);
    const token = await createUserUseCase.execute({
      name,
      password,
      email,
    });

    return response.send(token);
  }
}

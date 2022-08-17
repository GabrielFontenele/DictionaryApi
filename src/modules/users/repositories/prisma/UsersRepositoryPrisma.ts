import { ICreateUserDTO } from "@modules/users/dtos/ICreateUserDTO";
import { User } from "@prisma/client";
import { prisma } from "@shared/prisma";

import { IUsersRepository } from "../IUsersRepository";

export class UsersRepositoryPrisma implements IUsersRepository {
  async create({ email, name, password }: ICreateUserDTO): Promise<User> {
    const user = await prisma.user.create({ data: { email, name, password } });
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }
}

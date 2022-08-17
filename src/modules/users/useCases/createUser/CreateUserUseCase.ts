import { hash } from "bcryptjs";

import { ICreateUserDTO } from "@modules/users/dtos/ICreateUserDTO";
import { ITokenResponseDTO } from "@modules/users/dtos/ITokenResponseDTO";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";
import { createAuthToken } from "@shared/helpers/createAuthToken";

export class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    name,
    password,
    email,
  }: ICreateUserDTO): Promise<ITokenResponseDTO> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError("User already exists");
    }

    const passwordHash = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      password: passwordHash,
      email,
    });

    const tokenReturn: ITokenResponseDTO = createAuthToken(user.id, user.name);

    return tokenReturn;
  }
}

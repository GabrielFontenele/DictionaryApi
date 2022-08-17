import { compare } from "bcryptjs";

import { ITokenResponseDTO } from "@modules/users/dtos/ITokenResponseDTO";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";
import { createAuthToken } from "@shared/helpers/createAuthToken";

interface IRequest {
  email: string;
  password: string;
}

export class AuthenticateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ email, password }: IRequest): Promise<ITokenResponseDTO> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Email or password incorrect!");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Email or password incorrect!");
    }

    const tokenReturn: ITokenResponseDTO = createAuthToken(user.id, user.name);

    return tokenReturn;
  }
}

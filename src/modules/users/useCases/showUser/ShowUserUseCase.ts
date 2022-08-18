import { IUserDTO } from "@modules/users/dtos/IUserDTO";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

export class ShowUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}
  async execute(userId: string): Promise<IUserDTO> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError("User not found");
    }

    const userDTO = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    return userDTO;
  }
}

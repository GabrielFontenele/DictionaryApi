import { sign } from "jsonwebtoken";

import { ITokenResponseDTO } from "@modules/users/dtos/ITokenResponseDTO";
import { AppError } from "@shared/errors/AppError";

export function createAuthToken(id: string, name: string): ITokenResponseDTO {
  const secret = process.env.SECRET ?? "";

  if (!secret) {
    throw new AppError("Internal Error");
  }

  const token = sign({}, secret, {
    subject: id,
    expiresIn: "7d",
  });

  const tokenResponse: ITokenResponseDTO = {
    token,
    name,
    id,
  };

  return tokenResponse;
}

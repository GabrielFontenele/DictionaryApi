import { Request, Response } from "express";

import { WordsRepositoryPrisma } from "@modules/words/repositories/prisma/WordsRepositoryPrisma";

import { DeleteFavoriteUseCase } from "./DeleteFavoriteUseCase";

export class DeleteFavoriteController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { word } = request.params;
    const userId = request.user.id;

    const wordsRepositoryPrisma = new WordsRepositoryPrisma();
    const deleteFavoriteUseCase = new DeleteFavoriteUseCase(
      wordsRepositoryPrisma,
    );

    await deleteFavoriteUseCase.execute(word, userId);
    return response.status(204).send();
  }
}

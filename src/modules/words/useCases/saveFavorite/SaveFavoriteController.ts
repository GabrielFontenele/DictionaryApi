import { Request, Response } from "express";

import { WordsRepositoryPrisma } from "@modules/words/repositories/prisma/WordsRepositoryPrisma";

import { SaveFavoriteUseCase } from "./SaveFavoriteUseCase";

export class SaveFavoriteController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { word } = request.params;
    const userId = request.user.id;

    const wordsRepositoryPrisma = new WordsRepositoryPrisma();
    const saveFavoriteUseCase = new SaveFavoriteUseCase(wordsRepositoryPrisma);

    await saveFavoriteUseCase.execute(word, userId);
    return response.status(204).send();
  }
}

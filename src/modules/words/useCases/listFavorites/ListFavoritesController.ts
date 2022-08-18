import { Request, Response } from "express";

import { WordsRepositoryPrisma } from "@modules/words/repositories/prisma/WordsRepositoryPrisma";

import { ListFavoritesUseCase } from "./ListFavoritesUseCase";

export class ListFavoritesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const page = Number(request.query.page as string);
    const userId = request.user.id;

    const wordsRepositoryPrisma = new WordsRepositoryPrisma();
    const listFavoritesUseCase = new ListFavoritesUseCase(
      wordsRepositoryPrisma,
    );
    const favorite = await listFavoritesUseCase.execute(userId, page);

    return response.json(favorite);
  }
}

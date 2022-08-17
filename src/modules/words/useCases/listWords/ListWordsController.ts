import { Request, Response } from "express";

import { WordsRepositoryPrisma } from "@modules/words/repositories/prisma/WordsRepositoryPrisma";

import { ListWordsUseCase } from "./ListWordsUseCase";

export class ListWordsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const limit = Number(request.query.limit as string);
    const search = request.query.search as string;
    const userId = request.user.id;

    const wordsRepositoryPrisma = new WordsRepositoryPrisma();
    const listWordsUseCase = new ListWordsUseCase(wordsRepositoryPrisma);

    const wordsList = await listWordsUseCase.execute(search, limit, userId);
    return response.json(wordsList);
  }
}

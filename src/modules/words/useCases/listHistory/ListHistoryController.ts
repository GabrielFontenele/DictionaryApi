import { Request, Response } from "express";

import { WordsRepositoryPrisma } from "@modules/words/repositories/prisma/WordsRepositoryPrisma";

import { ListHistoryUseCase } from "./ListHistoryUseCase";

export class ListHistoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const page = Number(request.query.page as string);
    const userId = request.user.id;

    const wordsRepositoryPrisma = new WordsRepositoryPrisma();
    const listHistoryUseCase = new ListHistoryUseCase(wordsRepositoryPrisma);
    const history = await listHistoryUseCase.execute(userId, page);

    return response.json(history);
  }
}

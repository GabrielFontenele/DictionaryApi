import { Request, Response } from "express";

import { WordsRepositoryPrisma } from "@modules/words/repositories/prisma/WordsRepositoryPrisma";

import { ShowWordUseCase } from "./ShowWordUseCase";

export class ShowWordController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { word } = request.params;
    const userId = request.user.id;

    const wordsRepositoryPrisma = new WordsRepositoryPrisma();
    const showWordUseCase = new ShowWordUseCase(wordsRepositoryPrisma);

    const wordsList = await showWordUseCase.execute(word, userId);
    return response.json(wordsList);
  }
}

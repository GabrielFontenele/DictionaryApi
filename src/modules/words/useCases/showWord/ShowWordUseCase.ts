/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

import { IWordsRepository } from "@modules/words/repositories/IWordsRepository";
import { AppError } from "@shared/errors/AppError";

export class ShowWordUseCase {
  constructor(private wordsRepository: IWordsRepository) {}
  baseUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/";

  async execute(search: string, userId: string): Promise<any> {
    const word = await this.wordsRepository.findByWord(search);

    if (!word) {
      throw new AppError("Word not found");
    }
    const url = `${this.baseUrl}${word.word}`;
    const wordData = await axios.get(url);

    await this.wordsRepository.createManyHistoric([
      {
        userId,
        wordId: word.id,
      },
    ]);

    return wordData.data;
  }
}

import { ICreateWordDTO } from "@modules/words/dtos/ICreateWordDTO";
import { Word } from "@prisma/client";
import { prisma } from "@shared/prisma";

import { IWordsRepository } from "../IWordsRepository";

export class WordsRepositoryPrisma implements IWordsRepository {
  async createMany(data: ICreateWordDTO[]): Promise<void> {
    await prisma.word.createMany({ data, skipDuplicates: true });
  }

  async findLikeByWord(word: string): Promise<Word | null> {
    throw new Error("Method not implemented.");
  }
}

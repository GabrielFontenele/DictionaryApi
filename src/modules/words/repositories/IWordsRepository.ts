import { Word } from "@prisma/client";

import { ICreateWordDTO } from "../dtos/ICreateWordDTO";

export interface IWordsRepository {
  createMany(data: ICreateWordDTO[]): Promise<void>;
  findLikeByWord(word: string): Promise<Word | null>;
}

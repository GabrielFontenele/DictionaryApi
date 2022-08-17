import { Word } from "@prisma/client";

import { ICreateHistoryDTO } from "../dtos/ICreateHistoryDTO";
import { ICreateWordDTO } from "../dtos/ICreateWordDTO";
import { ISearchDTO } from "../dtos/ISearchTDO";

export interface IWordsRepository {
  createMany(data: ICreateWordDTO[]): Promise<void>;
  createManyHistoric(data: ICreateHistoryDTO[]): Promise<void>;
  findByWord(search: string): Promise<Word | null>;
  findLikeByWord(data: ISearchDTO): Promise<Word[]>;
  findLikeByWordCount(search: string): Promise<number>;
  getTotalOfHistoriesByUser(userId: string): Promise<
    (Word & {
      _count: {
        History: number;
      };
    })[]
  >;
  createFavorite(userId: string, wordId: string): Promise<void>;
}

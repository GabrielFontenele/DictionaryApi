import { ICreateHistoryDTO } from "@modules/words/dtos/ICreateHistoryDTO";
import { ICreateWordDTO } from "@modules/words/dtos/ICreateWordDTO";
import { ISearchDTO } from "@modules/words/dtos/ISearchTDO";
import { Word } from "@prisma/client";
import { prisma } from "@shared/prisma";

import { IWordsRepository } from "../IWordsRepository";

export class WordsRepositoryPrisma implements IWordsRepository {
  async createMany(data: ICreateWordDTO[]): Promise<void> {
    await prisma.word.createMany({ data, skipDuplicates: true });
  }

  async createManyHistoric(data: ICreateHistoryDTO[]): Promise<void> {
    await prisma.history.createMany({ data });
  }

  async findLikeByWord({ search, skip, take }: ISearchDTO): Promise<Word[]> {
    const words = await prisma.word.findMany({
      where: {
        word: {
          startsWith: search,
        },
      },
      orderBy: {
        word: "asc",
      },
      skip,
      take,
    });
    return words;
  }

  async findLikeByWordCount(search: string): Promise<number> {
    const total = await prisma.word.count({
      where: {
        word: {
          startsWith: search,
        },
      },
    });
    return total;
  }

  async getTotalOfHistoriesByUser(userId: string): Promise<
    (Word & {
      _count: {
        History: number;
      };
    })[]
  > {
    const total = await prisma.word.findMany({
      include: {
        _count: {
          select: {
            History: true,
          },
        },
        History: {
          where: { userId },
        },
      },
    });

    return total;
  }
}

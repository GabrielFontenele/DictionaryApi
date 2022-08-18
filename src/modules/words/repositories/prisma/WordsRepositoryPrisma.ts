import { ICreateHistoryDTO } from "@modules/words/dtos/ICreateHistoryDTO";
import { ICreateWordDTO } from "@modules/words/dtos/ICreateWordDTO";
import { IFindDTO } from "@modules/words/dtos/IFindDTO";
import { ISearchDTO } from "@modules/words/dtos/ISearchTDO";
import { Favorite, History, Word } from "@prisma/client";
import { prisma } from "@shared/prisma";

import { IWordsRepository } from "../IWordsRepository";

export class WordsRepositoryPrisma implements IWordsRepository {
  async createMany(data: ICreateWordDTO[]): Promise<void> {
    await prisma.word.createMany({ data, skipDuplicates: true });
  }

  async createManyHistoric(data: ICreateHistoryDTO[]): Promise<void> {
    await prisma.history.createMany({ data });
  }

  async findByWord(search: string): Promise<Word | null> {
    const word = await prisma.word.findFirst({ where: { word: search } });
    return word;
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

  async createFavorite(userId: string, wordId: string): Promise<void> {
    await prisma.favorite.create({ data: { userId, wordId } });
  }

  async findFavorite(userId: string, wordId: string): Promise<Favorite | null> {
    const favorite = await prisma.favorite.findFirst({
      where: { userId, wordId },
    });
    return favorite;
  }

  async deleteFavorite(id: string): Promise<void> {
    await prisma.favorite.delete({ where: { id } });
  }

  async listHistory({ userId, skip, take }: IFindDTO): Promise<
    (History & {
      word: {
        word: string;
      };
    })[]
  > {
    const history = await prisma.history.findMany({
      include: {
        word: {
          select: {
            word: true,
          },
        },
      },
      where: { userId },
      skip,
      take,
    });
    return history;
  }

  async countHistory(userId: string): Promise<number> {
    const numberOfHistory = await prisma.history.count({ where: { userId } });
    return numberOfHistory;
  }

  async listFavorite({ userId, skip, take }: IFindDTO): Promise<
    (Favorite & {
      word: {
        word: string;
      };
    })[]
  > {
    const favorite = await prisma.favorite.findMany({
      include: {
        word: {
          select: {
            word: true,
          },
        },
      },
      where: { userId },
      skip,
      take,
    });
    return favorite;
  }

  async countFavorite(userId: string): Promise<number> {
    const numberOfFavorite = await prisma.favorite.count({ where: { userId } });
    return numberOfFavorite;
  }
}

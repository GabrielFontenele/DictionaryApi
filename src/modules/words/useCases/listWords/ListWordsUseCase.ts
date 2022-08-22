import { ICreateHistoryDTO } from "@modules/words/dtos/ICreateHistoryDTO";
import { IListWordsDTO } from "@modules/words/dtos/IListWordsDTO";
import { IWordsRepository } from "@modules/words/repositories/IWordsRepository";
import { AppError } from "@shared/errors/AppError";

export class ListWordsUseCase {
  constructor(private wordsRepository: IWordsRepository) {}

  async execute(
    search: string,
    limit: number,
    page: number,
    userId: string,
  ): Promise<IListWordsDTO> {
    if (!page) throw new AppError("Invalid page number provided");

    const skip = page === 1 ? 0 : limit * (page - 1);

    const totalDocs = await this.wordsRepository.findLikeByWordCount(search);

    const searchResults = await this.wordsRepository.findLikeByWord({
      search,
      skip,
      take: limit,
    });

    const results: string[] = [];
    const historyDTO: ICreateHistoryDTO[] = [];

    searchResults.forEach(word => {
      results.push(word.word);
      historyDTO.push({
        userId,
        wordId: word.id,
      });
    });

    await this.wordsRepository.createManyHistoric(historyDTO);

    const numberOfPages = Math.ceil(totalDocs / limit);

    const listWords: IListWordsDTO = {
      results,
      totalDocs,
      page,
      totalPages: numberOfPages,
      hasNext: totalDocs > skip + searchResults.length,
      hasPrev: page > 1,
    };

    return listWords;
  }
}

import { ICreateHistoryDTO } from "@modules/words/dtos/ICreateHistoryDTO";
import { IListWordsDTO } from "@modules/words/dtos/IListWordsDTO";
import { IWordsRepository } from "@modules/words/repositories/IWordsRepository";

export class ListWordsUseCase {
  constructor(private wordsRepository: IWordsRepository) {}

  async execute(
    search: string,
    limit: number,
    userId: string,
  ): Promise<IListWordsDTO> {
    const total = await this.wordsRepository.findLikeByWordCount(search);

    const searchResults = await this.wordsRepository.findLikeByWord({
      search,
      skip: 0,
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

    const numberOfPages = Math.ceil(total / limit);

    const listWords: IListWordsDTO = {
      results,
      totalDocs: total,
      page: 1,
      totalPages: numberOfPages,
      hasNext: total > limit,
      hasPrev: false,
    };

    return listWords;
  }
}

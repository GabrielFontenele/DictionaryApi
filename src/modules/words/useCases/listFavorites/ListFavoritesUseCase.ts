import { IListDTO, IWordAdded } from "@modules/words/dtos/IListDTO";
import { IWordsRepository } from "@modules/words/repositories/IWordsRepository";
import { AppError } from "@shared/errors/AppError";

export class ListFavoritesUseCase {
  constructor(private wordsRepository: IWordsRepository) {}
  async execute(userId: string, page: number): Promise<IListDTO> {
    const itensPerPage = 5;

    if (!page) throw new AppError("Invalid page number provided");

    const skip = page === 1 ? 0 : itensPerPage * (page - 1);

    const favoriteFound = await this.wordsRepository.listFavorite({
      userId,
      skip,
      take: itensPerPage,
    });

    const results: IWordAdded[] = [];

    favoriteFound.forEach(word => {
      results.push({ word: word.word.word, added: word.added.toISOString() });
    });

    const totalDocs = await this.wordsRepository.countFavorite(userId);

    const totalPages = Math.ceil(totalDocs / itensPerPage);

    const listDTO: IListDTO = {
      results,
      totalDocs,
      page,
      totalPages,
      hasNext: totalDocs > skip + favoriteFound.length,
      hasPrev: page > 1,
    } as IListDTO;

    return listDTO;
  }
}

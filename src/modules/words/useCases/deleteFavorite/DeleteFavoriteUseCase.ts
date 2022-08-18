import { IWordsRepository } from "@modules/words/repositories/IWordsRepository";
import { AppError } from "@shared/errors/AppError";

export class DeleteFavoriteUseCase {
  constructor(private wordsRepository: IWordsRepository) {}

  async execute(word: string, userId: string) {
    const wordFound = await this.wordsRepository.findByWord(word);

    if (!wordFound) {
      throw new AppError("Word not found");
    }

    const favoriteFound = await this.wordsRepository.findFavorite(
      userId,
      wordFound.id,
    );

    if (!favoriteFound) {
      throw new AppError("Word is not favorited by the user");
    }

    await this.wordsRepository.deleteFavorite(favoriteFound.id);
  }
}

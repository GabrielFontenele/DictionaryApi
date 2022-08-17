import { IWordsRepository } from "@modules/words/repositories/IWordsRepository";
import { AppError } from "@shared/errors/AppError";

export class SaveFavoriteUseCase {
  constructor(private wordsRepository: IWordsRepository) {}

  async execute(word: string, userId: string) {
    const wordFound = await this.wordsRepository.findByWord(word);

    if (!wordFound) {
      throw new AppError("Word not found");
    }

    await this.wordsRepository.createFavorite(userId, wordFound.id);
  }
}

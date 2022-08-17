import axios from "axios";

import { ICreateWordDTO } from "@modules/words/dtos/ICreateWordDTO";
import { WordsRepositoryPrisma } from "@modules/words/repositories/prisma/WordsRepositoryPrisma";

import { IWordsRepository } from "../../modules/words/repositories/IWordsRepository";

export class WordsSeeder {
  baseUrl =
    "https://raw.githubusercontent.com/meetDeveloper/freeDictionaryAPI/master/meta/wordList/english.txt";

  constructor(private wordsRepository: IWordsRepository) {}

  async execute(): Promise<void> {
    const response = await axios.get(this.baseUrl);
    const words = response.data.split("\n");
    const wordsDTO: ICreateWordDTO[] = words.map((item: string) => {
      return {
        word: item,
      } as ICreateWordDTO;
    });
    this.wordsRepository.createMany(wordsDTO);
  }
}

const wordsRepositoryPrisma = new WordsRepositoryPrisma();
const wordsSeeder = new WordsSeeder(wordsRepositoryPrisma);

wordsSeeder.execute();

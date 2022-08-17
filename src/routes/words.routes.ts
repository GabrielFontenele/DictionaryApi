import { Router } from "express";

import { ListWordsController } from "@modules/words/useCases/listWords/ListWordsController";
import { SaveFavoriteController } from "@modules/words/useCases/saveFavorite/SaveFavoriteController";
import { ShowWordController } from "@modules/words/useCases/showWord/ShowWordController";

import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

export const wordsRoutes = Router();

const listWordsController = new ListWordsController();
const showWordController = new ShowWordController();
const saveFavoriteController = new SaveFavoriteController();

wordsRoutes.use(ensureAuthenticated);
wordsRoutes.get("/en", listWordsController.handle);
wordsRoutes.get("/en/:word", showWordController.handle);
wordsRoutes.get("/en/:word/favorite", saveFavoriteController.handle);

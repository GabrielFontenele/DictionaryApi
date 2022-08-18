import { Router } from "express";

import { DeleteFavoriteController } from "@modules/words/useCases/deleteFavorite/DeleteFavoriteController";
import { ListWordsController } from "@modules/words/useCases/listWords/ListWordsController";
import { SaveFavoriteController } from "@modules/words/useCases/saveFavorite/SaveFavoriteController";
import { ShowWordController } from "@modules/words/useCases/showWord/ShowWordController";

import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

export const wordsRoutes = Router();

const listWordsController = new ListWordsController();
const showWordController = new ShowWordController();
const saveFavoriteController = new SaveFavoriteController();
const deleteFavoriteController = new DeleteFavoriteController();

wordsRoutes.use(ensureAuthenticated);
wordsRoutes.get("/en", listWordsController.handle);
wordsRoutes.get("/en/:word", showWordController.handle);
wordsRoutes.get("/en/:word/favorite", saveFavoriteController.handle);
wordsRoutes.get("/en/:word/unfavorite", deleteFavoriteController.handle);

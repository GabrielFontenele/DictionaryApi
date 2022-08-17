import { Router } from "express";

import { ListWordsController } from "@modules/words/useCases/listWords/ListWordsController";
import { ShowWordController } from "@modules/words/useCases/showWord/ShowWordController";

import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

export const wordsRoutes = Router();

const listWordsController = new ListWordsController();
const showWordController = new ShowWordController();

wordsRoutes.get("/en", ensureAuthenticated, listWordsController.handle);
wordsRoutes.get("/en/:word", ensureAuthenticated, showWordController.handle);

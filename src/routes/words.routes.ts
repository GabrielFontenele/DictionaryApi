import { Router } from "express";

import { ListWordsController } from "@modules/words/useCases/listWords/ListWordsController";

import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

export const wordsRoutes = Router();

const listWordsController = new ListWordsController();

wordsRoutes.get("/en", ensureAuthenticated, listWordsController.handle);

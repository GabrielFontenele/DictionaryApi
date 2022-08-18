import { Router } from "express";

import { ShowUserController } from "@modules/users/useCases/showUser/ShowUserController";
import { ListHistoryController } from "@modules/words/useCases/listHistory/ListHistoryController";

import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

export const profilesRoutes = Router();

const showUserController = new ShowUserController();
const listHistoryController = new ListHistoryController();

profilesRoutes.use(ensureAuthenticated);
profilesRoutes.get("/me", showUserController.handle);
profilesRoutes.get("/me/history", listHistoryController.handle);

import { Router } from "express";

import { ShowUserController } from "@modules/users/useCases/showUser/ShowUserController";

import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

export const profilesRoutes = Router();

const showUserController = new ShowUserController();

profilesRoutes.use(ensureAuthenticated);
profilesRoutes.get("/me", showUserController.handle);

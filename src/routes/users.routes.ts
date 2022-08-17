import { Router } from "express";

import { AuthenticateUserController } from "@modules/users/useCases/authenticateUser/AuthenticateUserController";
import { CreateUserController } from "@modules/users/useCases/createUser/CreateUserController";

export const usersRoutes = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();

usersRoutes.get("/signup", createUserController.handle);
usersRoutes.get("/signin", authenticateUserController.handle);

import { Request, Response, Router } from "express";

import { profilesRoutes } from "./profiles.routes";
import { usersRoutes } from "./users.routes";
import { wordsRoutes } from "./words.routes";

const router = Router();

router.get("/", (request: Request, response: Response) =>
  response.status(200).json("Fullstack Challenge 🏅 - Dictionary"),
);

router.use("/auth", usersRoutes);
router.use("/entries", wordsRoutes);
router.use("/user", profilesRoutes);

export { router };

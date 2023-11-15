import express from "express";

import { loginUserController, createUsersController } from "./dependencies";


export const usersRouter = express.Router();

usersRouter.get("/:mail/:password", loginUserController.run.bind(loginUserController));
usersRouter.post("/", createUsersController.run.bind(createUsersController));

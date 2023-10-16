import express from "express";

import { createRegisterController } from "./dependencies";

export const  registerRouter = express.Router();

registerRouter.post("/",createRegisterController.run.bind(createRegisterController));
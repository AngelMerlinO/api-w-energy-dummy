import express from "express";

import { createRegisterController, getAllDataChartController, getRegistersFocoController } from "./dependencies";

export const  registerRouter = express.Router();

registerRouter.post("/",createRegisterController.run.bind(createRegisterController));
registerRouter.get("/chart",getAllDataChartController.run.bind(getAllDataChartController));
registerRouter.get("/chartfoco",getRegistersFocoController.run.bind(getRegistersFocoController));
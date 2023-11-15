import express from "express";

import { createRegisterController, getAllDataChartController } from "./dependencies";

export const  registerRouter = express.Router();

registerRouter.post("/",createRegisterController.run.bind(createRegisterController));
registerRouter.get("/chart",getAllDataChartController.run.bind(getAllDataChartController));
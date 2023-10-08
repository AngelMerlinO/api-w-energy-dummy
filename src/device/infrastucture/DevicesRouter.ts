import express  from "express";

import { getDeviceController } from "./dependencies";

export const deviceRouter = express.Router();

deviceRouter.get("/",getDeviceController.run.bind(getDeviceController));
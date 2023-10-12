import express  from "express";

import { getDeviceController, getStatusDeviceController } from "./dependencies";

export const deviceRouter = express.Router();

deviceRouter.get("/",getDeviceController.run.bind(getDeviceController));
deviceRouter.get("/status",getStatusDeviceController.run.bind(getStatusDeviceController))
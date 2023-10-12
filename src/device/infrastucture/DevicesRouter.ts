import express  from "express";

import { createDeviceController, getDeviceController, getStatusDeviceController } from "./dependencies";

export const deviceRouter = express.Router();

deviceRouter.get("/",getDeviceController.run.bind(getDeviceController));
deviceRouter.get("/status",getStatusDeviceController.run.bind(getStatusDeviceController))
deviceRouter.post("/register",createDeviceController.run.bind(createDeviceController));
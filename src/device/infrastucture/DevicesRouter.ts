import express from "express";
import { createDeviceController, getDeviceController, getStatusDeviceController, putStatusController } from "./dependencies";

export const deviceRouter = express.Router();

deviceRouter.post("/register", createDeviceController.run.bind(createDeviceController));
deviceRouter.get("/:idUser", getDeviceController.run.bind(getDeviceController));
deviceRouter.get("/status/:deviceID", getStatusDeviceController.run.bind(getStatusDeviceController));
deviceRouter.put("/status/:id", putStatusController.run.bind(putStatusController));

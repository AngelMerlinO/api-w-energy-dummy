import { GetDeviceUseCase } from "../application/GetDeviceUseCase";

import { GetDevicesController } from "./controllers/GetDeviceController";

import { MysqlDeviceRepository } from "./MysqlDeviceRepository";

export const mysqlDeviceRepository = new MysqlDeviceRepository();
export const getDeviceUseCase = new GetDeviceUseCase(mysqlDeviceRepository);

export const getDeviceController = new GetDevicesController(getDeviceUseCase);
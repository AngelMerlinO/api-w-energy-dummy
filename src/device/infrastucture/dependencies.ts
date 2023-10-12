import { GetDeviceUseCase } from "../application/GetDeviceUseCase";
import { GetStatusDeviceUseCase } from "../application/GetStatusUseCase";

import { GetDevicesController } from "./controllers/GetDeviceController";
import { GetStatusDeviceController } from "./controllers/GetStatusDeviceControllers";

import { MysqlDeviceRepository } from "./MysqlDeviceRepository";

export const mysqlDeviceRepository = new MysqlDeviceRepository();
export const getDeviceUseCase = new GetDeviceUseCase(mysqlDeviceRepository);
export const getStatusDeviceUseCase = new GetStatusDeviceUseCase(mysqlDeviceRepository);

export const getDeviceController = new GetDevicesController(getDeviceUseCase);
export const getStatusDeviceController =new GetStatusDeviceController(getStatusDeviceUseCase);
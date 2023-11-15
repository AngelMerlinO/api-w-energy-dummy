import { CreateRegisterUsecase } from "../application/CreateRegisterUseCase";
import { GetAllDataUseCase } from "../application/GetAllDataUseCase";

import { CreateRegisterController } from "./controllers/CreateRegisterController";
import { GetAllDataChartController } from "./controllers/GetAllDataChartController";

import { MysqlRegisterRepository } from "./MyslRegisterRepository";

export  const mysqlRegisterRepository = new MysqlRegisterRepository();

export  const createUsersUseCase = new CreateRegisterUsecase(mysqlRegisterRepository)
export  const getAllDataUseCase = new GetAllDataUseCase(mysqlRegisterRepository)

export  const createRegisterController = new CreateRegisterController (createUsersUseCase);
export  const getAllDataChartController = new GetAllDataChartController (getAllDataUseCase);
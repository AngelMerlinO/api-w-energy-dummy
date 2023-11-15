import { CreateRegisterUsecase } from "../application/CreateRegisterUseCase";
import { GetAllDataUseCase } from "../application/GetAllDataUseCase";
import { GetRegistersFocoUseCase } from "../application/GetRegistersFocoUseCase";


import { CreateRegisterController } from "./controllers/CreateRegisterController";
import { GetAllDataChartController } from "./controllers/GetAllDataChartController";
import { GetRegistersFocoController } from "./controllers/GetRegistersFocoController";

import { MysqlRegisterRepository } from "./MyslRegisterRepository";

export  const mysqlRegisterRepository = new MysqlRegisterRepository();

export  const createUsersUseCase = new CreateRegisterUsecase(mysqlRegisterRepository)
export  const getAllDataUseCase = new GetAllDataUseCase(mysqlRegisterRepository)
export  const getRegistersFocoUseCase = new GetRegistersFocoUseCase(mysqlRegisterRepository)

export  const createRegisterController = new CreateRegisterController (createUsersUseCase);
export  const getAllDataChartController = new GetAllDataChartController (getAllDataUseCase);
export  const getRegistersFocoController = new GetRegistersFocoController (getRegistersFocoUseCase);
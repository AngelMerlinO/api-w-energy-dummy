import { CreateRegisterUsecase } from "../application/CreateRegisterUseCase";

import { CreateRegisterController } from "./controllers/CreateRegisterController";

import { MysqlRegisterRepository } from "./MyslRegisterRepository";

export  const mysqlRegisterRepository = new MysqlRegisterRepository();
export  const createUsersUseCase = new CreateRegisterUsecase(mysqlRegisterRepository)

export  const createRegisterController = new CreateRegisterController (createUsersUseCase);
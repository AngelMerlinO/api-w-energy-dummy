import { CreateUsersUseCase } from "../application/CreateUsersUseCase";
import { LoginUseCase } from "../application/LoginUseCase";

import { CreateUsersController } from "./controllers/CreateUsersController";
import { LoginUserController } from "./controllers/LoginUserController";

import { MysqlUsersRepository } from "./MysqlUsersRepository";

export const mysqlUsersRepository = new MysqlUsersRepository();
export const createUsersUseCase = new CreateUsersUseCase(mysqlUsersRepository);
export const loginUseCase = new LoginUseCase(mysqlUsersRepository);

export const createUsersController = new CreateUsersController(createUsersUseCase);
export const loginUserController = new LoginUserController(loginUseCase);

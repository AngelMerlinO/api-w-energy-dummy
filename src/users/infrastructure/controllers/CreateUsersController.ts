import { Request, Response } from "express";

import { CreateUsersUseCase } from "../../application/CreateUsersUseCase";
//import { Users } from "../../domain/Users";

export class CreateUsersController {
  constructor(readonly createUsersUseCase: CreateUsersUseCase) {}

  async run(req: Request, res: Response) {
    const data = req.body;
    try {
      const users = await this.createUsersUseCase.run(
        data.name,
        data.password,
        data.mail
      );

      if (users)
        //Code HTTP : 201 -> Creado
        res.status(201).send({
          status: "success",
          data: {
            id: users?.id,
            name: users?.name,
            password: users?.password,
            mail: users?.mail,
          },
        });
      else
        res.status(204).send({
          status: "error",
          data: "NO fue posible agregar el registro",
        });
    } catch (error) {
      //Code HTTP : 204 Sin contenido
      res.status(204).send({
        status: "error",
        data: "Ocurrio un error",
        msn: error,
      });
    }
  }
}

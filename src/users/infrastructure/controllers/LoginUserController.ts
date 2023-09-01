import { Request, Response } from "express";
import { LoginUseCase } from "../../application/LoginUseCase";

export class LoginUserController {
  constructor(readonly loginUseCase: LoginUseCase) {}

  async run(req: Request, res: Response) {
    try {
      const { mail, password } = req.params;
      console.log(`🤨😶🤐|| 🥓 file: LoginUserController.ts:10 🥓 LoginUserController 🥓 run 🥓 req.params||`, req.params)
      const user = await this.loginUseCase.run(mail, password);

      if (user) {
        res.status(200).send({
          status: "success",
          data: {
            id: user.id,
            name: user.name,
            password: user.password,
            mail: user.mail,
          },
        });
      } else {
        res.status(400).send({
          status: "error",
          msn: "Ocurrió algún problema",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        status: "error",
        message: "Ocurrió un error",
      });
    }
  }
}

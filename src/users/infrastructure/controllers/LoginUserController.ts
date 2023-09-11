import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { LoginUseCase } from "../../application/LoginUseCase";

export class LoginUserController {
  constructor(readonly loginUseCase: LoginUseCase) {}

  async run(req: Request, res: Response) {
    try {
      const { mail, password } = req.params;
      console.log(`🤨😶🤐|| 🥓 file: LoginUserController.ts:10 🥓 LoginUserController 🥓 run 🥓 req.params||`, req.params);
      const user = await this.loginUseCase.run(mail, password);
  
      if (user) {
        // Genera un token JWT
        const token = jwt.sign({ userId: user.id }, 'DummySecurity', { expiresIn: '1h' }); 
  
        res.status(200).send({
          status: "success",
          data: {
            id: user.id,
            name: user.name,
            password: user.password,
            mail: user.mail,
            token, 
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

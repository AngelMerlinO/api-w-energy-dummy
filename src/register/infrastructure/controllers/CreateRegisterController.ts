import { Request, Response } from 'express';
import { CreateRegisterUsecase } from '../../application/CreateRegisterUseCase';

export class CreateRegisterController {
  constructor(readonly createRegisterUsecase: CreateRegisterUsecase) {}

  async run(req: Request, res: Response) {
    const data = req.body;
    try {
      const register = await this.createRegisterUsecase.run(
        data.idDevice,
        data.date,
        data.voltage,
        data.amps,
        data.power
      );

      if (register) {
        // Código HTTP: 201 -> Creado
        res.status(201).send({
          status: 'success',
          data: {
            id: register.id,
            idDevice: register.idDevice,
            date: register.date,
            voltage: register.voltage,
            amps: register.amps,
            power: register.power,
          },
        });
      } else {
        res.status(204).send({
          status: 'error',
          data: 'No fue posible agregar el registro',
        });
      }
    } catch (error) {
      // Código HTTP: 500 -> Error interno del servidor
      res.status(500).send({
        status: 'error',
        message: 'Ocurrió un error',
        error: error,
      });
    }
  }
}

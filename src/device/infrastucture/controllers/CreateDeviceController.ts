import { Request, Response } from "express";
import { CreateDeviceUseCase } from "../../application/CreateDeviceUseCase";

export class CreateDeviceController {
  constructor(readonly createDeviceUseCase: CreateDeviceUseCase) {}

  async run(req: Request, res: Response) {
    const {idUser, name, description, status,category} = req.body;

    try {
      const device = await this.createDeviceUseCase.run(idUser, name, description, status,category);

      if (device) {
        // Código HTTP: 201 -> Creado
        res.status(201).send({
          status: "success",
          data: {
            idUser: device.idUser,
            name: device.name,
            description: device.description,
            status: device.status,
            category:category
          },
        });
      } else {
        res.status(204).send({
          status: "error",
          data: "No fue posible agregar el dispositivo.",
        });
      }
    } catch (error) {
      // Código HTTP: 500 -> Error interno del servidor
      res.status(500).send({
        status: "error",
        data: "Ocurrió un error al crear el dispositivo",
        message: error // Puedes incluir detalles del error en el mensaje de respuesta
      });
    }
  }
}

import { Request, Response } from "express";
import { GetDeviceUseCase } from "../../application/GetDeviceUseCase";

export class GetDevicesController {
  constructor(readonly getDeviceUseCase: GetDeviceUseCase) {}

  async run(req: Request, res: Response) {
    try {
      const { idUser } = req.params;
      const parsedIdUser = parseInt(idUser, 10);

      if (isNaN(parsedIdUser)) {
        res.status(400).send({
          status: "error",
          message: "El parámetro 'idUser' debe ser un número entero válido.",
        });
        return;
      }
      // Llama al caso de uso para obtener todos los dispositivos relacionados con idUser
      const devices = await this.getDeviceUseCase.getDevicesByUserId(parsedIdUser);
      if (devices.length > 0) {
        // Si se encuentran dispositivos, envía una respuesta exitosa
        res.status(200).send({
          status: "success",
          data: devices.map((device) => ({
            id: device.id,
            idUser: device.idUser,
            name: device.name,
            description: device.description,
            status: device.status,
            category: device.category,
          })),
        });
      } else {
        // Si no se encuentran dispositivos, envía una respuesta indicando que no se encontraron dispositivos
        res.status(204).send({
          status: "success",
          data: "No se encontraron dispositivos para el idUser proporcionado.",
        });
      }
    } catch (error) {
      // En caso de error, envía una respuesta de error
      console.error("Error al obtener dispositivos:", error);
      res.status(500).send({
        status: "error",
        message: "Ocurrió un error al obtener dispositivos",
      });
    }
  }
}




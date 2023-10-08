import { Request, Response } from "express";
import { GetDeviceUseCase } from "../../application/GetDeviceUseCase";

export class GetDevicesController {
  constructor(readonly getDeviceUseCase: GetDeviceUseCase) {}

  async run(req: Request, res: Response) {
    try {
      const { idUser } = req.body; // Obtenemos el idUser del cuerpo de la solicitud

      if (!idUser) {
        // Verificamos que se haya proporcionado el idUser en el cuerpo
        res.status(400).send({
          status: "error",
          message: "El campo 'idUser' es obligatorio en el cuerpo de la solicitud.",
        });
        return;
      }

      // Llama al caso de uso para obtener todos los dispositivos relacionados con idUser
      const devices = await this.getDeviceUseCase.getDevicesByUserId(idUser);

      if (devices.length > 0) {
        // Si se encuentran dispositivos, envía una respuesta exitosa
        res.status(200).send({
          status: "success",
          data: devices.map((device) => ({
            id: device.id,
            idUser: device.idUser,
            name: device.name,
            description: device.description,
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




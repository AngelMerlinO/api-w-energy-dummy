import { Request, Response } from "express";
import { GetStatusDeviceUseCase } from "../../application/GetStatusUseCase";

export class GetStatusDeviceController {
  constructor(readonly GetStatusDeviceUseCase: GetStatusDeviceUseCase) {}

  async run(req: Request, res: Response) {
    try {
      const id  = Number(req.params.deviceID); // Obtenemos el 'id' del cuerpo de la solicitud
      console.log(id);

      if (!id) {
        // Verificamos que se haya proporcionado el 'id' en el cuerpo
        res.status(400).send({
          status: "error",
          message: "El campo 'id' es obligatorio en el cuerpo de la solicitud.",
        });
        return;
      }

      // Llama al caso de uso para obtener el estado (status) del dispositivo correspondiente al 'id'
      const device = await this.GetStatusDeviceUseCase.getStatusDevice(id);
      if (device) {
        // Si se encuentra el dispositivo, envía una respuesta exitosa con el estado
        res.status(200).send({
          status: "success",
          deviceStatus: device.status,
        });
      } else {
        // Si no se encuentra el dispositivo, envía una respuesta indicando que no se encontró el dispositivo
        res.status(204).send({
          status: "success",
          data: "No se encontró el dispositivo para el 'id' proporcionado.",
        });
      }
    } catch (error) {
      // En caso de error, envía una respuesta de error
      console.error("Error al obtener el estado del dispositivo:", error);
      res.status(500).send({
        status: "error",
        message: "Ocurrió un error al obtener el estado del dispositivo",
      });
    }
  }
}

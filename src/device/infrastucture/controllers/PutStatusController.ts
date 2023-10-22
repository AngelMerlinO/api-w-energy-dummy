import { Request, Response } from "express";
import { PutStatusUseCase } from "../../application/PutStatusUseCase";

export class PutStatusController {
  constructor(readonly putStatusUseCase: PutStatusUseCase) {}

  async run(req: Request, res: Response) {
    try {
      const id = Number(req.params.id); 
      console.log("🚀 ~ file: PutStatusController.ts:10 ~ PutStatusController ~ run ~ id:", id)

      const device = await this.putStatusUseCase.run(id);
      if (device) {
        res.status(200).send({
          device,
        });
      } else {
        // Si no se encuentra el dispositivo, envía una respuesta indicando que no se encontró el dispositivo
        res.status(204).send({
          status: "error",
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

import { query } from "../../database/mysql";
import { Device } from "../domain/device";
import { DeviceRepository } from "../domain/DeviceRepository";

export class MysqlDeviceRepository implements DeviceRepository {

  // Modifica esta función para obtener todos los dispositivos relacionados con el idUser proporcionado en el cuerpo de la solicitud
  async getDevicesByUserId(idUser: number): Promise<Device[]> {
    const sql = "SELECT * FROM Devices WHERE idUser = ?";
    const params: any[] = [idUser];

    try {
      const result = await query(sql, params);
      const devicesData = Object.values(JSON.parse(JSON.stringify(result)));

      // Imprimir el resultado en la consola
      console.log("Resultado de la consulta:", devicesData);

      return devicesData.map((device: any) => new Device(device.id, device.idUser, device.name, device.description));
    } catch (error) {
      return [];
    }
  }
}


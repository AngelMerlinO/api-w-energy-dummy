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

      console.log("Resultado de la consulta:", devicesData);

      return devicesData.map((device: any) => new Device(device.id, device.idUser, device.name, device.description,device.status));
    } catch (error) {
      return [];
    }
  }

  async getStatusDevice(id: number): Promise<Device | null> {
    const sql = "SELECT status FROM Devices WHERE id = ?";
    const params: any[] = [id];
  
    try {
      const [data]: any = await query(sql, params);
  
      if (data && data) {
        console.log("Resultado de la consulta:", data); // Imprime el resultado
        return data;
      } else {
        console.log("No se encontró un estado para el ID:", id); // Imprime un mensaje en caso de no encontrar datos
        return null;
      }
    } catch (error) {
      console.error("Error al obtener el estado del dispositivo:", error); // Imprime un mensaje de error
      return null;
    }
  }

  async createDevice( idUser: number, name: string, description: string, status: boolean): Promise<Device | null> {
    const sql = "INSERT INTO Devices (idUser, name, description, status) VALUES (?, ?, ?, ?)";
    const params: any[] = [idUser, name, description, status];
    try {
      // Imprime los datos que se están insertando antes de ejecutar la consulta
      console.log("Datos a insertar en Devices:");
      console.log("idUser:", idUser);
      console.log("name:", name);
      console.log("description:", description);
      console.log("status:", status);
  
      const result: any = await query(sql, params);
      const insertedId = result[0].insertId;
  
      return new Device(insertedId, idUser, name, description, status);
    } catch (error) {
      // En caso de error, imprime el error
      console.error("Error al insertar en Devices:", error);
      return null;
    }
  }  
}


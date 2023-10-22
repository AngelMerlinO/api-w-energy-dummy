import { query } from "../../database/mysql";
import { Device } from "../domain/device";
import { DeviceRepository } from "../domain/DeviceRepository";

export class MysqlDeviceRepository implements DeviceRepository {

  // Modifica esta función para obtener todos los dispositivos relacionados con el idUser proporcionado en el cuerpo de la solicitud
  async getDevicesByUserId(idUser: number): Promise<Device[]> {
    const sql = "SELECT * FROM Devices WHERE idUser = ?";
    const params: any[] = [idUser];

    try {
      const result: any = await query(sql, params);
      console.log("Resultados de la consulta SQL:", result); // Verifica los resultados de la consulta

      const devicesData: Device[] = result[0].map((row: any) => {
        return new Device(row.id, row.idUser, row.name, row.description, row.status,row.category);
      });
      
      console.log("Dispositivos mapeados:", devicesData); // Verifica los dispositivos mapeados

      return devicesData;
    } catch (error) {
      console.error("Error al obtener dispositivos:", error);
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
        return data[0];
      } else {
        console.log("No se encontró un estado para el ID:", id); // Imprime un mensaje en caso de no encontrar datos
        return null;
      }
    } catch (error) {
      console.error("Error al obtener el estado del dispositivo:", error); // Imprime un mensaje de error
      return null;
    }
  }

  async createDevice( idUser: number, name: string, description: string, status: boolean,category:string): Promise<Device | null> {
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
  
      return new Device(insertedId, idUser, name, description, status,category);
    } catch (error) {
      // En caso de error, imprime el error
      console.error("Error al insertar en Devices:", error);
      return null;
    }
  }  
  async putStatus(id: number): Promise<Device | null> {
    // Obtén el dispositivo con el ID proporcionado
    const getDeviceSql = "SELECT * FROM Devices WHERE id = ?";
    const getDeviceParams: any[] = [id];
  
    try {
      const [deviceData]: any = await query(getDeviceSql, getDeviceParams);
      console.log("🚀 ~ file: MysqlDeviceRepository.ts:80 ~ MysqlDeviceRepository ~ putStatus ~ deviceData:", deviceData)
  
      if (deviceData && deviceData.length > 0) {
        const device: Device = deviceData[0];
  
        const newStatus = device.status ? 0 : 1;
        const updateStatusSql = "UPDATE Devices SET status = ? WHERE id = ?";
        const updateStatusParams: any[] = [newStatus, id];
        const result: any = await query(updateStatusSql, updateStatusParams);
        console.log("🚀 ~ file: MysqlDeviceRepository.ts:90 ~ MysqlDeviceRepository ~ putStatus ~ result:", result)
        //cambio de status
        const newDeviceData = deviceData.map((device: Device) => {
          return {
            ...device,
            status: newStatus
          };
        });
  
        if (result[0].affectedRows > 0) {
  
          console.log(`Se ha cambiado el estado del dispositivo con ID ${id} a ${newStatus}`);
          return newDeviceData;
        } else {
          console.log(`No se pudo cambiar el estado del dispositivo con ID ${id}`);
          return null;
        }
      } else {
        console.log(`No se encontró un dispositivo con ID ${id}`);
        return null;
      }
    } catch (error) {
      console.error(`Error al cambiar el estado del dispositivo con ID ${id}:`, error);
      return null;
    }
  }
  
  
}

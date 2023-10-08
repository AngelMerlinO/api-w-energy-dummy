import { Device } from "./device";

export interface DeviceRepository {
  // Agrega esta función para obtener todos los dispositivos relacionados con un idUser
  getDevicesByUserId(idUser: number): Promise<Device[]>;
}

import { Device } from "./device";

export interface DeviceRepository {
  getDevicesByUserId(idUser: number): Promise<Device[]>;
  getStatusDevice(id:number):Promise<Device | null>
}

import { Device } from "./device";

export interface DeviceRepository {
  getDevicesByUserId(idUser: number): Promise<Device[]>;
  getStatusDevice(id:number):Promise<Device | null>
  createDevice(idUser:number, name:string, description:string, status:boolean):Promise <Device|null>
}

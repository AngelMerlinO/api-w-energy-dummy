import { Device } from "../domain/device";
import { DeviceRepository } from "../domain/DeviceRepository";

export class GetDeviceUseCase {
  constructor(readonly DeviceRepository: DeviceRepository) {}

  async getDevicesByUserId(idUser: number): Promise<Device[]> {
    try {
      const devices = await this.DeviceRepository.getDevicesByUserId(idUser);
      
      return devices;
    } catch (error) {
      return [];
    }
  }
}


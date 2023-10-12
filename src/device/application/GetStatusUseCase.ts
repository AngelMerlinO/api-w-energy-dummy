import { Device } from "../domain/device";
import { DeviceRepository } from "../domain/DeviceRepository";

export class GetStatusDeviceUseCase {
  constructor(readonly DeviceRepository: DeviceRepository) {}

  async getStatusDevice(id: number): Promise<Device | null> {
    try {
      const status = await this.DeviceRepository.getStatusDevice(id);
      return status;
    } catch (error) {
      console.error("Error al obtener el estado del dispositivo:", error);
      return null; // Devuelve null en caso de error
    }
  }
}

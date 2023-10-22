import { Device } from "../domain/device";
import { DeviceRepository } from "../domain/DeviceRepository";

export class PutStatusUseCase {
  constructor(readonly DeviceRepository: DeviceRepository) {}

  async run(id: number): Promise<Device | null> {
    try {
      const device = await this.DeviceRepository.putStatus(id);
      return device;
    } catch (error) {
      console.error("Error al obtener el estado del dispositivo:", error);
      return null; 
    }
  }
}

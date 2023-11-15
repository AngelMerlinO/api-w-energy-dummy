import { RegisterRepository } from "../domain/RegisterRepository";

export class GetAllDataUseCase {
  constructor(private readonly registerRepository: RegisterRepository) {}

  async run(): Promise<any[] | null> {
    try {
      const allData = await this.registerRepository.getAllChartData();
      
      if (allData) {
        return allData;
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

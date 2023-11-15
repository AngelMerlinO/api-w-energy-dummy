import { RegisterRepository } from "../domain/RegisterRepository";

export class GetRegistersFocoUseCase {
  constructor(private readonly registerRepository: RegisterRepository) {}

  async run(): Promise<any[] | null> {
    try {
      const Registers = await this.registerRepository.getRegistersFoco();
      
      if (Registers) {
        return Registers;
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

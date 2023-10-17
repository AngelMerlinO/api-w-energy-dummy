import { Register } from "../domain/register";
import { RegisterRepository } from "../domain/RegisterRepository"

export class CreateRegisterUsecase{
    constructor(readonly registerRepository: RegisterRepository){}
    async run(
         idDevice: number,
         date: string,
         voltage: number,
         amps: number,
         power: number
    ): Promise <Register|null>{
        try {
            const Registers = await this.registerRepository.createRegister(
                idDevice,
                date,
                voltage,
                amps,
                power
            );
            return Registers;
          } catch (error) {
            return null;
          }
    }
}
import { Register } from "./register";

export interface RegisterRepository{
    createRegister(idDevice: number,date: string,voltage: number,amps: number,power: number): Promise<Register|null>;
}
export class Register {
    constructor(
        readonly id: number,
        readonly idDevice: number,
        readonly date: string,
        readonly voltage: number,
        readonly amps: number,
        readonly power: number
    ){}
}
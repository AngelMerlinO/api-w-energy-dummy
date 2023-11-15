import { Request, Response } from 'express';
import { GetRegistersFocoUseCase } from '../../application/GetRegistersFocoUseCase';

export class GetRegistersFocoController {
    constructor(private readonly getRegisters: GetRegistersFocoUseCase) {}

    async run(_: Request, res: Response): Promise<void> {
        try {
            const chartData: any = await this.getRegisters.run();
            if (chartData) {
                res.status(200).json({data:chartData});
            } else {
                res.status(404).json({ message: 'No se encontraron datos para el gráfico.' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al obtener datos para el gráfico.' });
        }
    }
}

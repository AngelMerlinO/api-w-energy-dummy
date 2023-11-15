import { Request, Response } from 'express';
import { GetAllDataUseCase } from '../../application/GetAllDataUseCase';

export class GetAllDataChartController {
    constructor(private readonly getAllDataUseCase: GetAllDataUseCase) {}

    async run(_: Request, res: Response): Promise<void> {
        try {
            const chartData: any = await this.getAllDataUseCase.run();
            if (chartData) {
                res.status(200).json(chartData);
            } else {
                res.status(404).json({ message: 'No se encontraron datos para el gráfico.' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al obtener datos para el gráfico.' });
        }
    }
}

import { query } from "../../database/mysql";
import { Register } from "../domain/register";
import { RegisterRepository } from "../domain/RegisterRepository";

export class MysqlRegisterRepository implements RegisterRepository {
    async createRegister(
        idDevice: number,
        date: string,
        voltage: number,
        amps: number,
        power: number
    ): Promise<Register | null> {
        const sql = 'INSERT INTO Register (idDevice, date, voltage, amps, power) VALUES (?, ?, ?, ?, ?)';
        const params: any[] = [idDevice, date, voltage, amps, power];

        try {
          const result: any = await query(sql, params);
          const insertedId = result[0].insertId;

          return new Register(insertedId, idDevice, date, voltage, amps, power);
        } catch (error) {
          return null;
        }
    }

    async getAllChartData(): Promise<any> {
      const sql = `
      SELECT MONTHNAME(new_date) AS month, SUM(gasto) AS totalGasto, SUM(kWh) AS totalKwh, SUM(time) AS totalTime
        FROM Measurement
        WHERE new_date IS NOT NULL
        GROUP BY MONTH(new_date), YEAR(new_date), new_date;
      `;

      // ! Here consulta dos
      const sql2 = `
  SELECT 
        MONTHNAME(m.new_date) AS month,
        m.IdDevice AS deviceId,
        d.name AS deviceName,
        ROUND(SUM(m.kWh), 2) AS kwh
    FROM 
        Measurement m
    JOIN 
        Devices d ON m.IdDevice = d.id
    WHERE 
        m.new_date IS NOT NULL AND m.IdDevice IN (1, 19, 20,13)
    GROUP BY 
        MONTH(m.new_date), m.IdDevice, m.new_date   
    ORDER BY 
        MONTH(m.new_date), m.IdDevice;
`;

      try {
        //! Obtener datos del gráfico de líneas
    const [lineChartData]: any = await query(sql, []);
    
    //! Obtener datos del gráfico circular
    const [circleChartData]: any = await query(sql2, []);

    //! Extraer meses y valores para el gráfico de líneas
    const months = lineChartData.map((item: any) => item.month);
    const totalGasto = lineChartData.map((item: any) => parseFloat(item.totalGasto));
    const totalKwh = lineChartData.map((item: any) => parseFloat(item.totalKwh));
    const totalTime = lineChartData.map((item: any) => parseInt(((item.totalTime)/60/60).toFixed(2)));

    //! Organizar datos del gráfico circular por dispositivo
    const devicesData: { [key: string]: number[] } = {};
    circleChartData.forEach((item: any) => {
        const { deviceName, kwh } = item;
        if (!devicesData[deviceName]) {
            devicesData[deviceName] = [];
        }
        devicesData[deviceName].push(parseFloat(kwh));
    });

    //! Calcular porcentajes de consumo para cada dispositivo
    const totalUsage = Object.values(devicesData).reduce((acc: number, deviceUsage: number[]) => {
        return acc + deviceUsage.reduce((deviceTotal: number, monthlyUsage: number) => deviceTotal + monthlyUsage, 0);
    }, 0);

    const devicePercentages: number[] = Object.values(devicesData).map((deviceUsage: number[]) => {
        const deviceTotal = deviceUsage.reduce((acc: number, monthlyUsage: number) => acc + monthlyUsage, 0);
        return parseFloat((deviceTotal / totalUsage * 100).toFixed(2));
    });

    const deviceNames: string[] = Object.keys(devicesData);

    //! Crear nuevo gráfico con porcentajes de consumo
    const newChart = {
        percentages: devicePercentages,
        devices: deviceNames,
    };

    const combinedData = {
        lineChart: {
            month: months,
            totalGasto: totalGasto,
            totalKwh: totalKwh,
            totalTime: totalTime,
        },
        Barchart: devicesData,
        circleChart: newChart,
    };

    return combinedData;
      } catch (error) {
          console.error(error);
          throw new Error('Error al obtener datos para el gráfico.');
      }
  }

    async getRegistersFoco(): Promise<any> {
        const sql = 'SELECT * FROM Register WHERE idDevice = 1';

        try {
            const result: any = await query(sql, []);

            // Extraer solo los registros (ignorar la segunda parte que contiene los nombres de las columnas)
            const registros = Array.isArray(result) && result.length > 0 ? result[0] : [];
            // Calcula la eficiencia y el tiempo para cada registro
            const eficiencia: number[] = [];
            const tiempo: string[] = [];

            registros.forEach((registro: any) => {
                // Verifica si las columnas voltage, amps y power existen y no son undefined
                if (registro.voltage !== undefined && registro.amps !== undefined && registro.power !== undefined) {
                    const voltage = parseFloat(registro.voltage); // Convierte la cadena a número
                    const current = parseFloat(registro.amps); // Convierte la cadena a número
                    const outputPower = parseFloat(registro.power); // Convierte la cadena a número

                    // Verifica si la conversión fue exitosa antes de calcular la eficiencia
                    if (!isNaN(voltage) && !isNaN(current) && !isNaN(outputPower)) {
                        const inputPower = voltage * current;
                        const efficiency = outputPower / inputPower;
                        eficiencia.push(Math.round(efficiency * 100)); // Multiplica por 100 y redondea al entero más cercano
                    } else {
                        console.error(`Error de conversión: voltage=${registro.voltage}, amps=${registro.amps}, power=${registro.power}`);
                    }
                } else {
                    console.error(`Valores indefinidos en voltage, amps o power en el registro:`, registro);
                }

                tiempo.push(`${tiempo.length * 5} Segundos`); // Incrementa el tiempo en bloques de 5 segundos
            });



            
            let data = { "eficiencia": eficiencia, "Tiempo": tiempo };
            console.log("🚀 ~ file: MyslRegisterRepository.ts:151 ~ MysqlRegisterRepository ~ getRegistersFoco ~ data:", data)
            return data;

        } catch (error) {
            console.error(error);
            throw new Error('Error fetching Foco registers.');
        }
    }





}
 
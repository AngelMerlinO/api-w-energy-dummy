import { query } from "../../database/mysql";
import { Register } from "../domain/register";
import { RegisterRepository } from "../domain/registerRepository";

export class MysqlRegisterRepository implements RegisterRepository{
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

}
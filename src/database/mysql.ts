import dotenv from "dotenv";
import mysql from "mysql2/promise";
import { Signale } from "signale";

dotenv.config();
const signale = new Signale();

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 8,
};

// Crear el pool de conexiones
const pool = mysql.createPool(config);

export async function query(sql: string, params: any[]) {
  try {
    const conn = await pool.getConnection();
    signale.success("Conexión exitosa a la BD");
    const result = await conn.execute(sql, params);
    conn.release();
    return result;
  } catch (error) {
    signale.error(error);
    return null;
  }
}

import { query } from "../../database/mysql";
import { Users } from "../domain/users";
import { UsersRepository } from "../domain/UsersRepository";

export class MysqlUsersRepository implements UsersRepository {
  async login(mail: string, password: string): Promise<Users | null> {
    const sql = "SELECT * FROM Users WHERE mail = ?";
    const params: any[] = [mail];

    try {
      const [data]: any = await query(sql, params);
      console.log(`🤨😶🤐|| 🥓 file: MysqlUsersRepository.ts:12 🥓 MysqlUsersRepository 🥓 login 🥓 data||`, data)
      const userData = Object.values(JSON.parse(JSON.stringify(data)));

      if (userData.length === 0) {
        return null;
      }

      const user: any = userData[0];

      if (user.password !== password) {
        return null;
      }

      return new Users(user.id, user.name, user.password, user.mail);
    } catch (error) {
      return null;
    }
  }

  async createUsers(
    name: string,
    password: string,
    mail: string
  ): Promise<Users | null> {
    const sql = "INSERT INTO Users (name, password, mail) VALUES (?, ?, ?)";
    const params: any[] = [name, password, mail];
    try {
      const result: any = await query(sql, params);
      const insertedId = result[0].insertId;
  
      return new Users(insertedId, name, password, mail);
    } catch (error) {
      return null;
    }
  }
  
  
}

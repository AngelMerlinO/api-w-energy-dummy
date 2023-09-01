import { Users } from "./users";

export interface UsersRepository {
  login(mail: string, password: string): Promise<Users | null>;
  createUsers(name: string, password: string, mail: string): Promise<Users | null>;
}

import { Users } from "../domain/users";
import { UsersRepository } from "../domain/UsersRepository";

export class CreateUsersUseCase {
  constructor(readonly usersRepository: UsersRepository) {}

  async run(
    name: string,
    password: string,
    mail: string
  ): Promise<Users | null> {
    try {
      const users = await this.usersRepository.createUsers(
        name,
        password,
        mail
      );
      return users;
    } catch (error) {
      return null;
    }
  }
}

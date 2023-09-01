import { Users } from "../domain/users";
import { UsersRepository } from "../domain/UsersRepository";

export class LoginUseCase {
  constructor(readonly usersRepository: UsersRepository) {}

  async run(mail: string, password: string): Promise<Users | null> {
    try {
      const user = await this.usersRepository.login(mail, password);
      console.log(`🤨😶🤐|| 🥓 file: LoginUseCase.ts:10 🥓 LoginUseCase 🥓 run 🥓 password||`, password)
      console.log(`🤨😶🤐|| 🥓 file: LoginUseCase.ts:10 🥓 LoginUseCase 🥓 run 🥓 mail||`, mail)
      console.log(`🤨😶🤐|| 🥓 file: LoginUseCase.ts:10 🥓 LoginUseCase 🥓 run 🥓 user||`, user)
      return user;
    } catch (error) {
      console.log(`🤨😶🤐|| 🥓 file: LoginUseCase.ts:13 🥓 LoginUseCase 🥓 run 🥓 error||`, error)
      return null;
    }
  }
}

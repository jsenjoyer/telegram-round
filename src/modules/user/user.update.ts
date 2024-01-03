import { Start, Update } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { UserService } from './user.service';

@Update()
export class UserUpdate {
  constructor(private readonly userService: UserService) {}

  @Start()
  async start(ctx: Context) {
    const { first_name: firstName, id, username: userName } = ctx.from;
    await this.userService.registerUser({
      firstName,
      userName,
      tgId: id.toString(),
    });
  }
}

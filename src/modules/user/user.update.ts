import { Start, Update } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { UserService } from './user.service';
import { SceneContext } from 'telegraf/typings/scenes';
import { VIDEO_WIZARD } from '../video/video.wizard';

@Update()
export class UserUpdate {
  constructor(private readonly userService: UserService) {}

  @Start()
  async start(ctx: SceneContext) {
    const { first_name: firstName, id, username: userName } = ctx.from;
    await ctx.scene.enter(VIDEO_WIZARD);
    await this.userService.registerUser({
      firstName,
      userName,
      tgId: id.toString(),
    });
  }
}

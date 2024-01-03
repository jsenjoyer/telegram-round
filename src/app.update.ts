import { Update, Ctx, Start, Help, On, Hears } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user/user.schema';
import { Model } from 'mongoose';

@Update()
export class AppUpdate {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  @Start()
  async start(@Ctx() ctx: Context) {
    const { id, first_name, username } = ctx.message.from;
    const user = await this.userModel.findOne({ tgId: id });
    if (!user) {
      const newUser = new this.userModel({
        firstName: first_name,
        userName: username,
        tgId: id,
      });
      await newUser.save();
      await ctx.reply('welcome');
    }
    await ctx.reply('u already exist');
  }

  @Hears('hi')
  async hears(@Ctx() ctx: any) {
    console.log(ctx);
    await ctx.reply('Hey there');
  }
}

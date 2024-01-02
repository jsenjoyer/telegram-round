import { Update, Ctx, Start, Help, On, Hears } from 'nestjs-telegraf';
import { Context } from 'telegraf';

@Update()
export class AppUpdate {
  @Start()
  async start(@Ctx() ctx: Context) {
    await ctx.reply('welcome');
  }

  @Hears('hi')
  async hears(@Ctx() ctx: any) {
    console.log(ctx);
    await ctx.reply('Hey there');
  }
}

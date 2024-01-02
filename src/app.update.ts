import { Update, Ctx, Start, Help, On, Hears } from 'nestjs-telegraf';

@Update()
export class AppUpdate {
  @Start()
  async start(@Ctx() ctx: any) {
    console.log('start');
    await ctx.reply('Welcome');
  }

  @Help()
  async help(@Ctx() ctx: any) {
    await ctx.reply('Send me a sticker');
  }

  @On('sticker')
  async on(@Ctx() ctx: any) {
    await ctx.reply('👍');
  }

  @Hears('hi')
  async hears(@Ctx() ctx: any) {
    console.log(ctx);
    await ctx.reply('Hey there');
  }
}

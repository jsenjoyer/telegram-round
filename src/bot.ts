import { Bot } from "grammy";

// Замените 'YOUR_BOT_TOKEN' на токен вашего Telegram-бота
const bot = new Bot("YOUR_BOT_TOKEN");

bot.on('message', (ctx) => ctx.reply('ss'))

bot.start();


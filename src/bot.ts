import { Bot } from "grammy";

// Замените 'YOUR_BOT_TOKEN' на токен вашего Telegram-бота
const bot = new Bot<string>("YOUR_BOT_TOKEN");

bot.command("start", (ctx) => ctx.reply("Бот успешно запущен!"));

bot.start();


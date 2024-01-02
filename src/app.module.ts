import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TelegrafModule } from 'nestjs-telegraf';
import * as process from 'process';
import { Update } from 'nestjs-telegraf';
import { AppUpdate } from './app.update';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TelegrafModule.forRoot({
      token: process.env.TELEGRAM_BOT_KEY,
    }),
  ],
  controllers: [],
  providers: [AppUpdate],
})
export class AppModule {}

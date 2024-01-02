import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TelegrafModule } from 'nestjs-telegraf';
import * as process from 'process';
import { AppUpdate } from './app.update';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TelegrafModule.forRoot({
      token: process.env.TELEGRAM_BOT_KEY,
    }),
    MongooseModule.forRoot(process.env.MONGO_DB),
  ],
  controllers: [],
  providers: [AppUpdate],
})
export class AppModule {}

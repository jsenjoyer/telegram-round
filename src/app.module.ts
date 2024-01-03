import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TelegrafModule } from 'nestjs-telegraf';
import * as process from 'process';
import { MongooseModule } from '@nestjs/mongoose';
import { session } from 'telegraf';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TelegrafModule.forRoot({
      token: process.env.TELEGRAM_BOT_KEY,
      middlewares: [session()],
    }),
    MongooseModule.forRoot(process.env.MONGO_DB),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

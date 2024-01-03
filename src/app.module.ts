import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TelegrafModule, Use } from 'nestjs-telegraf';
import * as process from 'process';
import { AppUpdate } from './app.update';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { session } from 'telegraf';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TelegrafModule.forRoot({
      token: process.env.TELEGRAM_BOT_KEY,
      middlewares: [session()],
    }),
    MongooseModule.forRoot(process.env.MONGO_DB),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [],
  providers: [AppUpdate],
})
export class AppModule {}

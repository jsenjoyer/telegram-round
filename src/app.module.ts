import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TelegrafModule } from 'nestjs-telegraf';
import * as process from 'process';
import { MongooseModule } from '@nestjs/mongoose';
import { session } from 'telegraf';
import { UserModule } from './modules/user/user.module';
import { VideoModule } from './modules/video/video.module';
import { SharedModule } from './modules/shared/shared.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TelegrafModule.forRoot({
      token: process.env.TELEGRAM_BOT_KEY,
      middlewares: [session()],
    }),
    MongooseModule.forRoot(process.env.MONGO_DB),
    UserModule,
    VideoModule,
    SharedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

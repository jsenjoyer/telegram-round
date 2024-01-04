import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../schemas/user/user.schema';
import { UserService } from './user.service';
import { UserUpdate } from './user.update';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    SharedModule,
  ],
  providers: [UserService, UserUpdate],
})
export class UserModule {}

import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  firstName: string;

  @Prop()
  userName?: string;

  @Prop()
  tgId: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

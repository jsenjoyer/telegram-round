import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../schemas/user/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async registerUser(user: User) {
    const existinguser = await this.findUser(user.tgId);
    if (!existinguser) {
      const createdUser = new this.userModel(user);
      await createdUser.save();
    }
  }

  private async findUser(tgId: string) {
    return this.userModel.findOne({ tgId });
  }
}

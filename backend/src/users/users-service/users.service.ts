import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schema/schema-user';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async findByUsername(username: string) {
    return this.userModel.findOne({ username }).exec();
  }

  async createUser(data: {
    username: string;
    passwordHash: string;
    role: 'admin' | 'operator';
  }) {
    const user = new this.userModel(data);
    return user.save();
  }

  async countUsers() {
    return this.userModel.countDocuments().exec();
  }
}
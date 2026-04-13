import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from '../users-service/users.service';
import { User, UserSchema } from '../schema/schema-user';
import { UsersSeedService } from '../user-seed/user-seed';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UsersService,UsersSeedService],
  exports: [UsersService],
})
export class UsersModule {}
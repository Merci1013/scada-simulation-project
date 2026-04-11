import { Injectable, OnModuleInit } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users-service/users.service';

@Injectable()
export class UsersSeedService implements OnModuleInit {
  constructor(private readonly usersService: UsersService) {}

  async onModuleInit() {
    const userCount = await this.usersService.countUsers();

    if (userCount > 0) {
      console.log('[UsersSeed] Des utilisateurs existent déjà');
      return;
    }

    const username = process.env.INIT_ADMIN_USERNAME || 'admin';
    const password = process.env.INIT_ADMIN_PASSWORD || 'admin123456';

    const passwordHash = await bcrypt.hash(password, 10);

    await this.usersService.createUser({
      username,
      passwordHash,
      role: 'admin',
    });

    console.log(`[UsersSeed] Admin initial créé: ${username}`);
  }
}
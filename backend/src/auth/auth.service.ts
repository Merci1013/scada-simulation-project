import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users-service/users.service';
import { LoginDto } from './auth-dto/login.dto';
import { RegisterDto } from './auth-dto/register.dto';


@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByUsername(loginDto.username);

    if (!user) {
      throw new UnauthorizedException('Identifiants invalides');
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.passwordHash,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Identifiants invalides');
    }

    const payload = {
      sub: user._id.toString(),
      username: user.username,
      role: user.role,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
      role: user.role,
    };
  }
  async register(registerDto: RegisterDto) {
    const existingUser = await this.usersService.findByUsername(
    registerDto.username,
        );

        if (existingUser) {
            throw new ConflictException('Nom utilisateur déjà utilisé');
        }

        const passwordHash = await bcrypt.hash(registerDto.password, 10);

        const user = await this.usersService.createUser({
            username: registerDto.username,
            passwordHash,
            role: 'operator' as const,
        });

        return {
            id: user._id,
            username: user.username,
            role: user.role,
        };
    }
}
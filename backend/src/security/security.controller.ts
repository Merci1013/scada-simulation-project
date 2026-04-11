import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { SecurityService } from './service/security.service';
import { Roles } from 'src/auth/roles/roles.decorator';


@Controller('security-events')
export class SecurityController {
  constructor(private readonly securityService: SecurityService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get()
  findAll() {
    return this.securityService.findAll();
  }
}
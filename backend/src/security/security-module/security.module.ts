import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SecurityEvent, SecurityEventSchema } from '../schema/security-event.shema';
import { SecurityController } from '../security.controller';
import { SecurityService } from '../service/security.service';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SecurityEvent.name, schema: SecurityEventSchema },
    ]),
  ],
  providers: [SecurityService],
  controllers: [SecurityController],
  exports: [SecurityService],
})
export class SecurityModule {}
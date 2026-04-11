import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/module-user/users.module';
import { SensorsModule } from './sensors/sensor-module/sensor.module';
import { SecurityModule } from './security/security-module/security.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MqttModule } from './mqtt/mqtt.module';

@Module({
  imports: [
   ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const uri = configService.get<string>('MONGO_URI');
        console.log('MONGO_URI loaded =', uri);
        return {
          uri,
        };
      },
    }),
    AuthModule,
    UsersModule,
    SensorsModule,
    SecurityModule,
    MqttModule
  ],
})
export class AppModule {}
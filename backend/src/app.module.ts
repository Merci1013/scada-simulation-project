import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MqttModule } from './mqtt/mqtt.module';
import { SensorsModule } from './sensors/sensors-module/sensor.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI as string),
    MqttModule,
    SensorsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
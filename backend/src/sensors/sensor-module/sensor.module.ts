import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SensorsService } from '../sensor-service/sensor.service';
import { SensorReading, SensorReadingSchema } from '../schema/sensor-reading.shema';
import { SensorsController } from '../sensor-controller/sensor-controller';
import { SecurityModule } from 'src/security/security-module/security.module';
import { Sensor, SensorSchema } from '../schema/sensor-creating.shema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Sensor.name, schema: SensorSchema },
      { name: SensorReading.name, schema: SensorReadingSchema },
    ]),
    SecurityModule,
  ],
  controllers: [SensorsController],
  providers: [SensorsService],
  exports: [SensorsService],
})
export class SensorsModule {}
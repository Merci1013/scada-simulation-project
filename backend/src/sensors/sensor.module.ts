import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SensorReading, SensorReadingSchema } from './schema/sensor-reading.shema';
import { SensorsService } from './sensor.service';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SensorReading.name, schema: SensorReadingSchema },
    ]),
  ],
  providers: [SensorsService],
  exports: [SensorsService],
})
export class SensorsModule {}
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SensorsService } from '../sensor-service/sensor.service';
import { SensorReading, SensorReadingSchema } from '../schema/sensor-reading.shema';



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
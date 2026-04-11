import { Module } from '@nestjs/common';
import { MqttService } from './mqt.service';
import { SensorsModule } from 'src/sensors/sensor-module/sensor.module';



@Module({
  imports: [SensorsModule],
  providers: [MqttService],
  exports: [MqttService],
})
export class MqttModule {}
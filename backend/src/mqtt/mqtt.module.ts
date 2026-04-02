// backend/src/mqtt/mqtt.module.ts
import { Module } from '@nestjs/common';
import { MqttService } from './mqt.service';


@Module({
  providers: [MqttService],
  exports: [MqttService],
})
export class MqttModule {}
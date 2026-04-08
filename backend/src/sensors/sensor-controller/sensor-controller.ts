import { Controller, Get, Param } from '@nestjs/common';
import { SensorsService } from '../sensor-service/sensor.service';


@Controller('sensors')
export class SensorsController {
  constructor(private readonly sensorsService: SensorsService) {}

  @Get('readings')
  async getAllReadings() {
    return this.sensorsService.findAll();
  }

  @Get('readings/topic/:topic')
  async getReadingsByTopic(@Param('topic') topic: string) {
    return this.sensorsService.findByTopic(topic);
  }

  @Get('readings/sensor/:sensorId')
  async getReadingsBySensor(@Param('sensorId') sensorId: string) {
    return this.sensorsService.findBySensorId(sensorId);
  }
}
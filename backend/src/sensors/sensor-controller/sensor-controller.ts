import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SensorsService } from '../sensor-service/sensor.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { CreateSensorDto } from '../sensor-dto/sensor-creating-dto';
import { CreateSensorReadingDto } from '../sensor-dto/sensor-reading-dto';


@Controller('sensors')
export class SensorsController {
  constructor(private readonly sensorsService: SensorsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  createSensor(@Body() createSensorDto: CreateSensorDto) {
    return this.sensorsService.createSensor(createSensorDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAllSensors() {
    return this.sensorsService.findAllSensors();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':sensorId')
  findSensorBySensorId(@Param('sensorId') sensorId: string) {
    return this.sensorsService.findSensorBySensorId(sensorId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'operator')
  @Post('readings')
  createReading(@Body() createSensorReadingDto: CreateSensorReadingDto) {
    return this.sensorsService.createReading(createSensorReadingDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get('readings/all')
  findAllReadings() {
    return this.sensorsService.findAllReadings();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get('readings/topic/:topic')
  findReadingsByTopic(@Param('topic') topic: string) {
    return this.sensorsService.findReadingsByTopic(topic);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get('readings/sensor/:sensorId')
  findReadingsBySensorId(@Param('sensorId') sensorId: string) {
    return this.sensorsService.findReadingsBySensorId(sensorId);
  }
}
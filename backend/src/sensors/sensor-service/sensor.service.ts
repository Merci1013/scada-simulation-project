import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  SensorReading,
  SensorReadingDocument,
} from '../schema/sensor-reading.shema';
import { CreateSensorReadingDto } from '../sensor-dto/sensor-reading-dto';
import { Sensor, SensorDocument } from '../schema/sensor-creating.shema';
import { SecurityService } from 'src/security/service/security.service';
import { CreateSensorDto } from '../sensor-dto/sensor-creating-dto';

@Injectable()
export class SensorsService {
  constructor(
    @InjectModel(Sensor.name)
    private readonly sensorConfigModel: Model<SensorDocument>,

    @InjectModel(SensorReading.name)
    private readonly sensorReadingModel: Model<SensorReadingDocument>,

    private readonly securityService: SecurityService,
  ) {}

  async createSensor(data: CreateSensorDto) {
    const existingSensor = await this.sensorConfigModel
      .findOne({ sensorId: data.sensorId })
      .exec();

    if (existingSensor) {
      throw new ConflictException('Un capteur avec ce sensorId existe déjà');
    }

    return this.sensorConfigModel.create(data);
  }

  async findAllSensors() {
    return this.sensorConfigModel.find().sort({ createdAt: -1 }).exec();
  }

  async findSensorBySensorId(sensorId: string) {
    const sensor = await this.sensorConfigModel.findOne({ sensorId }).exec();

    if (!sensor) {
      throw new NotFoundException('Capteur introuvable');
    }

    return sensor;
  }

  async createReading(data: CreateSensorReadingDto) {
    const sensor = await this.sensorConfigModel
      .findOne({
        sensorId: data.sensorId,
        topic: data.topic,
      })
      .exec();

    if (!sensor) {
      await this.securityService.logUnknownSensor({
        sensorId: data.sensorId,
        topic: data.topic,
        value: data.value,
      });

      throw new NotFoundException('Capteur non enregistré pour cette lecture');
    }

    if (!sensor.isActive) {
      await this.securityService.logInactiveSensor({
        sensorId: data.sensorId,
        topic: data.topic,
        value: data.value,
      });

      throw new ConflictException('Ce capteur est inactif');
    }

    if (data.value < sensor.minValue || data.value > sensor.maxValue) {
      await this.securityService.logAnomalousValue({
        sensorId: data.sensorId,
        topic: data.topic,
        value: data.value,
      });
    }

    return this.sensorReadingModel.create(data);
  }

  async findAllReadings() {
    return this.sensorReadingModel.find().sort({ createdAt: -1 }).exec();
  }

  async findReadingsByTopic(topic: string) {
    return this.sensorReadingModel.find({ topic }).sort({ createdAt: -1 }).exec();
  }

  async findReadingsBySensorId(sensorId: string) {
    return this.sensorReadingModel
      .find({ sensorId })
      .sort({ createdAt: -1 })
      .exec();
  }
}
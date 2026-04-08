import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SensorReading, SensorReadingDocument } from '../schema/sensor-reading.shema';
import { CreateSensorReadingDto } from '../sensor-dto/sensor-dto';


@Injectable()
export class SensorsService {
  constructor(
    @InjectModel(SensorReading.name)
    private readonly sensorModel: Model<SensorReadingDocument>,
  ) {}

  async createReading(data: CreateSensorReadingDto) {
    return this.sensorModel.create(data);
  }

  async findAll() {
    return this.sensorModel.find().sort({ createdAt: -1 });
  }
  async findByTopic(topic: string) {
  return this.sensorModel.find({ topic }).sort({ createdAt: -1 });
}

async findBySensorId(sensorId: string) {
  return this.sensorModel.find({ sensorId }).sort({ createdAt: -1 });
}
}
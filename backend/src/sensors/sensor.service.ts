import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SensorReading, SensorReadingDocument } from './schema/sensor-reading.shema';


@Injectable()
export class SensorsService {
  constructor(
    @InjectModel(SensorReading.name)
    private readonly sensorModel: Model<SensorReadingDocument>,
  ) {}

  async createReading(topic: string, value: string) {
    return this.sensorModel.create({
      topic,
      value,
    });
  }

  async findAll() {
    return this.sensorModel.find().sort({ createdAt: -1 });
  }
}
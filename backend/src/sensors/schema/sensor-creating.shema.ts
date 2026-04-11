import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { MqttTopics } from 'src/common/enums/mqtt/mqtt-topics.enum';

export type SensorDocument = HydratedDocument<Sensor>;

@Schema({ timestamps: true })
export class Sensor {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, unique: true, trim: true })
  sensorId: string;

  @Prop({ required: true, enum: MqttTopics })
  topic: MqttTopics;

  @Prop({ required: true, trim: true })
  type: string;

  @Prop({ required: true, trim: true })
  unit: string;

  @Prop({ required: true })
  minValue: number;

  @Prop({ required: true })
  maxValue: number;

  @Prop({ trim: true })
  location?: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ required: true, default: 5 })
  reportingIntervalMinutes: number;
}

export const SensorSchema = SchemaFactory.createForClass(Sensor);
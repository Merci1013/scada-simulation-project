import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { MqttTopics } from 'src/common/enums/mqtt/mqtt-topics.enum';

export type SensorReadingDocument = HydratedDocument<SensorReading>;

@Schema({ timestamps: true })
export class SensorReading {
  @Prop({
    required: true,
    enum: Object.values(MqttTopics),
  })
  topic: MqttTopics;

  @Prop({ required: true, trim: true })
  sensorId: string;

  @Prop({ required: true })
  value: number;

  @Prop({ required: true, trim: true })
  unit: string;
}

export const SensorReadingSchema =
  SchemaFactory.createForClass(SensorReading);
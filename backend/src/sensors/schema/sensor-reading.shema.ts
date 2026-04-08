import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { MqttTopics } from 'src/common/enums/mqtt-topics.enum';

export type SensorReadingDocument = SensorReading & Document;

@Schema({ timestamps: true })
export class SensorReading {
   @Prop({
    required: true,
    enum: Object.values(MqttTopics),
  })
  topic: MqttTopics;

  @Prop({ required: true })
  sensorId: string;

  @Prop({ required: true })
  value: number;

  @Prop({ required: true })
  unit: string;
}

export const SensorReadingSchema = SchemaFactory.createForClass(SensorReading);
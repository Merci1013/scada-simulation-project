import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SensorReadingDocument = SensorReading & Document;

@Schema({ timestamps: true })
export class SensorReading {
  @Prop({ required: true })
  topic: string;

  @Prop({ required: true })
  value: string;
}

export const SensorReadingSchema = SchemaFactory.createForClass(SensorReading);
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { SecuritySeverity } from 'src/common/enums/security/severity';
import { SecurityEventType } from 'src/common/enums/security/type';

export type SecurityEventDocument = HydratedDocument<SecurityEvent>;

@Schema({ timestamps: true })
export class SecurityEvent {
  @Prop({
  required: true,
  enum: SecurityEventType})
  type: SecurityEventType;

  @Prop({
  required: true,
  enum: SecuritySeverity})
  severity: SecuritySeverity;

  @Prop({ required: true, trim: true })
  message: string;

  @Prop({ trim: true })
  sensorId?: string;

  @Prop({ trim: true })
  topic?: string;

  @Prop()
  value?: number;
}

export const SecurityEventSchema = SchemaFactory.createForClass(SecurityEvent);
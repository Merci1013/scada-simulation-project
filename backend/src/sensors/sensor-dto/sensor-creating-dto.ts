import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { MqttTopics } from 'src/common/enums/mqtt/mqtt-topics.enum';

export class CreateSensorDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  sensorId: string;

  @IsEnum(MqttTopics)
  topic: MqttTopics;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  unit: string;

  @IsNumber()
  minValue: number;

  @IsNumber()
  maxValue: number;

  @IsString()
  @IsOptional()
  location?: string;

  @IsBoolean()
  isActive: boolean;

  @IsNumber()
  @Min(0)
  @Max(1440)
  reportingIntervalMinutes: number;
}
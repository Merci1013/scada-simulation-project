import { IsEnum, IsNumber, IsString } from 'class-validator';
import { MqttTopics } from 'src/common/enums/mqtt/mqtt-topics.enum';

export class CreateSensorReadingDto {
  @IsEnum(MqttTopics)
  topic: MqttTopics;

  @IsString()
  sensorId: string;

  @IsNumber()
  value: number;

  @IsString()
  unit: string;
}
import { MqttTopic } from "../enums/mqtt-topic.type";

export interface CreateSensorDto {
  name: string;
  sensorId: string;
  topic: MqttTopic;
  type: string;
  unit: string;
  minValue: number;
  maxValue: number;
  location?: string;
  isActive: boolean;
  reportingIntervalMinutes: number;
}
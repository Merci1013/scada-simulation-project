export interface Sensor {
  sensorId: string;
  name: string;
  topic: string;
  location?: string;
  unit?: string;
  createdAt?: string;
}

export interface SensorReading {
  topic: string;
  sensorId: string;
  value: number;
  unit: string;
  createdAt?: string;
}

export interface CreateSensorRequest {
  sensorId: string;
  name: string;
  topic: string;
  location?: string;
  unit?: string;
}
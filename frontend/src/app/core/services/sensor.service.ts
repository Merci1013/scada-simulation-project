import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CreateSensorRequest,
  Sensor,
  SensorReading,
} from '../models/sensor.model';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class SensorsService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/sensors`;

  createSensor(payload: CreateSensorRequest): Observable<Sensor> {
    return this.http.post<Sensor>(this.baseUrl, payload);
  }

  findAllSensors(): Observable<Sensor[]> {
    return this.http.get<Sensor[]>(this.baseUrl);
  }

  findSensorById(sensorId: string): Observable<Sensor> {
    return this.http.get<Sensor>(`${this.baseUrl}/${sensorId}`);
  }

  createReading(payload: SensorReading): Observable<SensorReading> {
    return this.http.post<SensorReading>(`${this.baseUrl}/readings`, payload);
  }

  findAllReadings(): Observable<SensorReading[]> {
    return this.http.get<SensorReading[]>(`${this.baseUrl}/readings/all`);
  }

  findReadingsByTopic(topic: string): Observable<SensorReading[]> {
    return this.http.get<SensorReading[]>(
      `${this.baseUrl}/readings/topic/${topic}`,
    );
  }

  findReadingsBySensorId(sensorId: string): Observable<SensorReading[]> {
    return this.http.get<SensorReading[]>(
      `${this.baseUrl}/readings/sensor/${sensorId}`,
    );
  }
}
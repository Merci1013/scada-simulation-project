import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LoginResponse {
  access_token: string;
}

export interface JwtPayload {
  sub: string;
  username: string;
  role: 'admin' | 'operator';
  iat?: number;
  exp?: number;
}

@Injectable({
  providedIn: 'root',
})
export class ScadaApiService {
  private readonly baseUrl = 'http://localhost:3000`/api';

  constructor(private readonly http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/auth/login`, {
      username,
      password,
    });
  }

  register(username: string, password: string, role: 'admin' | 'operator') {
    return this.http.post(
      `${this.baseUrl}/auth/register`,
      { username, password, role },
      { headers: this.getAuthHeaders() },
    );
  }

  createSensor(payload: {
    name: string;
    sensorId: string;
    topic: string;
    type: string;
    unit: string;
    minValue: number;
    maxValue: number;
    location?: string;
    isActive: boolean;
    reportingIntervalMinutes: number;
  }) {
    return this.http.post(`${this.baseUrl}/sensors`, payload, {
      headers: this.getAuthHeaders(),
    });
  }

  createReading(payload: {
    topic: string;
    sensorId: string;
    value: number;
    unit: string;
  }) {
    return this.http.post(`${this.baseUrl}/sensors/readings`, payload, {
      headers: this.getAuthHeaders(),
    });
  }

  getSecurityEvents() {
    return this.http.get(`${this.baseUrl}/security-events`, {
      headers: this.getAuthHeaders(),
    });
  }

  getSensors() {
    return this.http.get(`${this.baseUrl}/sensors`, {
      headers: this.getAuthHeaders(),
    });
  }
}
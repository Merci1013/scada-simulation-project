import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SecurityEvent, SecurityEventDocument } from '../schema/security-event.shema';
import { SecurityEventType } from 'src/common/enums/security/type';
import { SecuritySeverity } from 'src/common/enums/security/severity';


@Injectable()
export class SecurityService {
  constructor(
    @InjectModel(SecurityEvent.name)
    private readonly securityEventModel: Model<SecurityEventDocument>,
  ) {}

  async createEvent(data: {
     type: SecurityEventType;
    severity: SecuritySeverity;
    message: string;
    sensorId?: string;
    topic?: string;
    value?: number;
  }) {
    return this.securityEventModel.create(data);
  }

  async logUnknownSensor(data: {
    sensorId: string;
    topic: string;
    value: number;
  }) {
    return this.createEvent({
      type: SecurityEventType.UNKNOWN_SENSOR,
      severity: SecuritySeverity.MEDIUM,
      message: 'Lecture reçue pour un capteur non enregistré',
      sensorId: data.sensorId,
      topic: data.topic,
      value: data.value,
    });
  }

  async logInactiveSensor(data: {
    sensorId: string;
    topic: string;
    value: number;
  }) {
    return this.createEvent({
      type: SecurityEventType.INACTIVE_SENSOR_ACTIVITY,
      severity: SecuritySeverity.MEDIUM,
      message: 'Lecture reçue pour un capteur inactif',
      sensorId: data.sensorId,
      topic: data.topic,
      value: data.value,
    });
  }

  async logAnomalousValue(data: {
    sensorId: string;
    topic: string;
    value: number;
  }) {
    return this.createEvent({
      type: SecurityEventType.ANOMALOUS_SENSOR_VALUE,
      severity: SecuritySeverity.HIGH,
      message: `Valeur hors seuil détectée (${data.value})`,
      sensorId: data.sensorId,
      topic: data.topic,
      value: data.value,
    });
  }

  async logFailedLogin(username: string) {
    return this.createEvent({
      type:  SecurityEventType.FAILED_LOGIN,
      severity: SecuritySeverity.HIGH,
      message: `Tentative de connexion échouée pour l'utilisateur ${username}`,
    });
  }

  async findAll() {
    return this.securityEventModel.find().sort({ createdAt: -1 }).exec();
  }
}
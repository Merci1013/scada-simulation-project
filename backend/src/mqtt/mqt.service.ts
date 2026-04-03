import { Injectable, OnModuleInit } from '@nestjs/common';
import * as mqtt from 'mqtt';
import { SensorsService } from 'src/sensors/sensor.service';


@Injectable()
export class MqttService implements OnModuleInit {
  constructor(private readonly sensorsService: SensorsService) {}

  onModuleInit() {
    const brokerUrl = process.env.MQTT_BROKER_URL || 'mqtt://localhost:1883';
    const client = mqtt.connect(brokerUrl);

    client.on('connect', () => {
      console.log(`[MQTT] Connected to broker: ${brokerUrl}`);

      client.subscribe('scada/temperature', (err) => {
        if (err) {
          console.error('[MQTT] Subscription error:', err);
          return;
        }

        console.log('[MQTT] Subscribed to topic: scada/temperature');
      });
    });

    client.on('message', async (topic: string, message: Buffer) => {
      const value = message.toString();

      console.log(`[MQTT] Message received on ${topic}: ${value}`);

      await this.sensorsService.createReading(topic, value);
      console.log('[MongoDB] Sensor reading saved');
    });

    client.on('error', (error) => {
      console.error('[MQTT] Client error:', error);
    });
  }
}
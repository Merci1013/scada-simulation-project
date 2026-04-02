// backend/src/mqtt/mqtt.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import * as mqtt from 'mqtt';

@Injectable()
export class MqttService implements OnModuleInit {
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

    client.on('message', (topic: string, message: Buffer) => {
      console.log(`[MQTT] Message received on ${topic}: ${message.toString()}`);
    });

    client.on('error', (error) => {
      console.error('[MQTT] Client error:', error);
    });
  }
}
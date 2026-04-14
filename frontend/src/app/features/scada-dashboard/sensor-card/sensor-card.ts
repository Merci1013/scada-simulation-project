import { Component, Input } from '@angular/core';
import { Sensor } from '../../../core/models/sensor.model';

@Component({
  selector: 'app-sensor-card',
  imports: [],
  templateUrl: './sensor-card.html',
  styleUrl: './sensor-card.scss',
})
export class SensorCard {
   @Input() sensor!: Sensor;

}

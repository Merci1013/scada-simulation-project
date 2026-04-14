import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SensorCard } from '../sensor-card/sensor-card';
import { Sensor } from '../../../core/models/sensor.model';

@Component({
  selector: 'app-sensor-list',
  standalone: true,
  imports: [CommonModule, SensorCard],
  templateUrl: './sensor-list.html',
  styleUrl: './sensor-list.scss',
})
export class SensorList {
  @Input() sensors: Sensor[] = [];
}
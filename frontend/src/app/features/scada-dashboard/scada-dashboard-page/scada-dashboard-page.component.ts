import { Component, OnInit, inject } from '@angular/core';
import { Sensor } from '../../../core/models/sensor.model';
import { SensorsService } from '../../../core/services/sensor.service';

@Component({
  selector: 'app-scada-dashboard-page',
  standalone: true,
  templateUrl: './scada-dashboard-page.html',
  styleUrl: './scada-dashboard-page.scss',
})
export class ScadaDashboardPage implements OnInit {
  private readonly sensorsService = inject(SensorsService);

  sensors: Sensor[] = [];
  errorMessage = '';

  ngOnInit(): void {
    this.loadSensors();
  }

  loadSensors(): void {
    this.sensorsService.findAllSensors().subscribe({
      next: (data) => {
        this.sensors = data;
      },
      error: () => {
        this.errorMessage = 'Impossible de charger les capteurs';
      },
    });
  }
}
import { Component, OnInit, inject } from '@angular/core';
import { Sensor } from '../../../core/models/sensor.model';
import { SensorsService } from '../../../core/services/sensor.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ChatBoxComponent } from '../../assistant/components/chat-box/chat-box.component';

@Component({
  selector: 'app-scada-dashboard-page',
  standalone: true,
  templateUrl: './scada-dashboard-page.html',
  styleUrl: './scada-dashboard-page.scss',
  imports: [
    CommonModule,
    ChatBoxComponent,
  ],
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
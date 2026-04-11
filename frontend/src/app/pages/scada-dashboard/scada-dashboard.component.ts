import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScadaApiService } from './scada-api.service';


@Component({
  selector: 'app-scada-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './scada-dashboard.component.html',
  styleUrl: './scada-dashboard.component.scss',
})
export class ScadaDashboardComponent {
  loginForm = {
    username: '',
    password: '',
  };

  registerForm = {
    username: '',
    password: '',
    role: 'operator' as 'admin' | 'operator',
  };

  sensorForm = {
    name: '',
    sensorId: '',
    topic: 'scada/temperature',
    type: 'temperature',
    unit: 'C',
    minValue: 0,
    maxValue: 50,
    location: '',
    isActive: true,
    reportingIntervalMinutes: 5,
  };

  readingForm = {
    sensorId: '',
    topic: 'scada/temperature',
    value: 0,
    unit: 'C',
  };

  securityEvents: any[] = [];
  sensors: any[] = [];

  message = '';
  error = '';
  currentRole: 'admin' | 'operator' | null = null;
  currentUsername = '';

  constructor(private readonly api: ScadaApiService) {}

  login() {
    this.message = '';
    this.error = '';

    this.api.login(this.loginForm.username, this.loginForm.password).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.access_token);

        const payload = this.decodeJwt(response.access_token);
        this.currentRole = payload?.role ?? null;
        this.currentUsername = payload?.username ?? '';

        this.message = `Connexion réussie (${this.currentRole})`;

        if (this.currentRole === 'admin') {
          this.loadSecurityEvents();
        }

        this.loadSensors();
      },
      error: (err) => {
        this.error = err?.error?.message || 'Échec de connexion';
      },
    });
  }

  register() {
    this.message = '';
    this.error = '';

    this.api
      .register(
        this.registerForm.username,
        this.registerForm.password,
        this.registerForm.role,
      )
      .subscribe({
        next: () => {
          this.message = 'Utilisateur créé avec succès';
        },
        error: (err) => {
          this.error = err?.error?.message || 'Erreur lors de la création';
        },
      });
  }

  createSensor() {
    this.message = '';
    this.error = '';

    this.api.createSensor(this.sensorForm).subscribe({
      next: () => {
        this.message = 'Capteur créé avec succès';
        this.loadSensors();
      },
      error: (err) => {
        this.error = err?.error?.message || 'Erreur lors de la création du capteur';
      },
    });
  }

  createReading() {
    this.message = '';
    this.error = '';

    this.api.createReading(this.readingForm).subscribe({
      next: () => {
        this.message = 'Lecture envoyée avec succès';
        if (this.currentRole === 'admin') {
          this.loadSecurityEvents();
        }
      },
      error: (err) => {
        this.error = err?.error?.message || 'Erreur lors de l’envoi de la lecture';
      },
    });
  }

  loadSecurityEvents() {
    this.api.getSecurityEvents().subscribe({
      next: (events: any) => {
        this.securityEvents = events;
      },
      error: () => {
        this.error = 'Impossible de charger les événements de sécurité';
      },
    });
  }

  loadSensors() {
    this.api.getSensors().subscribe({
      next: (sensors: any) => {
        this.sensors = sensors;
      },
      error: () => {
        this.error = 'Impossible de charger les capteurs';
      },
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.currentRole = null;
    this.currentUsername = '';
    this.securityEvents = [];
    this.sensors = [];
    this.message = 'Déconnectée';
  }

  private decodeJwt(token: string): any {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch {
      return null;
    }
  }
}
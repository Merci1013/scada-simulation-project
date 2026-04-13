import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SensorsService } from '../../../core/services/sensor.service';

@Component({
  selector: 'app-create-sensor',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-sensor.html',
  styleUrl: './create-sensor.scss',
})
export class CreateSensor {
  private readonly fb = inject(FormBuilder);
  private readonly sensorsService = inject(SensorsService);

  successMessage = '';
  errorMessage = '';

  sensorForm = this.fb.group({
    sensorId: ['', Validators.required],
    name: ['', Validators.required],
    topic: ['scada/temperature', Validators.required],
    type: ['temperature', Validators.required],
    unit: ['C', Validators.required],
    minValue: [18, Validators.required],
    maxValue: [30, Validators.required],
    location: [''],
    isActive: [true, Validators.required],
    reportingIntervalMinutes: [5, [Validators.required, Validators.min(0), Validators.max(1440)]],
  });

  onSubmit(): void {
    if (this.sensorForm.invalid) {
      this.sensorForm.markAllAsTouched();
      return;
    }

    const raw = this.sensorForm.getRawValue();

    this.sensorsService.createSensor({
      sensorId: raw.sensorId ?? '',
      name: raw.name ?? '',
      topic: raw.topic ?? '',
      type: raw.type ?? '',
      unit: raw.unit ?? '',
      minValue: Number(raw.minValue),
      maxValue: Number(raw.maxValue),
      location: raw.location ?? '',
      isActive: Boolean(raw.isActive),
      reportingIntervalMinutes: Number(raw.reportingIntervalMinutes),
    }).subscribe({
      next: () => {
        this.successMessage = 'Capteur créé avec succès';
        this.errorMessage = '';
        this.sensorForm.reset({
          sensorId: '',
          name: '',
          topic: 'scada/temperature',
          type: 'temperature',
          unit: 'C',
          minValue: 18,
          maxValue: 30,
          location: '',
          isActive: true,
          reportingIntervalMinutes: 5,
        });
      },
      error: (error) => {
        this.errorMessage =
          error?.error?.message || 'Erreur lors de la création du capteur';
        this.successMessage = '';
      },
    });
  }
}
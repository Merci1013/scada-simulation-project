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
    topic: ['', Validators.required],
    location: [''],
    unit: [''],
  });

  onSubmit(): void {
    if (this.sensorForm.invalid) {
      this.sensorForm.markAllAsTouched();
      return;
    }

    this.sensorsService.createSensor(this.sensorForm.getRawValue() as {
      sensorId: string;
      name: string;
      topic: string;
      location?: string;
      unit?: string;
    }).subscribe({
      next: () => {
        this.successMessage = 'Capteur créé avec succès';
        this.errorMessage = '';
        this.sensorForm.reset();
      },
      error: () => {
        this.errorMessage = 'Erreur lors de la création du capteur';
        this.successMessage = '';
      },
    });
  }
}
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class CreationSensors {
  getErrors(form: FormGroup): string[] {
    const errors: string[] = [];

    if (form.get('sensorId')?.invalid) {
      errors.push('Sensor ID');
    }

    if (form.get('name')?.invalid) {
      errors.push('Nom');
    }

    if (form.get('topic')?.invalid) {
      errors.push('Topic');
    }

    if (form.get('type')?.invalid) {
      errors.push('Type');
    }

    if (form.get('unit')?.invalid) {
      errors.push('Unité');
    }

    return errors;
  }
  
}

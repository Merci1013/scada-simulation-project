import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  errorMessage = '';

  loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.authService.login(this.loginForm.getRawValue() as {
  username: string;
  password: string;
}).subscribe({
next: (response) => {
  console.log('LOGIN RESPONSE =', response);

  const role = response.role;
  console.log('ROLE =', role);

  if (role === 'admin') {
    this.router.navigate(['/admin']);
    return;
  }

  if (role === 'operator') {
    this.router.navigate(['/scada-dashboard']);
    return;
  }

  this.router.navigate(['/']);
},
  error: () => {
    this.errorMessage = 'Identifiants invalides';
  },
});
  }
}
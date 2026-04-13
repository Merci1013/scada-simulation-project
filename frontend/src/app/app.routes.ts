import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home-page/home-page').then(
        (m) => m.HomePage,
      ),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/register-page/register-page').then(
        (m) => m.RegisterPage,
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login-page/login-page.component').then(
        (m) => m.LoginPage,
      ),
  },
  {
    path: 'scada-dashboard',
    loadComponent: () =>
      import(
        './features/scada-dashboard/scada-dashboard-page/scada-dashboard-page.component'
      ).then((m) => m.ScadaDashboardPage),
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./features/admin/admin-dashboard/admin-dashboard.component').then(
        (m) => m.AdminPage,
      ),
  },
  {
    path: 'admin/sensors/create',
    loadComponent: () =>
      import('./features/admin/create-sensor/create-sensor').then(
        (m) => m.CreateSensor,
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
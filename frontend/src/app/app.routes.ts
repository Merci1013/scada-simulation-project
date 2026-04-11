import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'scada-dashboard',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login-page/login-page.component').then((m) => m.LoginPage),
  },
  {
    path: 'scada-dashboard',
    loadComponent: () =>
      import('./features/scada-dashboard/scada-dashboard-page/scada-dashboard-page.component')
        .then((m) => m.ScadaDashboardPage),
  },
  {
    path: 'admin/create-sensor',
    loadComponent: () =>
      import('./features/admin/create-sensor/create-sensor')
        .then((m) => m.CreateSensor),
  },
  {
    path: '**',
    redirectTo: 'scada-dashboard',
  },
];
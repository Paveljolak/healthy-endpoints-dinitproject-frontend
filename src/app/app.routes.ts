import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { SingleUrlComponent } from './components/single-url/single-url.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './services/auth-guard/auth-guard.service';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { RoleGuard } from './components/role-guard/role-guard.component';
import { HealthHistoryComponent } from './components/health-history/health-history.component';
import { HealthHistoryDetailsComponent } from './components/health-history-details/health-history-details.component';

export const routeConfig: Routes = [
  {
    path: '',
    redirectTo: '/urls',
    pathMatch: 'full',
  },
  {
    path: 'urls',
    component: HomePageComponent,
    title: 'Home Page',
  },
  {
    path: 'urls/:id',
    component: SingleUrlComponent,
    title: 'URL Details',
    canActivate: [RoleGuard],
    data: { expectedRole: 'USER' },
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login Page',
    canActivate: [AuthGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    title: 'Register Page',
    canActivate: [AuthGuard],
  },
  {
    path: 'users',
    component: UserManagementComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: 'ADMIN' },
  },
  {
    path: 'health-history',
    component: HealthHistoryComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: 'ADMIN' },
    title: 'Health History Page',
  },
  {
    path: 'health-history/:urlId',
    component: HealthHistoryDetailsComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: 'USER' },
    title: 'Health History Details',
  },
  {
    path: '**',
    redirectTo: '/urls',
  },
];

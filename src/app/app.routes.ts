import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { SingleUrlComponent } from './components/single-url/single-url.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './services/auth-guard/auth-guard.service';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { RoleGuard } from './components/role-guard/role-guard.component';

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
    data: { expectedRole: 'ADMIN' }, // Only users with USER role should access this route
  },
  {
    path: '**',
    redirectTo: '/urls',
  },
];

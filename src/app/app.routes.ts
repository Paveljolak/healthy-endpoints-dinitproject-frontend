import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { SingleUrlComponent } from './components/single-url/single-url.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

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
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'URL Details',
  },
  {
    path: 'register',
    component: RegisterComponent,
    title: 'URL Details',
  },
];

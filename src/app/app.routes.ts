import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';

export const routeConfig: Routes = [
  {
    path: '',
    component: HomePageComponent,
    title: 'Home Page',
  },
];

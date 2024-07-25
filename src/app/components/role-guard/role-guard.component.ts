import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const role = sessionStorage.getItem('role'); // Get the role from sessionStorage

    if (!role) {
      // If no role is available, redirect to login page
      this.router.navigate(['/login']);
      return of(false);
    }

    // Extract expected roles from route data
    const expectedRoles = route.data['expectedRole'] as string;

    if (role === 'ADMIN,USER') {
      return of(true);
    } else if (role === 'USER') {
      if (expectedRoles.includes('USER')) {
        return of(true);
      } else {
        // Redirect to '/urls' if the route does not match 'USER'
        this.router.navigate(['/urls']);
        return of(false);
      }
    } else {
      // If the role is not recognized, redirect to unauthorized page
      this.router.navigate(['/unauthorized']);
      return of(false);
    }
  }
}

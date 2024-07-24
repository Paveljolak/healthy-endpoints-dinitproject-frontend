import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { RegisterUserData } from '../../interfaces/register-user-data';
import { setThrowInvalidWriteToSignalError } from '@angular/core/primitives/signals';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  signupUsers: RegisterUserData[] = [];
  registerUserData: RegisterUserData = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  validationErrors: { [key: string]: string } = {};

  ngOnInit() {}

  registerUser() {
    if (
      this.registerUserData.password !== this.registerUserData.confirmPassword
    ) {
      alert('Passwords do not match.');
      return;
    }

    this.authenticationService
      .register(
        this.registerUserData.username,
        this.registerUserData.password,
        this.registerUserData.email
      )
      .subscribe(
        (response: any) => {
          // Already handled in service
          this.registerUserData = {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
          };

          sessionStorage.clear();
          this.router.navigateByUrl('/login');
        },
        (error) => {
          console.error('Registration error:', error);
          alert(
            'Registration failed: ' +
              (error.error?.error || 'Unknown error occurred')
          );
        }
      );
  }
}

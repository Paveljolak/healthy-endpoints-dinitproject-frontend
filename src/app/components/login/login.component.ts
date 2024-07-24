import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginUserData } from '../../interfaces/login-user-data';
import { RegisterUserData } from '../../interfaces/register-user-data';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  registeredUsers: RegisterUserData[] = [];
  loginUsers: LoginUserData[] = [];

  loginUserData: LoginUserData = {
    username: '',
    password: '',
  };

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    const localData = localStorage.getItem('signUpUsers');
    if (localData != null) {
      this.registeredUsers = JSON.parse(localData);
    }
  }

  loginUser() {
    this.authenticationService
      .login(this.loginUserData.username, this.loginUserData.password)
      .subscribe(
        (res: any) => {
          console.log('Login response:', res);

          // Already handled in service
          this.router.navigateByUrl('/urls');
        },
        (error) => {
          console.error('Login error:', error);
        }
      );
  }
}

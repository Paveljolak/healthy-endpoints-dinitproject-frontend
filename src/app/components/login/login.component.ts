import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginUserData } from '../../interfaces/login-user-data';
import { RegisterUserData } from '../../interfaces/register-user-data';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  registeredUsers: RegisterUserData[] = [];
  loginUsers: LoginUserData[] = [];

  loginUserData: LoginUserData = {
    username: '',
    email: '',
    password: '',
  };

  ngOnInit() {
    const localData = localStorage.getItem('signUpUsers');
    if (localData != null) {
      this.registeredUsers = JSON.parse(localData);
    }
  }

  loginUser() {
    const isUserExists = this.registeredUsers.find(
      (user) =>
        user.username === this.loginUserData.username &&
        user.password === this.loginUserData.password
    );

    if (isUserExists) {
      alert('User Login Successful.');
      this.loginUserData = {
        username: '',
        email: '',
        password: '',
      };
    } else {
      alert('Wrong credentials.');
      this.loginUserData = {
        username: '',
        email: '',
        password: '',
      };
    }
  }
}

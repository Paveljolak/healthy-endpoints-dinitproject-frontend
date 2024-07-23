import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegisterUserData } from '../../interfaces/register-user-data';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  ngOnInit() {
    const localData = localStorage.getItem('signUpUsers');
    if (localData != null) {
      this.signupUsers = JSON.parse(localData);
    }
  }

  signupUsers: RegisterUserData[] = [];

  registerUserData: RegisterUserData = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  registerUser() {
    this.signupUsers.push(this.registerUserData);
    localStorage.setItem('signUpUsers', JSON.stringify(this.signupUsers));
    this.registerUserData = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
  }
}

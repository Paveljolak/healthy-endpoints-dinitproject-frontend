import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface RegisterUserData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerUserData: RegisterUserData = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  registerUser() {
    // Handle the registration logic here
    console.log(this.registerUserData);
  }
}

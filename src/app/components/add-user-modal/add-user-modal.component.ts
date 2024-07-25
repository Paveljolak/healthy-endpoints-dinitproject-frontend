import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-add-user-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.css'],
})
export class AddUserModalComponent {
  @Output() close = new EventEmitter<void>();
  @Output() userAdded = new EventEmitter<void>();

  // Modal state variables
  username: string = '';
  password: string = '';
  email: string = '';
  role: string = 'User';
  enabled: boolean = true;

  constructor(private userService: UserService) {}

  addUser() {
    // Construct role based on selection
    const role = this.role === 'Admin' ? 'ADMIN,USER' : 'USER';

    // Log the user data before sending it
    console.log('Adding user with data:', {
      username: this.username,
      password: this.password,
      email: this.email,
    });

    // Send user data to backend
    this.userService
      .addUser(this.username, this.password, this.email)
      .subscribe(
        (response) => {
          console.log('User added:', response);
          this.userAdded.emit();
          this.closeModal();
        },
        (error) => {
          console.error('Error adding user:', error);
        }
      );
  }

  closeModal() {
    this.close.emit();
  }
}

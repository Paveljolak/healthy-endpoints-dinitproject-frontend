import { Component } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { User } from '../../interfaces/user';
import { CommonModule } from '@angular/common';
import { AddUserModalComponent } from '../add-user-modal/add-user-modal.component';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, AddUserModalComponent],
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
})
export class UserManagementComponent {
  users: User[] = [];
  showAddUserModal: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.userService.getAllUsers().subscribe(
      (users) => {
        console.log('Fetched users:', users); // Check the structure of users
        this.users = users;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  deleteUser(userId: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUserById(userId).subscribe(
        () => {
          this.users = this.users.filter((user) => user.id !== userId);
          console.log('User deleted successfully');
        },
        (error) => {
          console.error('Error deleting user:', error);
        }
      );
    }
  }

  openAddUserModal(): void {
    this.showAddUserModal = true;
  }

  closeAddUserModal(): void {
    this.showAddUserModal = false;
  }
}

// user-management.component.ts

import { Component } from '@angular/core';
import { User } from '../../interfaces/user';
import { CommonModule } from '@angular/common';
import { EditUserModalComponent } from '../edit-user-modal/edit-user-modal.component';
import { AddUserModalComponent } from '../add-user-modal/add-user-modal.component';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, AddUserModalComponent, EditUserModalComponent],
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
})
export class UserManagementComponent {
  users: User[] = [];
  showAddUserModal: boolean = false;
  showEditUserModal: boolean = false;
  selectedUser: User | null = null;

  constructor(private userService: UserService, private router: Router) {}

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
          this.router.navigate(['/login']);
          this.router.navigate(['/users']);
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

  openEditUserModal(user: User): void {
    this.selectedUser = user;
    this.showEditUserModal = true;
  }

  closeEditUserModal(): void {
    this.showEditUserModal = false;
  }

  handleUserUpdated(updatedUser: User): void {
    // Update the user in the list
    this.getAllUsers();
    this.closeEditUserModal();
  }
}

import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { User } from '../../interfaces/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './edit-user-modal.component.html',
  styleUrls: ['./edit-user-modal.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class EditUserModalComponent implements OnChanges {
  @Input() user: User | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() userUpdated = new EventEmitter<User>();

  userForm: FormGroup;
  roles = ['ADMIN,USER', 'USER']; // Example roles

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required], // Ensure role is required
      enabled: [true], // Default to true if not specified
      verificationCode: [''],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user']) {
      console.log('User changed:', this.user);
      if (this.user) {
        this.userForm.patchValue({
          username: this.user.username,
          email: this.user.email,
          role: this.user.role,
          enabled: this.user.enabled,
        });
      }
    }
  }

  onSubmit(): void {
    if (this.userForm.valid && this.user) {
      const updatedUser: Partial<User> = {
        username: this.userForm.value.username,
        email: this.userForm.value.email,
        role: this.userForm.value.role,
        enabled: this.userForm.value.enabled,
      };

      this.userService.editUser(this.user.id, updatedUser).subscribe(
        (response) => {
          this.userUpdated.emit(response);
          this.close.emit();
        },
        (error) => {
          console.error('Error updating user:', error);
        }
      );
    } else {
      console.error('Cannot submit form: User is null or undefined');
    }
  }

  onCancel(): void {
    this.close.emit();
  }
}

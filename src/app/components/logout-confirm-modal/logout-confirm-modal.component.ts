import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-logout-confirm-modal',
  templateUrl: './logout-confirm-modal.component.html',
  styleUrls: ['./logout-confirm-modal.component.css'],
  standalone: true, // Ensure this is set to true
})
export class LogoutConfirmModalComponent {
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  confirmLogout() {
    this.confirm.emit();
  }

  cancelLogout() {
    this.cancel.emit();
  }
}

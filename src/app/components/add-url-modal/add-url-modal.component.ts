import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Url } from '../../interfaces/url';
import { UrlService } from '../../services/url/url.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-url-modal',
  templateUrl: './add-url-modal.component.html',
  styleUrls: ['./add-url-modal.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class AddUrlModalComponent {
  urlForm: FormGroup;

  @Output() close = new EventEmitter<void>();
  @Output() urlAdded = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private urlService: UrlService) {
    this.urlForm = this.fb.group({
      urlName: ['', Validators.required],
      fullUrl: ['', [Validators.required, Validators.pattern('https?://.+')]],
    });
  }

  onSubmit() {
    if (this.urlForm.valid) {
      this.urlService.addUrl(this.urlForm.value as Url).subscribe(
        () => {
          this.urlAdded.emit();
          this.close.emit();
        },
        (error) => {
          console.error('Error adding URL:', error);
        }
      );
    }
  }

  onCancel(): void {
    this.close.emit();
  }
}

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
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Url } from '../../interfaces/url';
import { UrlService } from '../../services/url/url.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-url-modal',
  templateUrl: './edit-url-modal.component.html',
  styleUrls: ['./edit-url-modal.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class EditUrlModalComponent implements OnChanges {
  @Input() url: Url | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() urlUpdated = new EventEmitter<Url>();

  urlForm: FormGroup;

  constructor(private fb: FormBuilder, private urlService: UrlService) {
    this.urlForm = this.fb.group({
      urlName: ['', Validators.required],
      fullUrl: ['', [Validators.required, Validators.pattern('https?://.+')]],
      urlHealth: [true], // Optional if you have it
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['url'] && this.url) {
      this.urlForm.patchValue({
        urlName: this.url.urlName,
        fullUrl: this.url.fullUrl,
        urlHealth: this.url.urlHealth,
      });
    }
  }

  onSubmit(): void {
    if (this.urlForm.valid && this.url) {
      const updatedUrl: Partial<Url> = {
        urlName: this.urlForm.value.urlName,
        fullUrl: this.urlForm.value.fullUrl,
        urlHealth: this.urlForm.value.urlHealth,
      };

      this.urlService.editUrl(this.url.urlId, updatedUrl).subscribe(
        (response) => {
          this.close.emit();
        },
        (error) => {
          console.error('Error updating URL:', error);
        }
      );
    }
  }

  onCancel(): void {
    this.close.emit();
  }
}

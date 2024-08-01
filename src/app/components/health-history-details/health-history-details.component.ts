import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HealthHistoryService } from '../../services/health-history/health-history.service';
import { UrlService } from '../../services/url/url.service';
import { HealthHistory } from '../../interfaces/health-history';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-health-history-details',
  templateUrl: './health-history-details.component.html',
  styleUrls: ['./health-history-details.component.css'],
  standalone: true,
  providers: [DatePipe],
  imports: [CommonModule],
})
export class HealthHistoryDetailsComponent implements OnInit {
  healthHistories: HealthHistory[] = [];
  urlId: number | null = null;
  urlName: string = '';
  loading: boolean = true;
  errorMessage: string = '';
  fullUrl: string = '';

  constructor(
    private route: ActivatedRoute,
    private healthHistoryService: HealthHistoryService,
    private urlService: UrlService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.urlId = +params.get('urlId')!;
      if (this.urlId) {
        this.loadUrlDetails();
        this.loadHealthHistories();
      } else {
        console.error('URL ID is not provided or is invalid');
      }
    });
  }

  private loadUrlDetails() {
    const urlIdStr = this.urlId?.toString() || '';
    this.urlService.getUrlById(urlIdStr).subscribe(
      (url) => {
        this.urlName = url.urlName || 'Unknown URL';
        this.fullUrl = url.fullUrl || 'Unknown Full URL'; // Set the full URL
      },
      (error) => {
        console.error('Error fetching URL details:', error);
        this.errorMessage = 'Failed to load URL details';
        this.loading = false;
      }
    );
  }

  private loadHealthHistories() {
    if (this.urlId) {
      this.healthHistoryService.getHealthHistoriesByUrlId(this.urlId).subscribe(
        (histories) => {
          this.healthHistories = histories;
          this.loading = false;
        },
        (error) => {
          console.error('Error fetching health histories:', error);
          this.errorMessage = 'Failed to load health histories';
          this.loading = false;
        }
      );
    }
  }

  addHealthHistory(): void {
    if (this.urlId) {
      this.healthHistoryService.addHealthHistory(this.urlId).subscribe({
        next: (addedHistory) => {
          this.healthHistories.push(addedHistory);
          console.log('Health history added successfully');
        },
        error: (err) => {
          console.error('Error adding health history:', err);
          this.errorMessage = 'Failed to add health history';
        },
      });
    }
  }

  deleteHistory(historyId: number): void {
    if (confirm('Are you sure you want to delete this health history?')) {
      this.healthHistoryService.deleteHealthHistory(historyId).subscribe({
        next: () => {
          this.loadHealthHistories();
        },
        error: (err) => {
          console.error('Error deleting health history:', err);
          this.errorMessage = 'Failed to delete health history';
        },
      });
    }
  }

  formatDate(dateString: string): string {
    return this.datePipe.transform(dateString, 'short') || 'Unknown Date';
  }
}

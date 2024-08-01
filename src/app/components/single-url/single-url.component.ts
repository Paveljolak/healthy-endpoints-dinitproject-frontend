import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UrlService } from '../../services/url/url.service';
import { HealthHistoryService } from '../../services/health-history/health-history.service'; // Import your HealthHistoryService
import { Url } from '../../interfaces/url';
import { HealthHistory } from '../../interfaces/health-history';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-single-url',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './single-url.component.html',
  styleUrls: ['./single-url.component.css'],
})
export class SingleUrlComponent implements OnInit {
  public url?: Url;
  public historyLogs: { date: string; status: boolean }[] = [];

  constructor(
    private route: ActivatedRoute,
    private urlService: UrlService,
    private healthHistoryService: HealthHistoryService, // Inject HealthHistoryService
    private datePipe: DatePipe // Inject DatePipe
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.getUrlById(id);
        this.getUrlHistory(parseInt(id));
      }
    });
  }

  public getUrlById(id: string): void {
    this.urlService.getUrlById(id).subscribe(
      (response: Url) => {
        this.url = response;
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching URL:', error.message);
      }
    );
  }

  public getUrlHistory(id: number): void {
    this.healthHistoryService.getHealthHistoriesByUrlId(id).subscribe(
      (response: HealthHistory[]) => {
        // Format the logs and reverse the order to show the most recent first
        this.historyLogs = response
          .slice(-5) // Get the last 5 logs
          .reverse() // Reverse the order to show the most recent first
          .map((log) => ({
            date:
              this.datePipe.transform(log.timestamp, 'short') || 'Unknown date',
            status: log.healthStatus,
          }));
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching URL history:', error.message);
      }
    );
  }
}

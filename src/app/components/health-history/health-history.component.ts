import { Component, OnInit } from '@angular/core';
import { HealthHistoryService } from '../../services/health-history/health-history.service';
import { UrlService } from '../../services/url/url.service';
import { HealthHistory } from '../../interfaces/health-history';
import { Url } from '../../interfaces/url';
import { CommonModule } from '@angular/common';
import { switchMap, catchError, of, forkJoin } from 'rxjs';

@Component({
  selector: 'app-health-history',
  templateUrl: './health-history.component.html',
  styleUrls: ['./health-history.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class HealthHistoryComponent implements OnInit {
  healthHistories: (HealthHistory & { fullUrl: string })[] = [];
  error: string | null = null;

  constructor(
    private healthHistoryService: HealthHistoryService,
    private urlService: UrlService
  ) {}

  ngOnInit(): void {
    this.loadHealthHistories();
  }

  private loadHealthHistories(): void {
    // Fetch all health histories
    this.healthHistoryService
      .getAllHealthHistories()
      .pipe(
        switchMap((histories) => {
          const urlIds = Array.from(
            new Set(histories.map((h) => h.urlId.toString()))
          );

          // Fetch URLs based on extracted IDs
          return this.fetchUrls(urlIds).pipe(
            switchMap((urls) => {
              const urlMap = new Map<number, string>(
                urls.map((url) => [url.urlId, url.fullUrl])
              );

              // Combine histories with fetched URLs
              const updatedHistories = histories.map((history) => ({
                ...history,
                fullUrl: urlMap.get(history.urlId) || 'Unknown URL',
              }));

              return of(updatedHistories);
            })
          );
        })
      )
      .subscribe(
        (data) => (this.healthHistories = data),
        (error) => (this.error = 'Error fetching health histories')
      );
  }

  private fetchUrls(urlIds: string[]) {
    const urlRequests = urlIds.map((id) =>
      this.urlService
        .getUrlById(id)
        .pipe(
          catchError(() => of({ urlId: +id, fullUrl: 'Unknown URL' } as Url))
        )
    );

    // Fetch all URLs
    return forkJoin(urlRequests);
  }

  deleteHealthHistory(id: number): void {
    this.healthHistoryService.deleteHealthHistory(id).subscribe(
      () => this.loadHealthHistories(), // Refresh the list after deletion
      (error) => (this.error = 'Error deleting health history')
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { HealthHistoryService } from '../../services/health-history/health-history.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-health-history',
  templateUrl: './health-history.component.html',
  styleUrls: ['./health-history.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class HealthHistoryComponent implements OnInit {
  healthHistories: any[] = [];
  error: string | null = null;

  constructor(private healthHistoryService: HealthHistoryService) {}

  ngOnInit(): void {
    this.healthHistoryService.getAllHealthHistories().subscribe(
      (data) => (this.healthHistories = data),
      (error) => (this.error = 'Error fetching health histories')
    );
  }
}

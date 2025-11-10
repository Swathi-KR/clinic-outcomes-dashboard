import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClinicOutcomeData } from '../../models/clinic-outcomes.model';

@Component({
  selector: 'app-stats-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="stats-info">
      <p>
        Showing {{ data.patients }} patients from last {{ data.range }} days of available data 
        from {{ formatDate(data.startDate) }} - {{ formatDate(data.endDate) }}
      </p>
      <p class="subtitle">
        Only patients with a minimum of 10 days of SG data are included. 
        Last updated on {{ formatDateTime(data.lastUpdated) }}
      </p>
    </div>
  `,
  styles: [`
    .stats-info {
      margin-bottom: 1.5rem;
    }

    .stats-info p {
      color: #374151;
      margin-bottom: 0.25rem;
      font-weight: 500;
    }

    .stats-info .subtitle {
      color: #6b7280;
      font-size: 0.875rem;
      font-style: italic;
      font-weight: 400;
    }
  `]
})
export class StatsHeaderComponent {
  @Input() data!: ClinicOutcomeData;

  formatDate(isoString: string): string {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', { 
      month: '2-digit', 
      day: '2-digit', 
      year: 'numeric' 
    });
  }

  formatDateTime(isoString: string): string {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', { 
      month: '2-digit', 
      day: '2-digit', 
      year: 'numeric' 
    }) + ', ' + date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  }
}
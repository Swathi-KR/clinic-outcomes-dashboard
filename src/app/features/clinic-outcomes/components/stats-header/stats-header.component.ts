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
  :host {
    font-family: "Roboto", sans-serif !important;
    display: block;
  }

  .stats-info {
    margin-bottom: 1.5rem;
    font-family: "Roboto", sans-serif !important;
  }

  .stats-info p,
  .stats-info .main-text {
    color: #374151;
    margin-bottom: 0.1rem;
    font-family: "Roboto", sans-serif !important;
    font-weight: 400;
    font-optical-sizing: auto;
    font-size: 1.15rem;
  }

  .stats-info .subtitle {
    color: #000000;
    font-size: 0.875rem;
    font-style: italic;
    font-family: "Roboto", sans-serif !important;
    font-weight: 400;
    font-optical-sizing: auto;
  }

  /* Responsive styles */
  @media (max-width: 1024px) {
    .stats-info p {
      font-size: 1rem;
    }

    .stats-info .subtitle {
      font-size: 0.85rem;
    }
  }

  @media (max-width: 600px) {
    .stats-info {
      text-align: left;
      margin-bottom: 1rem;
    }

    .stats-info p {
      font-size: 0.9rem;
      line-height: 1.4;
    }

    .stats-info .subtitle {
      font-size: 0.8rem;
      line-height: 1.4;
    }
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
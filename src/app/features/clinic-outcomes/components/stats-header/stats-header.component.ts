import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClinicOutcomeData } from '../../models/clinic-outcomes.model';
@Component({
  selector: 'app-stats-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stats-header.component.html',
  styleUrls: ['./stats-header.component.scss']
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
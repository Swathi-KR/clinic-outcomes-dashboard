import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

type OutcomeKey = 30 | 60 | 90;

@Injectable({
  providedIn: 'root'
})
export class ClinicOutcomesService {

  getOutcomes(range: OutcomeKey) {

    const data: Record<OutcomeKey, {
      patients: number;
      tir: { veryLow: number; low: number; target: number; high: number };
      gmi: { good: number; moderate: number; bad: number };
      lastUpdated: string;
    }> = {
      30: {
        patients: 120,
        tir: { veryLow: 1, low: 2, target: 82, high: 15 },
        gmi: { good: 72, moderate: 23, bad: 5 },
        lastUpdated: "2025-11-06T15:00:00Z" // Fixed snapshot timestamp
      },
      60: {
        patients: 150,
        tir: { veryLow: 2, low: 3, target: 78, high: 17 },
        gmi: { good: 65, moderate: 27, bad: 8 },
        lastUpdated: "2025-09-23T09:15:00Z"
      },
      90: {
        patients: 180,
        tir: { veryLow: 2, low: 5, target: 70, high: 23 },
        gmi: { good: 60, moderate: 30, bad: 10 },
        lastUpdated: "2025-10-10T13:45:00Z"
      }
    };

    return of(data[range]).pipe(delay(500));
  }
}
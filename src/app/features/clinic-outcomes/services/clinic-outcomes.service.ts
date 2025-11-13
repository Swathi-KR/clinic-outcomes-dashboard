import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

type OutcomeKey = 30 | 60 | 90;

export const GLUCOSE_RANGES = {
  veryLow: { min: 0, max: 54, label: 'Very Low', color: 'rgb(236, 24, 48)' },
  low: { min: 54, max: 70, label: 'Low', color: 'rgb(236, 24, 48)' },
  target: { min: 70, max: 180, label: 'Target', color: 'rgb(129, 207, 53)' },
  high: { min: 180, max: 240, label: 'High', color: 'rgb(255, 175, 21)' },
  veryHigh: { min: 240, max: 400, label: 'Very High', color: 'rgb(255, 175, 21)' }
} as const;

@Injectable({
  providedIn: 'root'
})
export class ClinicOutcomesService {

  readonly glucoseRanges = GLUCOSE_RANGES;

  getOutcomes(range: OutcomeKey) {
    const data: Record<OutcomeKey, {
      patients: number;
      tir: { veryLow: number; low: number; target: number; high: number; veryHigh: number }; 
      gmi: { good: number; moderate: number; bad: number };
      lastUpdated: string;
    }> = {
      30: {
        patients: 120,
        tir: { veryLow: 2, low: 0, target: 81, high: 15, veryHigh: 2 },
        gmi: { good: 72, moderate: 23, bad: 5 },
        lastUpdated: "2025-11-06T15:00:00Z"
      },
      60: {
        patients: 150,
        tir: { veryLow: 0, low: 5, target: 75, high: 17, veryHigh: 3 }, 
        gmi: { good: 65, moderate: 27, bad: 8 },
        lastUpdated: "2025-09-23T09:15:00Z"
      },
      90: {
        patients: 180,
        tir: { veryLow: 0, low: 0, target: 70, high: 26, veryHigh: 4 }, 
        gmi: { good: 60, moderate: 30, bad: 10 },
        lastUpdated: "2025-10-10T13:45:00Z"
      }
    };

    return of(data[range]).pipe(delay(500));
  }
}

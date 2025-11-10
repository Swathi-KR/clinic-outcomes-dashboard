export interface ClinicOutcomeData {
    patients: number;
    range: number;
    startDate: string;
    endDate: string;
    lastUpdated: string;
  
    tir: {
      veryLow: number;
      low: number;
      target: number;
      high: number;
    };
  
    gmi: {
      good: number;
      moderate: number;
      bad: number;
    };
  }
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { RangeTabsComponent } from './components/range-tabs/range-tabs.component';
import { StatsHeaderComponent } from './components/stats-header/stats-header.component';
import { TirChartComponent } from './components/tir-chart/tir-chart.component';
import { GmiChartComponent } from './components/gmi-chart/gmi-chart.component';
import { clinicOutcomesFeature } from './store/reducers/clinic-outcomes.reducer';
import { loadClinicOutcomes } from './store/actions/clinic-outcomes.actions';
import { ClinicOutcomeData } from './models/clinic-outcomes.model';
import { SkeletonChartComponent } from '../../shared/skeleton-chart.component';

@Component({
  selector: 'app-clinic-outcomes',
  standalone: true,
  imports: [
    CommonModule,
    RangeTabsComponent,
    StatsHeaderComponent,
    TirChartComponent,
    GmiChartComponent,
    SkeletonChartComponent
  ],
  templateUrl: './clinic-outcomes.component.html',
  styleUrls: ['./clinic-outcomes.component.scss']
})
export class ClinicOutcomesComponent implements OnInit {
  selectedRange = 30;
  
  data$!: Observable<ClinicOutcomeData | null>;
  loading$!: Observable<boolean>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.data$ = this.store.select(clinicOutcomesFeature.selectData);
    this.loading$ = this.store.select(clinicOutcomesFeature.selectLoading);
    
    // Initial data load
    this.store.dispatch(loadClinicOutcomes({ range: this.selectedRange }));
  }

  onRangeChange(days: number) {
    this.selectedRange = days;
    this.store.dispatch(loadClinicOutcomes({ range: days }));
  }
}



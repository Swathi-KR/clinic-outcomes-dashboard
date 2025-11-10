import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonChartComponent } from './skeleton-chart.component';

describe('SkeletonChartComponent', () => {
  let component: SkeletonChartComponent;
  let fixture: ComponentFixture<SkeletonChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkeletonChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkeletonChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

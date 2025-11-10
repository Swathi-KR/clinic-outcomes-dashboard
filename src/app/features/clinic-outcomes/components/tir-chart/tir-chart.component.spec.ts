import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TirChartComponent } from './tir-chart.component';

describe('TirChartComponent', () => {
  let component: TirChartComponent;
  let fixture: ComponentFixture<TirChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TirChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TirChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

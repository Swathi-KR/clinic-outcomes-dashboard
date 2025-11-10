import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicOutcomesComponent } from './clinic-outcomes.component';

describe('ClinicOutcomesComponent', () => {
  let component: ClinicOutcomesComponent;
  let fixture: ComponentFixture<ClinicOutcomesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClinicOutcomesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClinicOutcomesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

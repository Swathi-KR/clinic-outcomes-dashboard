import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RangeTabsComponent } from './range-tabs.component';

describe('RangeTabsComponent', () => {
  let component: RangeTabsComponent;
  let fixture: ComponentFixture<RangeTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RangeTabsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RangeTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

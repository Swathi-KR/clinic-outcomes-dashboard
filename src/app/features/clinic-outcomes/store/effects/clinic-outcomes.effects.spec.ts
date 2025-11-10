import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ClinicOutcomesEffects } from './clinic-outcomes.effects';

describe('ClinicOutcomesEffects', () => {
  let actions$: Observable<any>;
  let effects: ClinicOutcomesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ClinicOutcomesEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(ClinicOutcomesEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});

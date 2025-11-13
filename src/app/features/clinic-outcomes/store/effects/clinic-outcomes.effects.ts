import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ClinicOutcomesService } from '../../services/clinic-outcomes.service';
import { ClinicOutcomesActions } from '../actions/clinic-outcomes.actions';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ClinicOutcomeData } from '../../models/clinic-outcomes.model';

type OutcomeKey = 30 | 60 | 90;

function computeRange(range: number) {
  const end = new Date();
  const start = new Date();
  start.setDate(end.getDate() - range);
  return {
    startDate: start.toISOString(),
    endDate: end.toISOString()
  };
}

@Injectable()
export class ClinicOutcomesEffects {
  loadOutcomes$;

  constructor(
    private actions$: Actions,
    private service: ClinicOutcomesService
  ) {

    this.loadOutcomes$ = createEffect(() =>
      this.actions$.pipe(
        ofType(ClinicOutcomesActions.load),
        switchMap(({ range }) =>
          this.service.getOutcomes(range as OutcomeKey).pipe(
            map(raw => {
              const { startDate, endDate } = computeRange(range);
              const formatted: ClinicOutcomeData = {
                range,
                patients: raw.patients,
                tir: raw.tir,
                gmi: raw.gmi,
                lastUpdated: raw.lastUpdated,
                startDate,
                endDate
              };
              return ClinicOutcomesActions.loadSuccess({ data: formatted });
            }),
            catchError(error =>
              of(ClinicOutcomesActions.loadFailure({ error }))
            )
          )
        )
      )
    );
  }
}
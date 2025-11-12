import { createFeature, createReducer, on } from '@ngrx/store';
import { ClinicOutcomeData } from '../../models/clinic-outcomes.model';
import { ClinicOutcomesActions } from '../actions/clinic-outcomes.actions';

export interface State {
  loading: boolean;
  data: ClinicOutcomeData | null;
}

export const initialState: State = {
  loading: false,
  data: null,
};

export const clinicOutcomesFeatureKey = 'clinicOutcomes';

const coreReducer = createReducer(
  initialState,
  on(ClinicOutcomesActions.load, (state) => ({
    ...state,
    loading: true
  })),
  on(ClinicOutcomesActions.loadSuccess, (state, { data }) => ({
    ...state,
    loading: false,
    data
  })),
  on(ClinicOutcomesActions.loadFailure, (state) => ({
    ...state,
    loading: false
  }))
);

export const clinicOutcomesFeature = createFeature({
  name: 'clinicOutcomes',
  reducer: coreReducer,
});
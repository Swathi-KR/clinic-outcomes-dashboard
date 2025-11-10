import * as fromClinicOutcomes from '../reducers/clinic-outcomes.reducer';
import { selectClinicOutcomesState } from './clinic-outcomes.selectors';

describe('ClinicOutcomes Selectors', () => {
  it('should select the feature state', () => {
    const result = selectClinicOutcomesState({
      [fromClinicOutcomes.clinicOutcomesFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});

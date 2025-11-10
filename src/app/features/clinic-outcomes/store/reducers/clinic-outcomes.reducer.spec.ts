import { clinicOutcomesFeature, initialState } from './clinic-outcomes.reducer';

describe('ClinicOutcomes Reducer', () => {
  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = { type: 'UNKNOWN' } as any;

      const result = clinicOutcomesFeature.reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
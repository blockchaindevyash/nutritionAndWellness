import { getUpdatedWaterCount, MAX_WATER_GLASSES } from '../src/screens/DashboardScreen/helpers';

describe('Dashboard water tracker', () => {
  it('increments and decrements within the daily limit', () => {
    expect(getUpdatedWaterCount(0, 1)).toBe(1);
    expect(getUpdatedWaterCount(7, 1)).toBe(MAX_WATER_GLASSES);
    expect(getUpdatedWaterCount(1, -1)).toBe(0);
    expect(getUpdatedWaterCount(0, -1)).toBe(0);
  });
});

import moment from 'moment';
import { buildCalendarDays, canEditTasksForDate, computeStreak } from '../src/screens/TodoListScreen/helpers';

describe('TodoListScreen helpers', () => {
  it('counts consecutive fully completed days', () => {
    const dailyData = {
      '2026-08-04': { tasks: { walk: true, workout: true, water: true } },
      '2026-08-03': { tasks: { walk: true, workout: true, water: true } },
      '2026-08-02': { tasks: { walk: true, workout: true, water: true } },
      '2026-08-01': { tasks: { walk: true, workout: false, water: true } },
    };

    expect(computeStreak(dailyData, moment('2026-08-04'))).toBe(3);
  });

  it('breaks the streak when a day is incomplete', () => {
    const dailyData = {
      '2026-08-04': { tasks: { walk: true, workout: true, water: true } },
      '2026-08-03': { tasks: { walk: true, workout: false, water: true } },
    };

    expect(computeStreak(dailyData, moment('2026-08-04'))).toBe(1);
  });

  it('defaults the streak to the current day when no date is provided', () => {
    const dailyData = {
      '2026-08-04': { tasks: { walk: true, workout: true, water: true, meal: true } },
      '2026-08-03': { tasks: { walk: true, workout: true, water: true, meal: true } },
      '2026-08-02': { tasks: { walk: true, workout: true, water: true, meal: true } },
    };

    expect(computeStreak(dailyData)).toBe(3);
  });

  it('allows editing only for the current day', () => {
    expect(canEditTasksForDate(moment().subtract(1, 'day'))).toBe(false);
    expect(canEditTasksForDate(moment())).toBe(true);
    expect(canEditTasksForDate(moment().add(1, 'day'))).toBe(false);
  });

  it('builds a calendar grid for the visible month', () => {
    const days = buildCalendarDays(moment('2026-08-15'));

    expect(days).toHaveLength(42);
    expect(days[0].date.format('YYYY-MM-DD')).toBe('2026-07-26');
    expect(days[days.length - 1].date.format('YYYY-MM-DD')).toBe('2026-09-05');
  });
});

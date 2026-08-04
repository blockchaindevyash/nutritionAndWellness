import moment from 'moment';

export const TASKS = [
  { key: 'walk', label: 'Walk' },
  { key: 'workout', label: 'Workout' },
  { key: 'water', label: 'Water' },
  { key: 'meal', label: 'Meal' },
];

const isDayCompleted = dayData => {
  const taskValues = Object.values(dayData?.tasks || {});
  return taskValues.length > 0 && taskValues.every(value => value === true);
};

export const canEditTasksForDate = selectedDate => {
  return selectedDate ? selectedDate.isSame(moment(), 'day') : false;
};

export const buildCalendarDays = selectedDate => {
  const startOfMonth = selectedDate.clone().startOf('month');
  const endOfMonth = selectedDate.clone().endOf('month');
  const startDay = startOfMonth.clone().startOf('week');
  const endDay = endOfMonth.clone().endOf('week');

  const days = [];
  let current = startDay.clone();

  while (current.isSameOrBefore(endDay)) {
    days.push({
      date: current.clone(),
      isCurrentMonth: current.isSame(selectedDate, 'month'),
    });
    current.add(1, 'day');
  }

  return days;
};

export const computeStreak = (dailyData, selectedDate = moment()) => {
  let streak = 0;
  let cursor = selectedDate.clone();

  if (!isDayCompleted(dailyData[cursor.format('YYYY-MM-DD')])) {
    cursor.subtract(1, 'day');
  }

  while (true) {
    const dayKey = cursor.format('YYYY-MM-DD');
    const dayData = dailyData[dayKey];

    if (!dayData || !isDayCompleted(dayData)) {
      break;
    }

    streak += 1;
    cursor.subtract(1, 'day');
  }

  return streak;
};

export const getStreakDates = (dailyData, selectedDate = moment()) => {
  const streakDates = [];
  let cursor = selectedDate.clone();

  if (!isDayCompleted(dailyData[cursor.format('YYYY-MM-DD')])) {
    cursor.subtract(1, 'day');
  }

  while (true) {
    const dayKey = cursor.format('YYYY-MM-DD');
    const dayData = dailyData[dayKey];

    if (!dayData || !isDayCompleted(dayData)) {
      break;
    }

    streakDates.push(dayKey);
    cursor.subtract(1, 'day');
  }

  return streakDates.reverse();
};

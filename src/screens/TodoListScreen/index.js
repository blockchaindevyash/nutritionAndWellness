import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import React, { useMemo, useState } from 'react';
import moment from 'moment';
import { portraitStyles, landscapeStyles } from './styles';
import useOrientation from '../../components/OrientationComponent';
import { hp } from '../../components/responsive';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../../utils';
import { buildCalendarDays, canEditTasksForDate, computeStreak, getStreakDates, TASKS } from './helpers';

const TodoListScreen = () => {
  const orientation = useOrientation();
  const isPortrait = orientation === 'portrait';
  const styles = isPortrait ? portraitStyles : landscapeStyles;
  const insets = useSafeAreaInsets();

  const [selectedDate, setSelectedDate] = useState(moment());
  const [dailyData, setDailyData] = useState({
    [moment().format('YYYY-MM-DD')]: {
      tasks: {
        walk: true,
        workout: true,
        water: true,
        meal: false,
      },
    },
    [moment().subtract(1, 'day').format('YYYY-MM-DD')]: {
      tasks: {
        walk: true,
        workout: true,
        water: true,
        meal: true,
      },
    },
    [moment().subtract(2, 'day').format('YYYY-MM-DD')]: {
      tasks: {
        walk: true,
        workout: true,
        water: true,
        meal: true,
      },
    },
    [moment().subtract(3, 'day').format('YYYY-MM-DD')]: {
      tasks: {
        walk: true,
        workout: true,
        water: true,
        meal: true,
      },
    },
  });

  const calendarDays = useMemo(() => buildCalendarDays(selectedDate), [selectedDate]);
  const streak = useMemo(() => computeStreak(dailyData), [dailyData]);
  const streakDates = useMemo(() => getStreakDates(dailyData), [dailyData]);

  const selectedDayKey = selectedDate.format('YYYY-MM-DD');
  const selectedDayData = dailyData[selectedDayKey]?.tasks || {};
  const isCurrentDay = canEditTasksForDate(selectedDate);

  const toggleTask = taskKey => {
    if (!isCurrentDay) {
      return;
    }

    const dayKey = selectedDate.format('YYYY-MM-DD');

    setDailyData(prev => ({
      ...prev,
      [dayKey]: {
        ...(prev[dayKey] || {}),
        tasks: {
          ...(prev[dayKey]?.tasks || {}),
          [taskKey]: !(prev[dayKey]?.tasks?.[taskKey] || false),
        },
      },
    }));
  };

  return (
    <View style={styles.safeAreaStyle}>
      <View
        style={{
          width: '100%',
          paddingTop: insets.top,
          backgroundColor: COLORS.primary,
        }}
      />
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: hp(8) }}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.greeting}>👋 Good Morning, Yash</Text>
        <Text style={styles.subText}>You’re doing great today!</Text>

        <View style={styles.heroCard}>
          <View style={styles.heroRow}>
            <View>
              <Text style={styles.heroLabel}>Current streak</Text>
              <Text style={styles.heroValue}>{streak} days</Text>
            </View>
            <View style={styles.streakBadge}>
              <Text style={styles.streakBadgeText}>🔥</Text>
            </View>
          </View>
          <Text style={styles.heroCaption}>
            Complete all tasks every day to keep your streak alive.
          </Text>
        </View>

        <View style={styles.calendarCard}>
          <View style={styles.calendarHeader}>
            <TouchableOpacity onPress={() => setSelectedDate(prev => prev.clone().subtract(1, 'month'))}>
              <Text style={styles.navText}>{'<'}</Text>
            </TouchableOpacity>
            <Text style={styles.monthTitle}>{selectedDate.format('MMMM YYYY')}</Text>
            <TouchableOpacity onPress={() => setSelectedDate(prev => prev.clone().add(1, 'month'))}>
              <Text style={styles.navText}>{'>'}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.weekDaysRow}>
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
              <Text key={day} style={styles.weekDayText}>{day}</Text>
            ))}
          </View>

          <View style={styles.calendarGrid}>
            {calendarDays.map(day => {
              const dayKey = day.date.format('YYYY-MM-DD');
              const dayData = dailyData[dayKey]?.tasks || {};
              const isComplete = Object.values(dayData).every(value => value === true);
              const isSelected = day.date.isSame(selectedDate, 'day');
              const isToday = day.date.isSame(moment(), 'day');
              const isStreakDay = streakDates.includes(dayKey);

              return (
                <TouchableOpacity
                  key={dayKey}
                  style={[
                    styles.dayCell,
                    !day.isCurrentMonth && styles.dayCellMuted,
                    isToday && styles.dayCellToday,
                    isSelected && !isToday && styles.dayCellSelected,
                    isStreakDay && styles.dayCellStreak,
                    isComplete && !isToday && !isStreakDay && styles.dayCellCompleted,
                  ]}
                  onPress={() => setSelectedDate(day.date)}>
                  <Text
                    style={[
                      styles.dayText,
                      !day.isCurrentMonth && styles.dayTextMuted,
                      isSelected && !isToday && styles.dayTextSelected,
                      isToday && styles.dayTextToday,
                      isStreakDay && styles.dayTextStreak,
                    ]}>
                    {day.date.format('D')}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.detailCard}>
          <Text style={styles.detailTitle}>{selectedDate.format('dddd, MMM D')}</Text>
          <Text style={styles.detailSubtitle}>
            {isCurrentDay ? 'Daily focus for today' : 'View-only tasks for selected day'}
          </Text>

          {TASKS.map(task => {
            const isDone = !!selectedDayData[task.key];
            return (
              <TouchableOpacity
                key={task.key}
                style={styles.taskRow}
                onPress={() => toggleTask(task.key)}
                disabled={!isCurrentDay}>
                <View style={styles.taskLeft}>
                  <View style={[styles.taskDot, isDone ? styles.taskDotDone : styles.taskDotPending]} />
                  <Text style={styles.taskLabel}>{task.label}</Text>
                </View>
                <Text style={[styles.taskStatus, isDone ? styles.taskStatusDone : styles.taskStatusPending]}>
                  {isDone ? 'Completed' : 'Pending'}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default TodoListScreen;
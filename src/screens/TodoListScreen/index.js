import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import React, { useCallback, useMemo, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import moment from 'moment';
import { portraitStyles, landscapeStyles } from './styles';
import useOrientation from '../../components/OrientationComponent';
import { hp } from '../../components/responsive';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../../utils';
import { onGetCommonApi } from '../../services/Api';
import { buildCalendarDays, canEditTasksForDate, computeStreak, getStreakDates, TASKS } from './helpers';
import { useTranslation } from 'react-i18next';
import useAuthStore from '../../store/authStore';

const TodoListScreen = () => {
  const {profileData} = useAuthStore();
  const orientation = useOrientation();
  const isPortrait = orientation === 'portrait';
  const styles = isPortrait ? portraitStyles : landscapeStyles;
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const [selectedDate, setSelectedDate] = useState(moment());
  const [dailyData, setDailyData] = useState({});

  const mapPlanDataToDailyData = planDataArray => {
    if (!Array.isArray(planDataArray)) {
      return {};
    }

    return planDataArray.reduce((acc, item) => {
      const dayKey = item?.date;
      const waterTarget = Number(item?.water_target_glasses ?? 0);
      const waterConsumed = Number(item?.water_consumed_glasses ?? 0);
      const exercisesDone = Array.isArray(item?.exercises) && item.exercises.length > 0
        ? item.exercises.every(exercise => exercise?.is_completed === true)
        : false;

      acc[dayKey] = {
        tasks: {
          exercises: exercisesDone,
          meditation: Boolean(item?.is_meditation_completed),
          water: waterTarget > 0 ? waterConsumed >= waterTarget : false,
        },
        plan: item,
      };

      return acc;
    }, {});
  };

  const calendarDays = useMemo(() => buildCalendarDays(selectedDate), [selectedDate]);
  const streak = useMemo(() => computeStreak(dailyData), [dailyData]);
  const streakDates = useMemo(() => getStreakDates(dailyData), [dailyData]);

  const selectedDayKey = selectedDate.format('YYYY-MM-DD');
  const selectedDayData = dailyData[selectedDayKey]?.tasks || {};
  const selectedPlan = dailyData[selectedDayKey]?.plan;
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

  useFocusEffect(
    useCallback(() => {
      onGetMonthPlanData();
    }, [selectedDate])
  );

  const onGetMonthPlanData = async () => {
    try {
      const response = await onGetCommonApi(`plan/monthly-plan?month=${selectedDate.format('M')}&year=${selectedDate.format('YYYY')}`);
      if (response?.data?.status) {
        const planData = response.data.data.plan_data;
        setDailyData(mapPlanDataToDailyData(planData));
      }
    } catch (error) {
      console.log('Error fetching monthly plan data:', error);
    }
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
        <Text style={styles.greeting}>👋 {t('good_morning')}, {profileData?.name}</Text>
        <Text style={styles.subText}>{t('dashboard_massage')}</Text>

        <View style={styles.heroCard}>
          <View style={styles.heroRow}>
            <View>
              <Text style={styles.heroLabel}>{t('current_streak')}</Text>
              <Text style={styles.heroValue}>{streak} {t('days')}</Text>
            </View>
            <View style={styles.streakBadge}>
              <Text style={styles.streakBadgeText}>🔥</Text>
            </View>
          </View>
          <Text style={styles.heroCaption}>
            {t('streak_description')}
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
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
              <Text key={`${day}-${index}`} style={styles.weekDayText}>{day}</Text>
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
                    !isToday && !isStreakDay && styles.dayCellCompleted,
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
            {isCurrentDay ? t('daily_focus_for_today') : t('view_only_tasks')}
          </Text>

          {selectedPlan ? (
            <>
              {selectedPlan.exercises?.map((exercise, index) => {
                const isExerciseDone = exercise?.is_completed === true;
                return (
                  <View
                    key={`${exercise.name}-${index}`}
                    style={styles.taskRow}>
                    <View style={styles.taskLeft}>
                      <Text style={styles.taskLabel}>{exercise.name}</Text>
                    </View>
                    <View style={[styles.taskDot, isExerciseDone ? styles.taskDotDone : styles.taskDotPending]} />
                  </View>
                );
              })}
              {TASKS.map(task => {
                const isDone = !!selectedDayData[task.key];
                return (
                  <View
                    key={task.key}
                    style={styles.taskRow}
                    disabled={!isCurrentDay}>
                    <View style={styles.taskLeft}>
                      <Text style={styles.taskLabel}>{task.label}</Text>
                    </View>
                    <View style={[styles.taskDot, isDone ? styles.taskDotDone : styles.taskDotPending]} />
                  </View>
                );
              })}
            </>
          ) : (
            <Text style={styles.sectionText}>{t('no_plan_data')}</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default TodoListScreen;
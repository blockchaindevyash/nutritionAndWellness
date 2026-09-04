import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  Platform,
  PermissionsAndroid,
  FlatList,
  AppState,
  Modal,
  Alert,
} from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import { portraitStyles, landscapeStyles } from './styles';
import useOrientation from '../../components/OrientationComponent';
import { hp } from '../../components/responsive';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../../utils';
import { useTranslation } from 'react-i18next';
import { LineChart } from "react-native-gifted-charts"
import { startCounter, stopCounter } from 'react-native-accurate-step-counter';
import { getUpdatedWaterCount, MAX_WATER_GLASSES } from './helpers';
import { scheduleDailyStepGoalReminder, scheduleMedicationRemindersForMedications, scheduleSupplementRemindersForSupplements } from '../../../notificationService';
import { onAddCommonJsonApi, onGetCommonApi } from '../../services/Api';
import useAuthStore from '../../store/authStore';
import MeditationTimer from '../../components/MeditationTimer';
import { useFocusEffect } from '@react-navigation/native';
import pill from '../../images/pill.png';
import pills from '../../images/pills.png';
import wavingHand from '../../images/wavingHand.png';
import fire from '../../images/fire.png';
import drop from '../../images/drop.png';

const weeklyPlanList = [
  {
    date: "2026-08-10",
    day: "Monday",
    calories: 1500,
    meals: {
      breakfast: "Oats + milk + almonds + apple",
      lunch: "2 chapati + lauki sabji + moong dal + salad",
      dinner: "Vegetable soup + paneer (low oil)",
    },
    supplements: [
      {
        name: "Multivitamin",
        timing: "After Breakfast",
        dosage: "1 Tablet",
      },
      {
        name: "Omega 3",
        timing: "After Dinner",
        dosage: "1 Capsule",
      },
    ],
    exercises: [
      "Walking 20 min",
      "Push-ups 3x10",
      "Squats 3x15",
      "Plank 30 sec x3",
    ],
  },
  {
    date: "2026-08-11",
    day: "Tuesday",
    calories: 1500,
    meals: {
      breakfast: "Poha (no onion) + peanuts + green tea",
      lunch: "Brown rice + rajma (no onion/garlic) + salad",
      dinner: "2 chapati + tori sabji",
    },
    supplements: [
      {
        name: "Multivitamin",
        timing: "After Breakfast",
        dosage: "1 Tablet",
      },
      {
        name: "Omega 3",
        timing: "After Dinner",
        dosage: "1 Capsule",
      },
    ],
    exercises: [
      "Walking 25 min",
      "Jumping jacks 3x20",
      "Lunges 3x12",
    ],
  },
  {
    date: "2026-08-12",
    day: "Wednesday",
    calories: 1450,
    meals: {
      breakfast: "Vegetable upma + fruit",
      lunch: "2 chapati + chole (no onion/garlic) + curd",
      dinner: "Moong dal khichdi",
    },
    supplements: [
      {
        name: "Multivitamin",
        timing: "After Breakfast",
        dosage: "1 Tablet",
      },
      {
        name: "Omega 3",
        timing: "After Dinner",
        dosage: "1 Capsule",
      },
    ],
    exercises: [
      "Yoga 20 min",
      "Stretching",
      "Core workout",
    ],
  },
  {
    date: "2026-08-13",
    day: "Thursday",
    calories: 1500,
    meals: {
      breakfast: "Banana smoothie (milk + peanut butter)",
      lunch: "Quinoa + dal + mix veg",
      dinner: "Paneer salad bowl",
    },
    supplements: [
      {
        name: "Multivitamin",
        timing: "After Breakfast",
        dosage: "1 Tablet",
      },
      {
        name: "Omega 3",
        timing: "After Dinner",
        dosage: "1 Capsule",
      },
    ],
    exercises: [
      "Walking 30 min",
      "Squats 3x15",
      "Push-ups 3x10",
    ],
  },
  {
    date: "2026-08-14",
    day: "Friday",
    calories: 1500,
    meals: {
      breakfast: "Besan chilla + chutney",
      lunch: "2 chapati + mix veg + dal",
      dinner: "Soup + sprouts salad",
    },
    supplements: [
      {
        name: "Multivitamin",
        timing: "After Breakfast",
        dosage: "1 Tablet",
      },
      {
        name: "Omega 3",
        timing: "After Dinner",
        dosage: "1 Capsule",
      },
    ],
    exercises: [
      "HIIT 15 min",
      "Plank + abs workout",
    ],
  },
  {
    date: "2026-08-15",
    day: "Saturday",
    calories: 1550,
    meals: {
      breakfast: "Idli + sambar (no onion)",
      lunch: "Veg pulao + raita",
      dinner: "Light sabji + 1 chapati",
    },
    supplements: [
      {
        name: "Multivitamin",
        timing: "After Breakfast",
        dosage: "1 Tablet",
      },
      {
        name: "Omega 3",
        timing: "After Dinner",
        dosage: "1 Capsule",
      },
    ],
    exercises: [
      "Walking 40 min",
      "Outdoor activity",
    ],
  },
  {
    date: "2026-08-16",
    day: "Sunday",
    calories: 1400,
    meals: {
      breakfast: "Fruit bowl + nuts",
      lunch: "Light home food (controlled portion)",
      dinner: "Vegetable soup",
    },
    supplements: [
      {
        name: "Multivitamin",
        timing: "After Breakfast",
        dosage: "1 Tablet",
      },
      {
        name: "Omega 3",
        timing: "After Dinner",
        dosage: "1 Capsule",
      },
    ],
    exercises: [
      "Light walk",
      "Stretching",
    ],
  },
];

const lineData = [
  { value: 0, dataPointText: '0' },
  { value: 20, dataPointText: '20' },
  { value: 18, dataPointText: '18' },
  { value: 40, dataPointText: '40' },
  { value: 36, dataPointText: '36' },
  { value: 60, dataPointText: '60' },
  { value: 54, dataPointText: '54' },
  { value: 50, dataPointText: '50' }
];

const areaData = [
  { id: 1, name: 'Glutes' },
  { id: 2, name: 'Abs' },
  { id: 3, name: 'Legs' },
]

const STEP_STATE_KEY = 'daily-step-state';
const stepGoal = 10000;

const getTodayKey = () => moment().format('YYYY-MM-DD');

const saveStepState = async (value, dateKey = getTodayKey(), sensorValue = null) => {
  const payload = JSON.stringify({
    date: dateKey,
    steps: Number(value || 0),
    sensorValue: sensorValue === null ? null : Number(sensorValue),
  });
  await AsyncStorage.setItem(STEP_STATE_KEY, payload);
};

const MEDITATION_STATE_KEY = 'meditation-timer-state';

const COMPLETED_EXERCISES_KEY = 'completed-exercises';
const WATER_BY_DATE_KEY = 'water-by-date';

const getMeditationTotalSeconds = meditation => {
  const match = meditation?.match(/(\d+)\s*(?:mins?|minutes?)/i);
  const minutes = match ? parseInt(match[1], 10) : 0;
  return minutes * 60;
};

const saveMeditationState = async (dateKey, state) => {
  if (!dateKey) {
    return;
  }

  try {
    const raw = await AsyncStorage.getItem(MEDITATION_STATE_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    await AsyncStorage.setItem(
      MEDITATION_STATE_KEY,
      JSON.stringify({
        ...parsed,
        [dateKey]: {
          ...parsed[dateKey],
          ...state,
          date: dateKey,
          updatedAt: new Date().toISOString(),
        },
      })
    );
  } catch (error) {
    console.warn('Unable to save meditation state', error);
  }
};

const loadMeditationState = async dateKey => {
  if (!dateKey) {
    return null;
  }

  try {
    const raw = await AsyncStorage.getItem(MEDITATION_STATE_KEY);
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw);
    return parsed?.[dateKey] ?? null;
  } catch (error) {
    console.warn('Unable to load meditation state', error);
    return null;
  }
};

const persistMeditationState = async (dateKey, remainingSecondsValue, completed) => {
  await saveMeditationState(dateKey, {
    remainingSeconds: Number(remainingSecondsValue || 0),
    isMeditationCompleted: Boolean(completed),
  });
};

const loadCompletedExercisesFromStorage = async () => {
  try {
    const raw = await AsyncStorage.getItem(COMPLETED_EXERCISES_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (err) {
    console.warn('Unable to load completed exercises', err);
    return {};
  }
};

const loadWaterByDateFromStorage = async () => {
  try {
    const raw = await AsyncStorage.getItem(WATER_BY_DATE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (err) {
    console.warn('Unable to load waterByDate', err);
    return {};
  }
};

const saveWaterByDateToStorage = async (data) => {
  try {
    await AsyncStorage.setItem(WATER_BY_DATE_KEY, JSON.stringify(data || {}));
  } catch (err) {
    console.warn('Unable to save waterByDate', err);
  }
};

const uploadStepCount = async (stepsToUpload, dateKey = getTodayKey()) => {
  try {
    const payload = {
      steps: Number(stepsToUpload || 0),
      date: dateKey,
    };
    console.log('Uploading step uploadStepCount count::', payload);
    const responseData = await onAddCommonJsonApi('step-count', payload);
    return responseData?.data?.status === true;
  } catch (error) {
    console.log('Error syncing step count::', error);
    return false;
  }
};

const DashboardScreen = ({ navigation }) => {
  const {weeklyPlan, updateWeeklyPlan, profileData} = useAuthStore();
  const orientation = useOrientation();
  const isPortrait = orientation === 'portrait';
  const styles = isPortrait ? portraitStyles : landscapeStyles;
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();

  const saveWeeklyPlanMeditationState = async (dateKey, meditationMinutes, completed) => {
    if (!dateKey) {
      return;
    }

    try {
      const rawWeekly = await AsyncStorage.getItem('weeklyPlan');
      const planData = rawWeekly ? JSON.parse(rawWeekly) : weeklyPlan || [];
      const updatedPlan = planData.map(item => {
        if (item.date === dateKey) {
          return {
            ...item,
            meditatiion_minutes: meditationMinutes,
            meditation_minutes: meditationMinutes,
            is_meditation_completed: completed,
          };
        }
        return item;
      });

      await AsyncStorage.setItem('weeklyPlan', JSON.stringify(updatedPlan));
      if (typeof updateWeeklyPlan === 'function') {
        updateWeeklyPlan(updatedPlan);
      }
    } catch (error) {
      console.warn('Unable to save weekly plan meditation state', error);
    }
  };
  const [completedExercisesByDate, setCompletedExercisesByDate] = useState({});

  const [waterByDate, setWaterByDate] = useState({});
  const [showWaterCompleteModal, setShowWaterCompleteModal] = useState(false);
  const [showMeditationCompleteModal, setShowMeditationCompleteModal] = useState(false);

  useEffect(() => {
    const load = async () => {
      const data = await loadCompletedExercisesFromStorage();
      setCompletedExercisesByDate(data || {});
      const waterData = await loadWaterByDateFromStorage();
      setWaterByDate(waterData || {});
    };

    load();
  }, []);

  const toggleExerciseComplete = async (dateKey, idx) => {
    try {
      const key = dateKey || selectedDate?.date || getTodayKey();
      if (key !== getTodayKey()) {
        Alert.alert(t('read_only_title'), t('read_only_update_exercises'));
        return;
      }
      const current = { ...(completedExercisesByDate || {}) };
      const setForDate = new Set(current[key] || []);

      if (setForDate.has(idx)) {
        setForDate.delete(idx);
      } else {
        setForDate.add(idx);
      }

      current[key] = Array.from(setForDate);
      setCompletedExercisesByDate(current);
      await AsyncStorage.setItem(COMPLETED_EXERCISES_KEY, JSON.stringify(current));
    } catch (err) {
      console.warn('Unable to toggle exercise complete', err);
    }
  };
  const [selectedDate, setSelectedDate] = useState(null);
  const [steps, setSteps] = useState(0);
  const [isStepStateReady, setIsStepStateReady] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [meditationTotalSeconds, setMeditationTotalSeconds] = useState(0);
  const [caloriesChart, setCaloriesChart] = useState([
    { value: 0, dataPointText: '0', label: 'Mon' },
    { value: 0, dataPointText: '0', label: 'Tue' },
    { value: 0, dataPointText: '0', label: 'Wed' },
    { value: 0, dataPointText: '0', label: 'Thu' },
    { value: 0, dataPointText: '0', label: 'Fri' },
    { value: 0, dataPointText: '0', label: 'Sat' },
    { value: 0, dataPointText: '0', label: 'Sun' },
  ]);
  const lastSensorValueRef = useRef(null);
  const progress = stepGoal > 0 ? Math.min(steps / stepGoal, 1) : 0;
  const progressPercent = `${Math.round(progress * 100)}%`;
  const stepsRemaining = Math.max(stepGoal - steps, 0);

  useFocusEffect(
    useCallback(() => {
      onGetCaloriesData();
    }, [])
  );

  const onGetCaloriesData = async () => {
    try {
      const responseData = await onGetCommonApi(
        'analytics/last-week-calories'
      );

      console.log(
        'onGetCaloriesData Response:',
        responseData.data
      );

      if (responseData?.data?.status) {
        const dailyCalories =
          responseData?.data?.data?.daily_calories || [];

        const chartData = dailyCalories.map(item => ({
          value: Number(item.calories || 0),
          dataPointText: String(item.calories || 0),
          label: item.day?.substring(0, 3) || '',
        }));

        console.log('Calories Chart Data:', chartData);

        setCaloriesChart(chartData);
      }
    } catch (err) {
      console.log('Calories Error:', err);
    }
  };

  const onStepCountDataAdd = useCallback(async (stepsToSend = 0, dateKey = getTodayKey()) => {
    try {
      const synced = await uploadStepCount(stepsToSend, dateKey);
      if (synced && dateKey === getTodayKey()) {
        const currentSteps = Number(stepsToSend || 0);
        await saveStepState(currentSteps, dateKey, lastSensorValueRef.current);
        setSteps(currentSteps);
      }
    } catch (err) {
      console.log('Error::', err);
    }
  }, []);

  useEffect(() => {
    const today = new Date();
    setSelectedDate({
      day: today.toLocaleDateString('en-US', { weekday: 'short' }),
      date: today.toISOString().split('T')[0],
    });
  }, []);

  useEffect(() => {
    const loadMeditationForSelectedDate = async () => {
      if (!selectedDate?.date) {
        return;
      }

      const planForDate = weeklyPlan.find(plan => plan.date === selectedDate.date);
      const totalSeconds = getMeditationTotalSeconds(planForDate?.meditation);
      setMeditationTotalSeconds(totalSeconds);

      const storedState = await loadMeditationState(selectedDate.date);
      if (storedState) {
        const isCompleted = storedState.isMeditationCompleted === true;
        const restoredSeconds = Number(storedState.remainingSeconds || 0);
        setRemainingSeconds(restoredSeconds > 0 ? restoredSeconds : 0);
      } else {
        setRemainingSeconds(totalSeconds);
        setIsRunning(false);
      }
    };

    loadMeditationForSelectedDate();
  }, [selectedDate, weeklyPlan]);

  // Schedule medication reminders for the selected date's medications
  useEffect(() => {
    const scheduleForSelectedDate = async () => {
      if (!selectedDate?.date) return;
      const planForDate = weeklyPlan.find(plan => plan.date === selectedDate.date);
      if (!planForDate || !Array.isArray(planForDate.medication) || planForDate.medication.length === 0) return;

      // Normalize timing values to morning/afternoon/evening
      const normalized = planForDate.medication.map(m => {
        const text = (m?.timing || '').toString().toLowerCase();
        let timing = 'morning';
        if (text.includes('afternoon') || text.includes('lunch') || text.includes('noon')) timing = 'afternoon';
        else if (text.includes('evening') || text.includes('dinner') || text.includes('night')) timing = 'evening';
        else if (text.includes('breakfast') || text.includes('morning')) timing = 'morning';
        return { ...m, timing };
      });

      try {
        await scheduleMedicationRemindersForMedications(normalized);
        // also schedule supplements reminders if present
        const supplementsNormalized = planForDate.supplements && Array.isArray(planForDate.supplements)
          ? planForDate.supplements.map(s => {
            const text = (s?.timing || '').toString().toLowerCase();
            let timing = 'morning';
            if (text.includes('afternoon') || text.includes('lunch') || text.includes('noon')) timing = 'afternoon';
            else if (text.includes('evening') || text.includes('dinner') || text.includes('night')) timing = 'evening';
            else if (text.includes('breakfast') || text.includes('morning')) timing = 'morning';
            return { ...s, timing };
          })
          : [];
        if (supplementsNormalized.length > 0) {
          await scheduleSupplementRemindersForSupplements(supplementsNormalized);
        }
      } catch (err) {
        console.warn('Unable to schedule medication reminders', err);
      }
    };

    scheduleForSelectedDate();
  }, [selectedDate, weeklyPlan]);

  useEffect(() => {
    const initializeStepsState = async () => {
      try {
        setIsStepStateReady(false);
        const raw = await AsyncStorage.getItem(STEP_STATE_KEY);
        const todayKey = getTodayKey();

        if (raw) {
          const parsed = JSON.parse(raw);
          const storedSteps = Number(parsed?.steps || 0);
          if (storedSteps > 0 || parsed?.date === todayKey) {
            setSteps(storedSteps);
            lastSensorValueRef.current = parsed?.sensorValue !== undefined && parsed?.sensorValue !== null
              ? Number(parsed.sensorValue)
              : storedSteps;
            setIsStepStateReady(true);
            return;
          }
          if (storedSteps > 0) {
            await onStepCountDataAdd(storedSteps, parsed?.date);
          }
        }
        await saveStepState(0, todayKey, 0);
        setSteps(0);
        lastSensorValueRef.current = 0;
      } catch (error) {
        console.warn('Unable to initialize step state', error);
      } finally {
        setIsStepStateReady(true);
      }
    };

    initializeStepsState();
  }, [onStepCountDataAdd]);

  useEffect(() => {
    const scheduleReminder = async () => {
      try {
        await scheduleDailyStepGoalReminder(stepGoal);
      } catch (error) {
        console.warn('Unable to schedule daily step reminder', error);
      }
    };
    scheduleReminder();
  }, []);

  useEffect(() => {
    if (!isStepStateReady) {
      return;
    }

    saveStepState(steps, getTodayKey(), lastSensorValueRef.current).catch(error => {
      console.warn('Unable to persist steps', error);
    });
  }, [steps, isStepStateReady]);

  useEffect(() => {
    const dateKey = selectedDate?.date;
    if (!dateKey) {
      return;
    }

    persistMeditationState(dateKey, remainingSeconds, remainingSeconds === 0).catch(error => {
      console.warn('Unable to persist meditation state', error);
    });
  }, [remainingSeconds, selectedDate]);

  // Show meditation complete modal when timer reaches zero
  useEffect(() => {
    console.log('remainingSeconds changed:', remainingSeconds, 'isRunning:', isRunning);
    if (remainingSeconds === 1 && isRunning) {
      finishTimer();
      setShowMeditationCompleteModal(true);
    }
  }, [remainingSeconds]);

  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      if (nextAppState === 'background' || nextAppState === 'inactive') {
        saveStepState(steps, getTodayKey(), lastSensorValueRef.current).catch(error => {
          console.warn('Unable to persist steps on app background', error);
        });

        const dateKey = selectedDate?.date;
        if (dateKey) {
          persistMeditationState(dateKey, remainingSeconds, remainingSeconds === 0).catch(error => {
            console.warn('Unable to persist meditation state on app background', error);
          });
        }
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => subscription.remove();
  }, [steps]);

  const handleStepCountChange = useCallback((stepCount) => {
    const safeCount = Number(stepCount || 0);
    const previousSensorValue = lastSensorValueRef.current;

    setSteps(prevSteps => {
      let totalSteps = prevSteps;

      if (previousSensorValue === null) {
        totalSteps = safeCount > 0 ? safeCount : prevSteps;
      } else if (safeCount > previousSensorValue) {
        totalSteps = prevSteps + (safeCount - previousSensorValue);
      } else if (safeCount === previousSensorValue) {
        totalSteps = prevSteps;
      } else {
        totalSteps = prevSteps + safeCount;
      }

      lastSensorValueRef.current = safeCount;
      return totalSteps;
    });
  }, []);

  useEffect(() => {
    const config = {
      default_threshold: 15.0,
      default_delay: 150000000,
      cheatInterval: 3000,
      onStepCountChange: handleStepCountChange,
      onCheat: () => { console.log("User is Cheating") }
    }

    const start = async () => {
      if (!isStepStateReady) {
        return;
      }

      if (Platform.OS === 'android' && Platform.Version >= 29) {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACTIVITY_RECOGNITION,
            {
              title: 'Activity Permission',
              message: 'App needs access to your activity to count steps.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            }
          );
          if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            console.warn('Activity recognition permission denied');
            return;
          }
        } catch (err) {
          console.warn('Permission request error', err);
          return;
        }
      }
      try {
        startCounter(config);
      } catch (error) {
        console.warn('Unable to start step counter:', error);
      }
    };
    start();
    return () => {
      try {
        stopCounter();
      } catch (error) {
        console.warn('Unable to stop step counter:', error);
      }
    }
  }, [handleStepCountChange, isStepStateReady]);

  const getCurrentWeek = () => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() + 1);

    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(startOfWeek);
      d.setDate(startOfWeek.getDate() + i);
      return {
        day: d.toLocaleDateString('en-US', { weekday: 'short' }),
        date: d.toISOString().split('T')[0],
      };
    });
  };

  const weekDays = getCurrentWeek();
  const selectedDateKey = selectedDate?.date || null;
  const isTodaySelected = selectedDateKey === getTodayKey();
  const waterCount = selectedDateKey ? (waterByDate[selectedDateKey] || 0) : 0;

  const updateWater = (delta, selectedKey) => {
    if (!selectedDateKey || !isTodaySelected) {
      // only allow updates for today's date
      Alert.alert(t('read_only_title'), t('read_only_update_water'));
      return;
    }

    setWaterByDate(prev => {
      const prevCount = prev[selectedDateKey] || 0;
      const newCount = getUpdatedWaterCount(prevCount, selectedKey, delta);
      const updated = { ...prev, [selectedDateKey]: newCount };
      saveWaterByDateToStorage(updated).catch(err => console.warn('save water error', err));

      // show completion popup if reached target
      if (selectedKey && newCount >= Number(selectedKey)) {
        setShowWaterCompleteModal(true);
      }

      return updated;
    });
  };

  const startTimer = () => {
    console.log('startTimer called', { remainingSeconds });
    if (!isTodaySelected) {
      Alert.alert(t('read_only_title'), t('read_only_start_meditation'));
      return;
    }

    if (remainingSeconds > 0) {
      setIsRunning(true);
    }
  };

    const finishTimer = () => {
    console.log('finishTimer called', { remainingSeconds, selectedDate });
    if (!isTodaySelected) {
      Alert.alert('Read only', 'You can only finish meditation for today');
      return;
    }

    const dateKey = selectedDate?.date || getTodayKey();
    const meditationMinutes = remainingSeconds / 60;
    const isCompleted = remainingSeconds === 1;

    persistMeditationState(dateKey, remainingSeconds, isCompleted).catch(error => {
      console.warn('Unable to persist meditation state', error);
    });

    saveWeeklyPlanMeditationState(dateKey, meditationMinutes, isCompleted).catch(error => {
      console.warn('Unable to save weekly plan meditation state', error);
    });

    const raw = {
      date: dateKey,
      meditatiion_minutes: parseInt(meditationMinutes),
      is_meditation_completed: isCompleted,
    };

    console.log('Timer paused::', raw);
    onAddCommonJsonApi('plan/track-progress', raw)
      .then(responseData => {
        console.log('responseData set::', responseData.data);
      })
      .catch(err => {
        console.log('Error:', err.response);
      });
  };

  const pauseTimer = () => {
    console.log('pauseTimer called', { remainingSeconds, selectedDate });
    if (!isTodaySelected) {
      Alert.alert('Read only', 'You can only pause meditation for today');
      return;
    }

    setIsRunning(false);
    const dateKey = selectedDate?.date || getTodayKey();
    const meditationMinutes = remainingSeconds / 60;
    const isCompleted = remainingSeconds === 0;

    persistMeditationState(dateKey, remainingSeconds, isCompleted).catch(error => {
      console.warn('Unable to persist meditation state', error);
    });

    saveWeeklyPlanMeditationState(dateKey, meditationMinutes, isCompleted).catch(error => {
      console.warn('Unable to save weekly plan meditation state', error);
    });

    const raw = {
      date: dateKey,
      meditatiion_minutes: parseInt(meditationMinutes),
      is_meditation_completed: isCompleted,
    };

    console.log('Timer paused::', raw);
    onAddCommonJsonApi('plan/track-progress', raw)
      .then(responseData => {
        console.log('responseData set::', responseData.data);
      })
      .catch(err => {
        console.log('Error:', err.response);
      });
  };

  const getGreetingKey = () => {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
      return 'good_morning';
    } else if (hour >= 12 && hour < 17) {
      return 'good_afternoon';
    } else if (hour >= 17 && hour < 21) {
      return 'good_evening';
    } else {
      return 'good_night';
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
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: hp(8) }} showsVerticalScrollIndicator={false}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={wavingHand} style={styles.optionImageStyle} />
          <Text style={styles.greeting}> {t(getGreetingKey())}, {profileData?.name}</Text>
        </View>
        <Text style={styles.subText}>{t('dashboard_massage')}</Text>

        <View style={styles.stepCard}>
          <View style={styles.stepCardHeader}>
            <View>
              <Text style={styles.stepTitle}>{t('today_step')}</Text>
              <Text style={styles.stepSubTitle}>{t('daily_walking_progress')}</Text>
            </View>
            <View style={styles.stepBadgeWrapper}>
              <Text style={styles.stepBadge}>{progressPercent}</Text>
            </View>
          </View>

          <View style={styles.stepCountSection}>
            <View style={styles.stepCountDetails}>
              <Text style={styles.stepCount}>{steps.toLocaleString()}</Text>
              <Text style={styles.stepGoalText}>{`${stepGoal.toLocaleString()} target`}</Text>
            </View>
            <View style={styles.stepCounterBadge}>
              <Text style={styles.stepCounterLabel}>{t('remaining')}</Text>
              <Text style={styles.stepCounterValue}>{stepsRemaining.toLocaleString()}</Text>
            </View>
          </View>

          <View style={styles.stepProgressBar}>
            <View style={[styles.stepProgressFill, { width: `${progress * 100}%` }]} />
          </View>

          <View style={styles.stepMetaRow}>
            <View style={styles.stepMetaItem}>
              <Text style={styles.stepMetaLabel}>{t('live_tracking')}</Text>
              <Text style={styles.stepMetaValue}>{t('active')}</Text>
            </View>
            <View style={styles.stepMetaItem}>
              <Text style={styles.stepMetaLabel}>{t('goal_status')}</Text>
              <Text style={styles.stepMetaValue}>{progressPercent}</Text>
            </View>
          </View>

          <Text style={styles.resumeText}>
            {lastSensorValueRef.current !== null ? t('resuming_from_last_saved_session') : t('starting_fresh_today')}
          </Text>
        </View>

        {/* Week Header */}
        <View style={styles.header}>
          {weekDays.map((d, i) => (
            <TouchableOpacity
              key={i}
              style={[styles.dayBox, { backgroundColor: selectedDate?.date === d.date ? COLORS.textColor : COLORS.primary }]}
              onPress={() => {
                setSelectedDate(d);
                console.log('OnPress', d, i);
              }}>
              <Text style={styles.dayFont}>{d.day}</Text>
              <Text style={styles.dateFont}>{d.date.split("-")[2]}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {weeklyPlan.map((item, index) => {
          return item.date === selectedDate?.date ? (
            <View key={index}>
              <View style={styles.card}>
                <Text style={styles.date}>
                  {item.day} - {item.date}
                </Text>
                {/* Calories */}
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={fire} style={styles.optionImageStyle} />
                  <Text style={styles.calories}>
                     {item.calories} kcal
                  </Text>
                </View>
              </View>
              {/* Meals */}
              <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('MealDetailScreen', { item: item })}>
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>{t('breakfast')}</Text>
                  <Text style={styles.foodText}>{`${item.meals.breakfast}\n`}</Text>
                  <Text style={styles.sectionTitle}>{t('lunch')}</Text>
                  <Text style={styles.foodText}>{`${item.meals.lunch}\n`}</Text>
                  <Text style={styles.sectionTitle}>{t('dinner')}</Text>
                  <Text style={styles.foodText}>{`${item.meals.dinner}\n`}</Text>
                </View>
              </TouchableOpacity>
              {item?.beverage != null && (
                <View style={styles.card}>
                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>{t('beverage')}</Text>
                    <Text style={styles.foodText}>{`${item?.beverage}`}</Text>
                  </View>
                </View>
              )}˘

              {/* BMI Calculator */}
              <View style={styles.card}>
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>{t('bmi_calculator')}</Text>
                  <Text style={styles.foodText}>{t('bmi_message')}</Text>
                  <TouchableOpacity style={styles.workoutButton} onPress={() => navigation.navigate('BMIScreen')}>
                    <Text style={styles.startText}>{t('calculate_bmi')}</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Water Intake */}
              <View style={styles.waterCard}>
                <View style={styles.waterCardHeader}>
                  <View>
                      <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                        <Image source={drop} style={styles.optionImageStyle} />
                        <Text style={styles.waterTitle}> {t('water_intake')}</Text>
                      </View>
                    <Text style={styles.waterSubtitle}>{t('track_your_daily_glasses')}</Text>
                  </View>
                  <View style={styles.waterBadge}>
                    <Text style={styles.waterBadgeText}>{waterCount}/{item?.water_target_glasses}</Text>
                  </View>
                </View>

                <View style={styles.waterControls}>
                  <TouchableOpacity style={styles.waterButton} onPress={() => updateWater(-1, item?.water_target_glasses)} disabled={!isTodaySelected}>
                    <Text style={[styles.waterButtonText, { marginBottom: hp(1) }]}>-</Text>
                  </TouchableOpacity>
                  <View style={styles.waterCenterBox}>
                    <Text style={styles.waterCountText}>{waterCount}</Text>
                    <Text style={styles.waterHintText}>{t('glasses')}</Text>
                  </View>
                  <TouchableOpacity style={styles.waterButton} onPress={() => updateWater(1, item?.water_target_glasses)} disabled={!isTodaySelected}>
                    <Text style={styles.waterButtonText}>+</Text>
                  </TouchableOpacity>
                </View>

                <Text style={styles.waterLimitText}>{t('maximum')} {item?.water_target_glasses} {t('glasses_per_day')}</Text>
              </View>
              {/* Exercises */}
              <View style={styles.card}>
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>{t('exercises')}</Text>
                  {item.exercises.map((ex, index) => (
                    <Text key={index} style={styles.exerciseText}>• {ex?.name}</Text>
                  ))}
                  <TouchableOpacity style={styles.workoutButton} onPress={() => navigation.navigate('ProgramDetailScreen', { item: item })}>
                    <Text style={styles.startText}>{t('start_exercises')}</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.card}>
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>{t('meditation')}</Text>
                  {/* <Text style={styles.foodText}>{`${item.meditation}`}</Text> */}
                  <MeditationTimer
                    meditation={item.meditation}
                    remainingSeconds={remainingSeconds}
                    setRemainingSeconds={setRemainingSeconds}
                    isRunning={isRunning}
                    setIsRunning={setIsRunning}
                    startTimer={startTimer}
                    pauseTimer={pauseTimer}
                    isEditable={isTodaySelected}
                  />
                </View>
              </View>
              <View style={styles.card}>
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>{t('medication')}</Text>
                  {item.medication.map((medication, index) => (
                    <View style={styles.supplementTopRow}>
                      <View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Image source={pill} style={styles.optionImageStyle} />
                        <Text style={[styles.supplementName, { marginLeft: 8 }]}>
                           {medication.name}
                        </Text>
                        </View>
                        <Text style={styles.supplementTiming}>
                          {medication.timing}
                        </Text>
                      </View>
                      <View style={styles.dosageBox}>
                        <Text style={styles.dosageText}>
                          {medication.dosage}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
              <View style={styles.card}>
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>{t('supplements')}</Text>
                  {item.supplements.map((supplement, index) => (
                    <View style={styles.supplementTopRow}>
                      <View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Image source={pills} style={styles.optionImageStyle} />
                          <Text style={[styles.supplementName, { marginLeft: 8 }]}>
                            {supplement.name}
                          </Text>
                        </View>
                        <Text style={styles.supplementTiming}>
                          {supplement.timing}
                        </Text>
                      </View>
                      <View style={styles.dosageBox}>
                        <Text style={styles.dosageText}>
                          {supplement.dosage}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          ) : null
        })}
        <View style={styles.card}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: hp(1) }}>
            <Image source={fire} style={styles.optionImageStyle} />
            <Text style={styles.cardTitle}> {t('calories_burned')}</Text>
          </View>
          <LineChart
            initialSpacing={0}
            data={caloriesChart}
            spacing={39}
            textColor1={COLORS.white}
            textShiftY={-8}
            textShiftX={-5}
            textFontSize={13}
            thickness={5}
            hideRules
            hideYAxisText
            yAxisColor={COLORS.secondary}
            showVerticalLines
            verticalLinesColor="rgba(14,164,164,0.5)"
            xAxisColor={COLORS.secondary}
            color={COLORS.secondary}
            dataPointColor={COLORS.white}
            xAxisLabelTextStyle={{
              color: COLORS.white,
              fontSize: 11,
            }}
          />
        </View>
      </ScrollView>
      {/* Water completion modal */}
      <Modal visible={showWaterCompleteModal} transparent animationType="fade">
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ width: '85%', backgroundColor: COLORS.primary, padding: 20, borderRadius: 12, alignItems: 'center' }}>
            <Text style={{ color: COLORS.secondary, fontSize: 18, fontWeight: '700', marginBottom: 8 }}>{t('nice_job')}</Text>
            <Image source={{ uri: 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExcTV5ZW9jZjAxZTRybG54Y2h0NXZvZDlrM2hheng2Z2N3ZGRycHp5bCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/lMBcCPM0VYfhh2zCAy/giphy.gif' }} style={{ width: 200, height: 200, marginBottom: 12, borderRadius: 8 }} />
            <Text style={{ color: COLORS.white, marginBottom: 16 }}>{t('water_goal_reached')}</Text>
            <TouchableOpacity onPress={() => setShowWaterCompleteModal(false)} style={{ backgroundColor: COLORS.subPrimary, paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8 }}>
              <Text style={{ color: COLORS.white }}>{t('done')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Meditation completion modal with gif */}
      <Modal visible={showMeditationCompleteModal} transparent animationType="fade">
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ width: '90%', backgroundColor: COLORS.primary, padding: 18, borderRadius: 12, alignItems: 'center' }}>
            <Text style={{ color: COLORS.secondary, fontSize: 18, fontWeight: '700', marginBottom: 8 }}>{t('meditation_complete')}</Text>
            <Image source={{ uri: 'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExN3hreTIxdTUyM3N5dGlpcG5yemIybGp3YnU0bzE3anNhMWMwaTRvZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/879RsXB8GvEuY95LNl/giphy.gif' }} style={{ width: 200, height: 200, marginBottom: 12, borderRadius: 8 }} />
            <Text style={{ color: COLORS.white, marginBottom: 16 }}>{t('meditation_session_finished')}</Text>
            <TouchableOpacity onPress={() => setShowMeditationCompleteModal(false)} style={{ backgroundColor: COLORS.subPrimary, paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8 }}>
              <Text style={{ color: COLORS.white }}>{t('done')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DashboardScreen;
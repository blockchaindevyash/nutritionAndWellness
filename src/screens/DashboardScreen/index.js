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
} from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import { portraitStyles, landscapeStyles } from './styles';
import useOrientation from '../../components/OrientationComponent';
import { hp } from '../../components/responsive';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../../utils';
import { LineChart } from "react-native-gifted-charts"
import { startCounter, stopCounter } from 'react-native-accurate-step-counter';
import { getUpdatedWaterCount, MAX_WATER_GLASSES } from './helpers';
import { scheduleDailyStepGoalReminder } from '../../../notificationService';
import { onAddCommonJsonApi } from '../../services/Api';

const weeklyPlan = [
  {
    date: "2026-08-03",
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
    date: "2026-08-04",
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
    date: "2026-08-05",
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
    date: "2026-08-06",
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
    date: "2026-08-07",
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
    date: "2026-08-08",
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
    date: "2026-08-09",
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
  const orientation = useOrientation();
  const isPortrait = orientation === 'portrait';
  const styles = isPortrait ? portraitStyles : landscapeStyles;
  const insets = useSafeAreaInsets();
  const [selectedDate, setSelectedDate] = useState(null);
  const [steps, setSteps] = useState(0);
  const [waterByDate, setWaterByDate] = useState({});
  const [isStepStateReady, setIsStepStateReady] = useState(false);
  const lastSensorValueRef = useRef(null);
  const progress = stepGoal > 0 ? Math.min(steps / stepGoal, 1) : 0;
  const progressPercent = `${Math.round(progress * 100)}%`;
  const stepsRemaining = Math.max(stepGoal - steps, 0);

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
    const handleAppStateChange = (nextAppState) => {
      if (nextAppState === 'background' || nextAppState === 'inactive') {
        saveStepState(steps, getTodayKey(), lastSensorValueRef.current).catch(error => {
          console.warn('Unable to persist steps on app background', error);
        });
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
  const waterCount = selectedDateKey ? (waterByDate[selectedDateKey] || 0) : 0;

  const updateWater = delta => {
    if (!selectedDateKey) {
      return;
    }

    setWaterByDate(prev => ({
      ...prev,
      [selectedDateKey]: getUpdatedWaterCount(prev[selectedDateKey], delta),
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
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: hp(8) }} showsVerticalScrollIndicator={false}>
        <Text style={styles.greeting}>👋 Good Morning, Yash</Text>
        <Text style={styles.subText}>You're doing great today!</Text>

        <View style={styles.stepCard}>
          <View style={styles.stepCardHeader}>
            <View>
              <Text style={styles.stepTitle}>Today's Steps</Text>
              <Text style={styles.stepSubTitle}>Progress toward your daily walking goal</Text>
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
              <Text style={styles.stepCounterLabel}>Remaining</Text>
              <Text style={styles.stepCounterValue}>{stepsRemaining.toLocaleString()}</Text>
            </View>
          </View>

          <View style={styles.stepProgressBar}>
            <View style={[styles.stepProgressFill, { width: `${progress * 100}%` }]} />
          </View>

          <View style={styles.stepMetaRow}>
            <View style={styles.stepMetaItem}>
              <Text style={styles.stepMetaLabel}>Live Tracking</Text>
              <Text style={styles.stepMetaValue}>Active</Text>
            </View>
            <View style={styles.stepMetaItem}>
              <Text style={styles.stepMetaLabel}>Goal Status</Text>
              <Text style={styles.stepMetaValue}>{progressPercent}</Text>
            </View>
          </View>

          <Text style={styles.resumeText}>
            {lastSensorValueRef.current !== null ? 'Resuming from last saved session' : 'Starting fresh today'}
          </Text>
        </View>

        {/* Week Header */}
        <View style={styles.header}>
          {weekDays.map((d, i) => (
            <TouchableOpacity
              key={i}
              style={[styles.dayBox, {backgroundColor: selectedDate?.date === d.date ? COLORS.textColor : COLORS.primary}]}
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
                <Text style={styles.calories}>
                  🔥 {item.calories} kcal
                </Text>
              </View>
              {/* Meals */}
              <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('MealDetailScreen', {item: item})}>
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Breakfast</Text>
                  <Text style={styles.foodText}>{`${item.meals.breakfast}\n`}</Text>
                  <Text style={styles.sectionTitle}>Lunch</Text>
                  <Text style={styles.foodText}>{`${item.meals.lunch}\n`}</Text>
                  <Text style={styles.sectionTitle}>Dinner</Text>
                  <Text style={styles.foodText}>{`${item.meals.dinner}\n`}</Text>
                </View>
              </TouchableOpacity>
              {/* Water Intake */}
              <View style={styles.waterCard}>
          <View style={styles.waterCardHeader}>
            <View>
              <Text style={styles.waterTitle}>💧 Water intake</Text>
              <Text style={styles.waterSubtitle}>Track your daily glasses</Text>
            </View>
            <View style={styles.waterBadge}>
              <Text style={styles.waterBadgeText}>{waterCount}/{MAX_WATER_GLASSES}</Text>
            </View>
          </View>

          <View style={styles.waterControls}>
            <TouchableOpacity style={styles.waterButton} onPress={() => updateWater(-1)}>
              <Text style={[styles.waterButtonText, {marginBottom: hp(1)}]}>-</Text>
            </TouchableOpacity>
            <View style={styles.waterCenterBox}>
              <Text style={styles.waterCountText}>{waterCount}</Text>
              <Text style={styles.waterHintText}>Glasses</Text>
            </View>
            <TouchableOpacity style={styles.waterButton} onPress={() => updateWater(1)}>
              <Text style={styles.waterButtonText}>+</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.waterLimitText}>Maximum {MAX_WATER_GLASSES} glasses per day</Text>
        </View>
              {/* Exercises */}
              <View style={styles.card}>
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Exercises</Text>
                  {item.exercises.map((ex, index) => (
                    <Text key={index} style={styles.exerciseText}>• {ex}</Text>
                  ))}
                  <TouchableOpacity style={styles.workoutButton} onPress={() => navigation.navigate('ProgramDetailScreen', {item: item})}>
                    <Text style={styles.startText}>Start Exercises</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.card}>
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Supplements</Text>
                  {item.supplements.map((supplement, index) => (
                    <View style={styles.supplementTopRow}>
                      <View>
                        <Text style={styles.supplementName}>
                          💊 {supplement.name}
                        </Text>
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
          <Text style={styles.cardTitle}>🔥  Calories burned</Text>
          <LineChart
            initialSpacing={0}
            data={lineData}
            spacing={39}
            textColor1={COLORS.white}
            textShiftY={-8}
            textShiftX={-10}
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
          />
        </View>
        {/* <View style={styles.progremView}>
          <Text style={styles.cardTitle}>💪 Target Muscle Area</Text>
        </View> */}
        {/* <FlatList
          data={areaData}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.dishCard} onPress={() => { }}>
              <Text style={styles.cardTitle}>{item.name}</Text>
            </TouchableOpacity>
          )}
        /> */}
      </ScrollView>
    </View>
  );
};

export default DashboardScreen;
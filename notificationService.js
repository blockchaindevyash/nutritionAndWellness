import AsyncStorage from "@react-native-async-storage/async-storage";
import notifee, {
  AndroidImportance,
  TriggerType,
  RepeatFrequency,
} from "@notifee/react-native";
import { Platform, PermissionsAndroid } from "react-native";
import { onAddCommonFormApi, onAddCommonJsonApi } from "./src/services/Api";

const CHANNEL_ID = "meal-reminder";
const STEP_GOAL_REMINDER_ID = "step-goal-reminder";
const STEP_STATE_KEY = "daily-step-state";
const MEAL_NOTIFICATION_IDS = ["breakfast-reminder", "lunch-reminder", "dinner-reminder"];

export async function requestNotificationPermission() {
  if (Platform.OS === "android" && Platform.Version >= 33) {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
    );
  }

  await notifee.requestPermission();
}

export async function createNotificationChannel() {
  await notifee.createChannel({
    id: CHANNEL_ID,
    name: "Meal Reminder",
    importance: AndroidImportance.HIGH,
    sound: "default",
    vibration: true,
  });
}

const getFutureTimestamp = (hour, minute = 0) => {
  const now = new Date();
  const futureDate = new Date();

  futureDate.setHours(hour);
  futureDate.setMinutes(minute);
  futureDate.setSeconds(0);
  futureDate.setMilliseconds(0);

  if (futureDate <= now) {
    futureDate.setDate(futureDate.getDate() + 1);
  }

  return futureDate.getTime();
};

async function scheduleNotification({
  id,
  title,
  body,
  hour,
  minute,
  repeatDaily = true,
}) {
  const timestamp = getFutureTimestamp(hour, minute);

  await notifee.createTriggerNotification(
    {
      id,
      title,
      body,
      android: {
        channelId: CHANNEL_ID,
        smallIcon: "ic_launcher",
        pressAction: {
          id: "default",
        },
      },
    },
    {
      type: TriggerType.TIMESTAMP,
      timestamp,
      ...(repeatDaily ? { repeatFrequency: RepeatFrequency.DAILY } : {}),
      alarmManager: {
        allowWhileIdle: true,
      },
    }
  );
}

export async function scheduleMealNotifications() {
  for (const id of MEAL_NOTIFICATION_IDS) {
    await notifee.cancelNotification(id);
  }

  await scheduleNotification({
    id: "breakfast-reminder",
    title: "Breakfast Time 🍳",
    body: "Don't skip your healthy breakfast!",
    hour: 8,
    minute: 0,
  });

  await scheduleNotification({
    id: "lunch-reminder",
    title: "Lunch Time 🍛",
    body: "Time for your lunch!",
    hour: 13,
    minute: 0,
  });

  await scheduleNotification({
    id: "dinner-reminder",
    title: "Dinner Time 🍲",
    body: "Keep it light and healthy!",
    hour: 20,
    minute: 0,
  });
}

async function readStoredSteps() {
  try {
    const raw = await AsyncStorage.getItem(STEP_STATE_KEY);
    if (!raw) {
      return { steps: 0, date: null };
    }

    const parsed = JSON.parse(raw);
    return {
      steps: Number(parsed?.steps || 0),
      date: parsed?.date || null,
    };
  } catch (error) {
    console.warn("Unable to read step state", error);
    return { steps: 0, date: null };
  }
}

export async function syncDailyStepCount(dateKey = new Date().toISOString().slice(0, 10)) {
  try {
    const { steps } = await readStoredSteps();
    const payload = JSON.stringify({
      steps: Number(steps || 0),
      date: dateKey,
    });

    const responseData = await onAddCommonFormApi("step-count", payload);
    const success = responseData?.data?.status === true;

    if (success) {
      await AsyncStorage.setItem(
        STEP_STATE_KEY,
        JSON.stringify({ date: dateKey, steps: 0 })
      );
    }

    return success;
  } catch (error) {
    console.warn("Unable to sync step count", error);
    return false;
  }
}

export async function scheduleDailyStepGoalReminder(stepGoal = 10000) {
  await notifee.cancelNotification(STEP_GOAL_REMINDER_ID);

  const { steps } = await readStoredSteps();
  const goalMet = Number(steps || 0) >= stepGoal;
  const title = goalMet ? "🎉 Step goal completed" : "🚶 Step goal reminder";
  const body = goalMet
    ? `Amazing work! You reached ${stepGoal.toLocaleString()} steps today.`
    : `You are ${Math.max(stepGoal - steps, 0).toLocaleString()} steps away from your daily goal.`;

  await scheduleNotification({
    id: STEP_GOAL_REMINDER_ID,
    title,
    body,
    hour: 13,
    minute: 13,
  });
}

export function setupNotificationEventHandlers() {
  const handleNotificationEvent = async ({ detail }) => {
    const notification = detail?.notification;
    if (!notification || notification.id !== STEP_GOAL_REMINDER_ID) {
      return;
    }

    await syncDailyStepCount();
  };

  notifee.onForegroundEvent(handleNotificationEvent);
  notifee.onBackgroundEvent(handleNotificationEvent);
}
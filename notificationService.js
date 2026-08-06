import AsyncStorage from "@react-native-async-storage/async-storage";
import notifee, {
  AndroidImportance,
  AndroidStyle,
  TriggerType,
  RepeatFrequency,
} from "@notifee/react-native";
import { Platform, PermissionsAndroid, Image } from "react-native";
import { onAddCommonJsonApi } from "./src/services/Api";

const CHANNEL_ID = "health-reminders";
const STEP_GOAL_REMINDER_ID = "step-goal-reminder";
const STEP_STATE_KEY = "daily-step-state";
const STEP_SYNC_DONE_KEY = "daily-step-sync-done";
const STEP_SYNC_PENDING_KEY = "daily-step-sync-pending";
const MEAL_NOTIFICATION_IDS = ["breakfast-reminder", "lunch-reminder", "dinner-reminder"];

let stepSyncInFlight = new Map();

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
    name: "Health Reminders",
    importance: AndroidImportance.HIGH,
    vibration: true,
    sound: "default",
    lights: true,
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
    const diffMs = now.getTime() - futureDate.getTime();
    // If scheduled time is within the same minute, treat as immediate test
    if (diffMs < 60 * 1000) {
      return now.getTime() + 5 * 1000; // 5 seconds from now
    }

    // Otherwise schedule for the next day
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
  imageUrl = null,
  repeatDaily = true,
}) {
  const timestamp = getFutureTimestamp(hour, minute);

  console.log(
    `Scheduling ${id} at ${new Date(timestamp).toLocaleString()}`
  );

  await notifee.createTriggerNotification(
    {
      id,
      title,
      body,

      android: {
        channelId: CHANNEL_ID,
        importance: AndroidImportance.HIGH,
        smallIcon: "ic_launcher",

        pressAction: {
          id: "default",
        },

        ...(imageUrl && {
          largeIcon: imageUrl,

          style: {
            type: AndroidStyle.BIGPICTURE,
            picture: imageUrl,
          },
        }),
      },

      ios: imageUrl
        ? {
            attachments: [
              {
                url: imageUrl,
              },
            ],
          }
        : undefined,
    },
    {
      type: TriggerType.TIMESTAMP,
      timestamp,

      ...(repeatDaily && {
        repeatFrequency: RepeatFrequency.DAILY,
      }),

      alarmManager: {
        allowWhileIdle: true,
      },
    }
  );
}

export async function scheduleWalkReminders() {
  const walkImage = Image.resolveAssetSource(
    require("./assets/walk.png")
  );

  const imageUri = walkImage.uri;

  const morningHours = [7, 8, 9, 10, 13];
  const eveningHours = [18, 19, 20, 21, 22];

  const messages = [
    "🚶 Let's go for a walk!",
    "💪 Time to burn some calories.",
    "🌿 Fresh air is waiting for you.",
    "❤️ Walking improves your health.",
    "😊 Every step counts. Keep moving!",
  ];

  const randomMessage = () =>
    messages[Math.floor(Math.random() * messages.length)];

  for (const hour of [...morningHours, ...eveningHours]) {
    await notifee.cancelNotification(`walk-reminder-${hour}`);
  }

  for (const hour of morningHours) {
    await scheduleNotification({
      id: `walk-reminder-${hour}`,
      title: "🌞 Morning Walk",
      body: randomMessage(),
      hour,
      minute: 7,
      imageUrl: imageUri,
    });
  }

  for (const hour of eveningHours) {
    await scheduleNotification({
      id: `walk-reminder-${hour}`,
      title: "🌙 Evening Walk",
      body: randomMessage(),
      hour,
      minute: 0,
      imageUrl: imageUri,
    });
  }
}

export async function scheduleMealNotifications() {
  const walkImage = Image.resolveAssetSource(
    require("./assets/walk.png")
  );

  const imageUri = walkImage.uri;

  for (const id of MEAL_NOTIFICATION_IDS) {
    await notifee.cancelNotification(id);
  }

  await scheduleNotification({
    id: "breakfast-reminder",
    title: "🍳 Breakfast Time",
    body: "Don't skip your healthy breakfast!",
    hour: 8,
    minute: 0,
    imageUrl: imageUri,
  });

  await scheduleNotification({
    id: "lunch-reminder",
    title: "🍛 Lunch Time",
    body: "Time for your healthy lunch!",
    hour: 13,
    minute: 0,
    imageUrl: imageUri,
  });

  await scheduleNotification({
    id: "dinner-reminder",
    title: "🍲 Dinner Time",
    body: "Keep your dinner light and healthy!",
    hour: 20,
    minute: 0,
    imageUrl: imageUri,
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
  const activeSync = stepSyncInFlight.get(dateKey);
  if (activeSync) {
    return activeSync;
  }

  const lastSyncedDate = await AsyncStorage.getItem(STEP_SYNC_DONE_KEY);
  const pendingSyncDate = await AsyncStorage.getItem(STEP_SYNC_PENDING_KEY);

  if (lastSyncedDate === dateKey) {
    return true;
  }

  if (pendingSyncDate === dateKey) {
    return false;
  }

  const pendingSync = (async () => {
    try {
      await AsyncStorage.setItem(STEP_SYNC_PENDING_KEY, dateKey);
      const { steps } = await readStoredSteps();
      const payload = {
        steps: Number(steps || 0),
        date: dateKey,
      };
      console.log('Uploading syncDailyStepCount step count::', payload);
      const responseData = await onAddCommonJsonApi("step-count", payload);
      const success = responseData?.data?.status === true;

      if (success) {
        const raw = await AsyncStorage.getItem(STEP_STATE_KEY);
        const storedState = raw ? JSON.parse(raw) : null;
        const nextState = {
          ...(storedState || {}),
          date: dateKey,
          steps: Number(steps || 0),
        };

        await AsyncStorage.setItem(STEP_STATE_KEY, JSON.stringify(nextState));
        await AsyncStorage.setItem(STEP_SYNC_DONE_KEY, dateKey);
        await AsyncStorage.removeItem(STEP_SYNC_PENDING_KEY);
      }

      return success;
    } catch (error) {
      console.warn("Unable to sync step count", error);
      return false;
    } finally {
      stepSyncInFlight.delete(dateKey);
    }
  })();

  stepSyncInFlight.set(dateKey, pendingSync);
  return pendingSync;
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
    hour: 17,
    minute: 27,
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
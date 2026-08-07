import AsyncStorage from "@react-native-async-storage/async-storage";
import notifee, {
  AndroidImportance,
  AndroidStyle,
  EventType,
  TriggerType,
  RepeatFrequency,
} from "@notifee/react-native";
import { Platform, PermissionsAndroid, Image } from "react-native";
import { onAddCommonJsonApi } from "./src/services/Api";

const CHANNEL_ID = "health-reminders";
const STEP_GOAL_REMINDER_ID = "step-goal-reminder";
const WATER_DRANK_ACTION_ID = "water-drank";
const STEP_STATE_KEY = "daily-step-state";
const STEP_SYNC_DONE_KEY = "daily-step-sync-done";
const STEP_SYNC_PENDING_KEY = "daily-step-sync-pending";
const MEAL_NOTIFICATION_IDS = ["breakfast-reminder", "lunch-reminder", "dinner-reminder"];
const WATER_HOURS = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];

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
  actions = [],
  repeatDaily = true,
}) {
  const timestamp = getFutureTimestamp(hour, minute);

  console.log(
    `Scheduling ${id} at ${new Date(timestamp).toLocaleString()}`
  );

  const androidOptions = {
    channelId: CHANNEL_ID,
    importance: AndroidImportance.HIGH,
    smallIcon: "ic_launcher",
    pressAction: {
      id: "default",
    },
    ...(actions.length > 0 && {
      actions,
    }),
    ...(imageUrl && {
      largeIcon: imageUrl,
      style: {
        type: AndroidStyle.BIGPICTURE,
        picture: imageUrl,
      },
    }),
  };

  const iosOptions = {
    ...(imageUrl && {
      attachments: [
        {
          url: imageUrl,
        },
      ],
    }),
    ...(actions.length > 0 && {
      // iOS action categories require registration elsewhere; on iOS this will use pressAction only.
      categoryId: "water-category",
    }),
  };

  await notifee.createTriggerNotification(
    {
      id,
      title,
      body,
      android: androidOptions,
      ios: imageUrl ? iosOptions : undefined,
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
  const walkImage = Image.resolveAssetSource(require("./assets/walk.png"));
  const walkImage1 = Image.resolveAssetSource(require("./assets/walk1.jpg"));
  const walkImage2 = Image.resolveAssetSource(require("./assets/walk2.png"));
  const walkImage3 = Image.resolveAssetSource(require("./assets/walk3.webp"));
  const walkImage4 = Image.resolveAssetSource(require("./assets/walk4.jpg"));
  const walkImage5 = Image.resolveAssetSource(require("./assets/walk5.jpg"));
  const walkImage6 = Image.resolveAssetSource(require("./assets/walk6.png"));
  const walkImage7 = Image.resolveAssetSource(require("./assets/walk7.jpg"));

  const imageUri = walkImage.uri;
  const imageUri1 = walkImage1.uri;
  const imageUri2 = walkImage2.uri;
  const imageUri3 = walkImage3.uri;
  const imageUri4 = walkImage4.uri;
  const imageUri5 = walkImage5.uri;
  const imageUri6 = walkImage6.uri;
  const imageUri7 = walkImage7.uri;

  const photos = [imageUri, imageUri1, imageUri2, imageUri3, imageUri4, imageUri5, imageUri6, imageUri7];

  const morningHours = [7, 8, 9, 10];
  const eveningHours = [18, 19, 20, 21, 22];

  const messages = [
    "🚶 Let's go for a walk!",
    "💪 Time to burn some calories.",
    "🌿 Fresh air is waiting for you.",
    "❤️ Walking improves your health.",
    "😊 Every step counts. Keep moving!",
  ];

  const randomImage = () =>
    photos[Math.floor(Math.random() * photos.length)];

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
      minute: 0,
      imageUrl: randomImage(),
    });
  }

  for (const hour of eveningHours) {
    await scheduleNotification({
      id: `walk-reminder-${hour}`,
      title: "🌙 Evening Walk",
      body: randomMessage(),
      hour,
      minute: 0,
      imageUrl: randomImage(),
    });
  }
}

export async function scheduleWaterReminders() {
  const waterMessages = [
    "💧 Time to hydrate! Drink a glass of water.",
    "🥤 Happy hydration hour — water time!",
    "🚰 Your body says yes to water.",
    "🌊 Stay fresh — take a water break.",
    "😄 Sip some water and smile!",
    "💦 Remember: water helps your energy.",
    "🧊 Cold water makes everything better.",
    "🍋 Add a slice if you want a tasty sip.",
  ];



  const yesMessages = [
    "🎉 Well done! You did it!",
    "👏 Great job staying hydrated!",
    "🥳 Yes! Keep that water going.",
    "💪 Nice work — you're crushing it!",
    "🌟 Hydration hero! Keep up the good work.",
    "😀 Awesome, you drank water!",
    "🏆 You earned a hydration high-five!",
  ];

  const waterImage = Image.resolveAssetSource(require("./assets/water.webp"));
  const waterImage1 = Image.resolveAssetSource(require("./assets/water1.jpeg"));
  const waterImage2 = Image.resolveAssetSource(require("./assets/water2.webp"));
  const waterImage3 = Image.resolveAssetSource(require("./assets/water3.jpeg"));

  const imageUri = waterImage.uri;
  const imageUri1 = waterImage1.uri;
  const imageUri2 = waterImage2.uri;
  const imageUri3 = waterImage3.uri;

  const photos = [imageUri, imageUri1, imageUri2, imageUri3];

  const randomImage = () =>
    photos[Math.floor(Math.random() * photos.length)];

  const waterAction = [
    {
      title: "Yes",
      pressAction: {
        id: WATER_DRANK_ACTION_ID,
      },
    },
  ];

  const randomMessage = () =>
    waterMessages[Math.floor(Math.random() * waterMessages.length)];

  for (const hour of WATER_HOURS) {
    await notifee.cancelNotification(`water-reminder-${hour}`);
  }

  for (const hour of WATER_HOURS) {
    await scheduleNotification({
      id: `water-reminder-${hour}`,
      title: "💧 Drink Water",
      body: randomMessage(),
      hour,
      minute: 0,
      actions: waterAction,
      repeatDaily: true,
      imageUrl: randomImage(),
    });
  }

  // store yes messages for follow-up selection
  await AsyncStorage.setItem(
    "water-yes-messages",
    JSON.stringify(yesMessages)
  );
}

export async function scheduleMealNotifications() {
  const breakfast = Image.resolveAssetSource(require("./assets/breakfast.jpg"));
  const lunch = Image.resolveAssetSource(require("./assets/lunch.png"));
  const dinner = Image.resolveAssetSource(require("./assets/dinner.jpg"));

  const imageUri = breakfast.uri;
  const imageUri1 = lunch.uri;
  const imageUri2 = dinner.uri;

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
    imageUrl: imageUri1,
  });

  await scheduleNotification({
    id: "dinner-reminder",
    title: "🍲 Dinner Time",
    body: "Keep your dinner light and healthy!",
    hour: 20,
    minute: 0,
    imageUrl: imageUri2,
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
    hour: 23,
    minute: 0,
  });
}

async function getRandomYesMessage() {
  const fallbackMessages = [
    "🎉 Well done! You did it!",
    "👏 Great job staying hydrated!",
    "🥳 Yes! Keep that water going.",
    "💪 Nice work — you're crushing it!",
    "🌟 Hydration hero! Keep up the good work.",
  ];

  try {
    const raw = await AsyncStorage.getItem("water-yes-messages");
    const stored = raw ? JSON.parse(raw) : null;
    if (Array.isArray(stored) && stored.length > 0) {
      return stored[Math.floor(Math.random() * stored.length)];
    }
  } catch (err) {
    console.warn("Unable to load water yes messages", err);
  }

  return fallbackMessages[Math.floor(Math.random() * fallbackMessages.length)];
}

async function sendWaterDoneNotification() {
  const doneImage = Image.resolveAssetSource(require("./assets/done.jpeg"));
  const doneImage1 = Image.resolveAssetSource(require("./assets/done2.jpg"));
  const doneImage2 = Image.resolveAssetSource(require("./assets/done2.jpg"));
  const doneImage3 = Image.resolveAssetSource(require("./assets/done3.jpg"));
  const doneImage4 = Image.resolveAssetSource(require("./assets/done4.jpg"));
  const doneImage5 = Image.resolveAssetSource(require("./assets/done5.jpg"));
  const doneImage6 = Image.resolveAssetSource(require("./assets/done6.jpg"));
  const doneImage7 = Image.resolveAssetSource(require("./assets/done7.png"));
  const doneImage8 = Image.resolveAssetSource(require("./assets/done8.png"));
  const doneImage9 = Image.resolveAssetSource(require("./assets/done9.jpg"));
  const doneImage10 = Image.resolveAssetSource(require("./assets/done10.png"));
  const doneImage11 = Image.resolveAssetSource(require("./assets/done11.jpg"));

  const imageUri = doneImage.uri;
  const imageUri1 = doneImage1.uri;
  const imageUri2 = doneImage2.uri;
  const imageUri3 = doneImage3.uri;
  const imageUri4 = doneImage4.uri;
  const imageUri5 = doneImage5.uri;
  const imageUri6 = doneImage6.uri;
  const imageUri7 = doneImage7.uri;
  const imageUri8 = doneImage8.uri;
  const imageUri9 = doneImage9.uri;
  const imageUri10 = doneImage10.uri;
  const imageUri11 = doneImage11.uri;

  const photos = [imageUri, imageUri1, imageUri2, imageUri3, imageUri4, imageUri5, imageUri6, imageUri7, imageUri8, imageUri9, imageUri10, imageUri11];

  const randomImage = () => photos[Math.floor(Math.random() * photos.length)];
  const message = await getRandomYesMessage();
  const image = await randomImage();
  await notifee.displayNotification({
    title: "✅ Hydration Complete",
    body: message,
    android: {
      channelId: CHANNEL_ID,
      smallIcon: "ic_launcher",
      largeIcon: image,
      style: {
        type: AndroidStyle.BIGPICTURE,
        picture: image,
      },
      pressAction: {
        id: "default",
      },
    },
  });
}

export function setupNotificationEventHandlers() {
  const handleNotificationEvent = async ({ type, detail }) => {
    console.log('Notification event', type, detail?.notification?.id, detail?.pressAction?.id);

    const notification = detail?.notification;
    const pressAction = detail?.pressAction;
    if (type === EventType.ACTION_PRESS || type === EventType.PRESS) {
      if (!notification || !pressAction) {
        return;
      }

      if (pressAction.id === WATER_DRANK_ACTION_ID) {
        console.log('Water drank action received');
        await sendWaterDoneNotification();
      }

      if (notification.id === STEP_GOAL_REMINDER_ID) {
        await syncDailyStepCount();
      }

      return;
    }

    if (!notification || notification.id !== STEP_GOAL_REMINDER_ID) {
      return;
    }

    await syncDailyStepCount();
  };

  notifee.onForegroundEvent(handleNotificationEvent);
  notifee.onBackgroundEvent(handleNotificationEvent);
}

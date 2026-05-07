import notifee, {
  AndroidImportance,
  TriggerType,
  RepeatFrequency,
} from "@notifee/react-native";

import { Platform, PermissionsAndroid } from "react-native";


// ----------------------------
// Request Permission
// ----------------------------
export async function requestNotificationPermission() {

  if (Platform.OS === "android" && Platform.Version >= 33) {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
    );
  }

  await notifee.requestPermission();
}


// ----------------------------
// Create Channel
// ----------------------------
export async function createNotificationChannel() {

  await notifee.createChannel({
    id: "meal-reminder",
    name: "Meal Reminder",
    importance: AndroidImportance.HIGH,
    sound: "default",
    vibration: true,
  });

}


// ----------------------------
// Get Future Timestamp
// ----------------------------
const getFutureTimestamp = (hour, minute = 0) => {

  const now = new Date();

  const futureDate = new Date();

  futureDate.setHours(hour);
  futureDate.setMinutes(minute);
  futureDate.setSeconds(0);

  // if time passed -> next day
  if (futureDate <= now) {
    futureDate.setDate(futureDate.getDate() + 1);
  }

  return futureDate.getTime();
};


// ----------------------------
// Schedule Notification
// ----------------------------
async function scheduleNotification({
  id,
  title,
  body,
  hour,
  minute,
}) {

  const timestamp = getFutureTimestamp(hour, minute);

  await notifee.createTriggerNotification(
    {
      id,
      title,
      body,

      android: {
        channelId: "meal-reminder",
        smallIcon: "ic_launcher",
        pressAction: {
          id: "default",
        },
      },
    },
    {
      type: TriggerType.TIMESTAMP,
      timestamp,

      repeatFrequency: RepeatFrequency.DAILY,

      alarmManager: {
        allowWhileIdle: true,
      },
    }
  );
}


// ----------------------------
// Schedule All Meal Notifications
// ----------------------------
export async function scheduleMealNotifications() {

  // Clear old notifications
  await notifee.cancelAllNotifications();

  // Breakfast
  await scheduleNotification({
    id: "breakfast-reminder",
    title: "Breakfast Time 🍳",
    body: "Don't skip your healthy breakfast!",
    hour: 8,
    minute: 0,
  });

  // Lunch
  await scheduleNotification({
    id: "lunch-reminder",
    title: "Lunch Time 🍛",
    body: "Time for a your lunch!",
    hour: 13,
    minute: 0,
  });

  // Dinner
  await scheduleNotification({
    id: "dinner-reminder",
    title: "Dinner Time 🍲",
    body: "Keep it light and healthy!",
    hour: 20,
    minute: 0,
  });

}
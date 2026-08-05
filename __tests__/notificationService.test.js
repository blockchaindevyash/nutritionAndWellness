jest.mock('@react-native-async-storage/async-storage', () => ({
  __esModule: true,
  default: {
    getItem: jest.fn(),
    setItem: jest.fn(),
  },
}));

jest.mock('@notifee/react-native', () => ({
  __esModule: true,
  default: {
    requestPermission: jest.fn(),
    createChannel: jest.fn(),
    cancelNotification: jest.fn(),
    createTriggerNotification: jest.fn(),
    onForegroundEvent: jest.fn(),
    onBackgroundEvent: jest.fn(),
  },
  AndroidImportance: { HIGH: 4 },
  TriggerType: { TIMESTAMP: 1 },
  RepeatFrequency: { DAILY: 1 },
}));

jest.mock('react-native', () => ({
  Platform: {
    OS: 'android',
    Version: 33,
  },
  PermissionsAndroid: {
    request: jest.fn(),
    PERMISSIONS: {
      POST_NOTIFICATIONS: 'post_notifications',
    },
  },
}));

jest.mock('../src/services/Api', () => ({
  onAddCommonJsonApi: jest.fn(),
}));

import AsyncStorage from '@react-native-async-storage/async-storage';
import { syncDailyStepCount } from '../notificationService';
import { onAddCommonJsonApi } from '../src/services/Api';

describe('syncDailyStepCount', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    AsyncStorage.getItem.mockImplementation((key) => {
      if (key === 'daily-step-state') {
        return Promise.resolve(JSON.stringify({ steps: 116, date: '2026-08-05' }));
      }
      if (key === 'daily-step-sync-date') {
        return Promise.resolve(null);
      }
      return Promise.resolve(null);
    });
    AsyncStorage.setItem.mockResolvedValue();
    onAddCommonJsonApi.mockResolvedValue({ data: { status: true } });
  });

  it('dedupes duplicate sync calls for the same day', async () => {
    const first = syncDailyStepCount('2026-08-05');
    const second = syncDailyStepCount('2026-08-05');

    const [firstResult, secondResult] = await Promise.all([first, second]);

    expect(firstResult).toBe(true);
    expect(secondResult).toBe(true);
    expect(onAddCommonJsonApi).toHaveBeenCalledTimes(1);
  });
});

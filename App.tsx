import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './src/screens/SplashScreen';
import './src/i18n';
import LanguageSelector from './src/components/LanguageSelector';
import LoginScreen from './src/screens/LoginScreen';
import LoadingScreen from './src/screens/LoadingScreen';
import HomeScreen from './src/screens/HomeScreen';
import AccountScreen from './src/screens/AccountScreen';
import SignupScreen from './src/screens/SignupScreen';
import ForgotPassword from './src/screens/ForgotPassword';
import HistoryScreen from './src/screens/HistoryScreen';
import BasicInfoScreen from './src/screens/BasicInfoScreen';
import GoalSelection from './src/screens/GoalSelection';
import DietPreferenceScreen from './src/screens/DietPreferenceScreen';
import ActivityLevelScreen from './src/screens/ActivityLevelScreen';
import MedicalScreen from './src/screens/MedicalScreen';
import AIChatScreen from './src/screens/AIChatScreen';
import FoodAnalysis from './src/screens/FoodAnalysis';
import AnalysisDetailScreen from './src/screens/AnalysisDetailScreen';
import EditScreen from './src/screens/EditScreen';
import RecipeScreen from './src/screens/RecipeScreen';
import SaveRecipeDetailScreen from './src/screens/SaveRecipeDetailScreen';
import SaveRecipeScreen from './src/screens/SaveRecipeScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import TodoListScreen from './src/screens/TodoListScreen';
import ChangePassword from './src/screens/ChangePassword';
import NotificationScreen from './src/screens/NotificationScreen';
import ProgramDetailScreen from './src/screens/ProgramDetailScreen';
import WorkoutReference from './src/screens/WorkoutReference';
import MealDetailScreen from './src/screens/MealDetailScreen';
import DoctorDescription from './src/screens/DoctorDescription';
import MedicineDetailScreen from './src/screens/MedicineDetailScreen';
import CreateRecipeScreen from './src/screens/CreateRecipeScreen';
import AdviserScreen from './src/screens/AdviserScreen';
import BMIScreen from './src/screens/BMIScreen';
import AdviserDetailScreen from './src/screens/AdviserDetailScreen';
import PhoneVerificationScreen from './src/screens/PhoneVerificationScreen';
import ConsultantScreen from './src/screens/ConsultantScreen';
import CommunityForum from './src/screens/CommunityForum';
import CreatePostScreen from './src/screens/CreatePostScreen';
import PostDetailsScreen from './src/screens/PostDetailsScreen';
import { Image, Platform, StatusBar, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import {COLORS, Fonts} from './src/utils';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {requestNotificationPermission,
  createNotificationChannel,
  scheduleMealNotifications,
  scheduleDailyStepGoalReminder,
  setupNotificationEventHandlers,
  scheduleWalkReminders,
  scheduleWaterReminders} from './notificationService';
import useOrientation from './src/components/OrientationComponent';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { hp, wp } from './src/components/responsive';
import home from './src/images/home.png';
import recipeBook from './src/images/recipeBook.png';
import user from './src/images/user.png';
import chat from './src/images/messenger.png';
import trend from './src/images/trend.png';
import toList from './src/images/toList.png';
import FlashMessage from 'react-native-flash-message';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabStack = () => {
  const { width } = useWindowDimensions();
  const orientation = useOrientation();
  const isPortrait = orientation === 'portrait';
  const insets = useSafeAreaInsets();
  const hideLabel = width < 355;
  return (
    <Tab.Navigator
      initialRouteName="DashboardScreen"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          height: isPortrait ? insets.bottom > 20 ? hp(10) : hp(8.5) : hp(10),
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: Platform.OS == 'ios' ? isPortrait ? 0 : hp(1.5) : 0,
          paddingBottom: Math.max(insets.bottom, hp(1)),
          backgroundColor: COLORS.primary,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -3 }, // IMPORTANT: negative for top shadow
          shadowOpacity: 0.2,
          shadowRadius: 4,
          // ✅ Android Shadow
          elevation: 10,
          borderTopWidth: 0.5,
          borderTopColor: COLORS.backColor,
        },
      }}>
      <Tab.Screen
        name="DashboardScreen"
        component={DashboardScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={[styles.bottomMainView, { width: wp(20) }]}>
              <Image
                style={[
                  isPortrait ? styles.imageView : styles.imageViewLandscape,
                  { tintColor: focused ? COLORS.subPrimary : COLORS.white },
                ]}
                source={home}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="TodoListScreen"
        component={TodoListScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={[styles.bottomMainView, { width: wp(20) }]}>
              <Image
                style={[
                  isPortrait ? styles.imageView : styles.imageViewLandscape,
                  { tintColor: focused ? COLORS.subPrimary : COLORS.white },
                ]}
                source={toList}
              />
            </View>
          ),
        }}
      />
      {/* <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={[styles.bottomMainView, { width: wp(20) }]}>
              <Image
                style={[
                  isPortrait ? styles.imageView : styles.imageViewLandscape,
                  { tintColor: focused ? COLORS.subPrimary : COLORS.white },
                ]}
                source={recipeBook}
              />
            </View>
          ),
        }}
      /> */}
      <Tab.Screen
        name="HistoryScreen"
        component={HistoryScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={[styles.bottomMainView, { width: wp(20) }]}>
              <Image
                style={[
                  isPortrait ? styles.imageView : styles.imageViewLandscape,
                  { tintColor: focused ? COLORS.subPrimary : COLORS.white },
                ]}
                source={chat}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="FoodAnalysis"
        component={FoodAnalysis}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={[styles.bottomMainView, { width: wp(20) }]}>
              <Image
                style={[
                  isPortrait ? styles.imageView : styles.imageViewLandscape,
                  { tintColor: focused ? COLORS.subPrimary : COLORS.white },
                ]}
                source={trend}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="AccountScreen"
        component={AccountScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={[styles.bottomMainView, { width: wp(20) }]}>
              <Image
                style={[
                  isPortrait ? styles.imageView : styles.imageViewLandscape,
                  { tintColor: focused ? COLORS.subPrimary : COLORS.white },
                ]}
                source={user}
              />
            </View>
          ),
        }}
      />
      </Tab.Navigator>
  )
}

const App = () => {
  
  useEffect(() => {
    async function initNotifications() {
      try {
        await requestNotificationPermission();
        await createNotificationChannel();
        await scheduleMealNotifications();
        await scheduleWalkReminders();
        await scheduleWaterReminders();
        await scheduleDailyStepGoalReminder(10000);
        setupNotificationEventHandlers();
      } catch (error) {
        console.warn('Notification setup error', error);
      }
    }
    initNotifications();
  }, []);
  
  return (
    <>
      <StatusBar
        backgroundColor={COLORS.primary}   // Android only
        barStyle="light-content"   // text/icons color
      />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SplashScreen">
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="LoadingScreen"
            component={LoadingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignupScreen"
            component={SignupScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPassword}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ChangePassword"
            component={ChangePassword}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="TabStack"
            component={TabStack}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PhoneVerificationScreen"
            component={PhoneVerificationScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="BasicInfoScreen"
            component={BasicInfoScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="GoalSelection"
            component={GoalSelection}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="DietPreferenceScreen"
            component={DietPreferenceScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ActivityLevelScreen"
            component={ActivityLevelScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="MedicalScreen"
            component={MedicalScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="AIChatScreen"
            component={AIChatScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="AnalysisDetailScreen"
            component={AnalysisDetailScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="EditScreen"
            component={EditScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="RecipeScreen"
            component={RecipeScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SaveRecipeScreen"
            component={SaveRecipeScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SaveRecipeDetailScreen"
            component={SaveRecipeDetailScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="NotificationScreen"
            component={NotificationScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ProgramDetailScreen"
            component={ProgramDetailScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="WorkoutReference"
            component={WorkoutReference}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="MealDetailScreen"
            component={MealDetailScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="DoctorDescription"
            component={DoctorDescription}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="MedicineDetailScreen"
            component={MedicineDetailScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="CreateRecipeScreen"
            component={CreateRecipeScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="AdviserScreen"
            component={AdviserScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="AdviserDetailScreen"
            component={AdviserDetailScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="BMIScreen"
            component={BMIScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ConsultantScreen"
            component={ConsultantScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="CommunityForum"
            component={CommunityForum}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="CreatePostScreen"
            component={CreatePostScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="PostDetailsScreen"
            component={PostDetailsScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
        <FlashMessage position={'top'} />
      </NavigationContainer>
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  imageView: {
    width: wp(7),
    height: hp(4),
    resizeMode: 'contain',
  },
  imageViewLandscape: {
    width: wp(6.5),
    height: hp(3),
    resizeMode: 'contain',
  },
  bottomMainView: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});

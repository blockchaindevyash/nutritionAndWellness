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
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { portraitStyles, landscapeStyles } from './styles';
import useOrientation from '../../components/OrientationComponent';
import logo from '../../images/logo.png';
import useAuthStore from '../../store/authStore';
import { onGetCommonApi, onGetWithoutTokenCommonApi } from '../../services/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

const SplashScreen = ({ navigation }) => {
    const {updateGoalData, updateDietData, updateActivityData, updateMedicalData, updateWorkoutData, updateProfileData, updateWeeklyPlan, updateAdviserList} = useAuthStore();
    const orientation = useOrientation(); // Get current orientation
    const isPortrait = orientation === 'portrait';
    const styles = isPortrait ? portraitStyles : landscapeStyles;
    

    useEffect(() => {
        onGetDataList();
    }, []);

    const getCurrentWeekStart = () => {
        return moment()
            .startOf('isoWeek')
            .format('YYYY-MM-DD');
    };

    const onGetDataList = async () => {
        try {
            // navigation.navigate('TabStack');
            const currentWeekStart = getCurrentWeekStart();
            const accessToken = await AsyncStorage.getItem('accessToken');
            const weekPlan = await AsyncStorage.getItem('weeklyPlan');
            const storedWeekStart = await AsyncStorage.getItem('weeklyPlanStartDate');
            console.log('Access Token:', accessToken);
            const goalRes = await onGetWithoutTokenCommonApi('goals');
            console.log('Goal Response:', goalRes.data.data);
            updateGoalData(goalRes.data.data.items);
            const dietsRes = await onGetWithoutTokenCommonApi('diets');
            updateDietData(dietsRes.data.data.items);
            const activityRes = await onGetWithoutTokenCommonApi('activity-levels');
            updateActivityData(activityRes.data.data.items);
            const medicalRes = await onGetWithoutTokenCommonApi('medical-conditions');
            updateMedicalData(medicalRes.data.data.items);
            const workoutRes = await onGetWithoutTokenCommonApi('workout-references');
            updateWorkoutData(workoutRes.data.data.items);
            if (accessToken != null) {
                if (weekPlan != null) {
                    if (storedWeekStart === currentWeekStart) {
                        console.log('Weekly Plan from AsyncStorage:', JSON.parse(weekPlan));
                        updateWeeklyPlan(JSON.parse(weekPlan));
                    } else {
                        const weeklyPlanRes = await onGetCommonApi('ai/generate-weekly-plan');
                        console.log('Weekly Plan Response:', weeklyPlanRes.data.data);
                        updateWeeklyPlan(weeklyPlanRes.data.data.plan_data);
                        AsyncStorage.setItem('weeklyPlanStartDate', currentWeekStart);
                        AsyncStorage.setItem('weeklyPlan', JSON.stringify(weeklyPlanRes.data.data.plan_data));
                    }
                } else {
                    const weeklyPlanRes = await onGetCommonApi('ai/generate-weekly-plan');
                    console.log('Weekly Plan Response:', weeklyPlanRes.data.data);
                    updateWeeklyPlan(weeklyPlanRes.data.data.plan_data);
                    AsyncStorage.setItem('weeklyPlanStartDate', currentWeekStart);
                    AsyncStorage.setItem('weeklyPlan', JSON.stringify(weeklyPlanRes.data.data.plan_data));
                }
                const profileRes = await onGetCommonApi('user/profile');
                updateProfileData(profileRes.data.data.user);
                const wellnessRes = await onGetCommonApi('ai/wellness-advice');
                updateAdviserList(wellnessRes.data.data.advice_data);
                navigation.navigate('TabStack');
            } else {
                navigation.navigate('LoginScreen');
            }
        } catch (error) {
            console.log('Error:', error.response);
        }
    };
    
    return (
        <View style={styles.safeAreaStyle}>
            <Image style={styles.logoImage} source={logo} />
        </View>
    );
};

export default SplashScreen;
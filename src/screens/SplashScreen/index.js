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

const SplashScreen = ({ navigation }) => {
    const {updateGoalData, updateDietData, updateActivityData, updateMedicalData, updateWorkoutData, updateProfileData} = useAuthStore();
    const orientation = useOrientation(); // Get current orientation
    const isPortrait = orientation === 'portrait';
    const styles = isPortrait ? portraitStyles : landscapeStyles;
    

    useEffect(() => {
        onGetDataList();
    }, []);

    const onGetDataList = async () => {
        try {
            // navigation.navigate('TabStack');
            const accessToken = await AsyncStorage.getItem('accessToken');
            console.log('Access Token:', accessToken);
            const goalRes = await onGetWithoutTokenCommonApi('goals');
            updateGoalData(goalRes.data.data);
            const dietsRes = await onGetWithoutTokenCommonApi('diets');
            updateDietData(dietsRes.data.data);
            const activityRes = await onGetWithoutTokenCommonApi('activity-levels');
            updateActivityData(activityRes.data.data);
            const medicalRes = await onGetWithoutTokenCommonApi('medical-conditions');
            updateMedicalData(medicalRes.data.data);
            const workoutRes = await onGetWithoutTokenCommonApi('workout-references');
            updateWorkoutData(workoutRes.data.data);
            if (accessToken != null) {
                const profileRes = await onGetCommonApi('user/profile');
                updateProfileData(profileRes.data.data);
                navigation.navigate('TabStack');
            } else {
                navigation.navigate('LoginScreen');
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };
    
    return (
        <View style={styles.safeAreaStyle}>
            <Image style={styles.logoImage} source={logo} />
        </View>
    );
};

export default SplashScreen;
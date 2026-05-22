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
import { onGetWithoutTokenCommonApi } from '../../services/Api';

const SplashScreen = ({ navigation }) => {
    const {updateGoalData, updateDietData, updateActivityData, updateMedicalData, updateWorkoutData} = useAuthStore();
    const orientation = useOrientation(); // Get current orientation
    const isPortrait = orientation === 'portrait';
    const styles = isPortrait ? portraitStyles : landscapeStyles;

    useEffect(() => {
        onGetDataList();
    }, []);

    const onGetDataList = async () => {
        try {
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
            navigation.navigate('LoginScreen');
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
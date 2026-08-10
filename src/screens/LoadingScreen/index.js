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

const LoadingScreen = ({ navigation }) => {
    const {updateWeeklyPlan} = useAuthStore();
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
            if (accessToken != null) {
                const weeklyPlanRes = await onGetCommonApi('ai/generate-weekly-plan');
                console.log('Weekly Plan Response:', weeklyPlanRes.data.data);
                updateWeeklyPlan(weeklyPlanRes.data.data.plan_data);
                AsyncStorage.setItem('weeklyPlan', JSON.stringify(weeklyPlanRes.data.data.plan_data));
                navigation.navigate('TabStack');
            }
        } catch (error) {
            console.log('Error:', error.response);
        }
    };
    
    return (
        <View style={styles.safeAreaStyle}>
            <Image style={styles.logoImage} source={require('../../images/loading.gif')} />
        </View>
    );
};

export default LoadingScreen;
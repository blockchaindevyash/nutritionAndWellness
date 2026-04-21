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

const SplashScreen = ({ navigation }) => {
    const orientation = useOrientation(); // Get current orientation
    const isPortrait = orientation === 'portrait';
    const styles = isPortrait ? portraitStyles : landscapeStyles;

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('LoginScreen');
        }, 3000)
    }, []);
    
    return (
        <View style={styles.safeAreaStyle}>
            <Image style={styles.logoImage} source={logo} />
        </View>
    );
};

export default SplashScreen;
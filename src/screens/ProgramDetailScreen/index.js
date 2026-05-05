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
import Header from '../../components/HeaderComponent';

const ProgramDetailScreen = ({ navigation }) => {
    const orientation = useOrientation(); // Get current orientation
    const isPortrait = orientation === 'portrait';
    const styles = isPortrait ? portraitStyles : landscapeStyles;
    
    return (
        <View style={styles.safeAreaStyle}>
            <View style={styles.headerView}>
                <Header title={'Program Detail'} onPress={() => navigation.goBack()} />
            </View>
            <View style={styles.mainView}></View>
        </View>
    );
};

export default ProgramDetailScreen;
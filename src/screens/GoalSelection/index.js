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
    FlatList,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { portraitStyles, landscapeStyles } from './styles';
import useOrientation from '../../components/OrientationComponent';
import { COLORS } from '../../utils';
import Header from '../../components/HeaderComponent';
import { hp } from '../../components/responsive';

const goals = [
    { id: 1, title: 'Weight Loss', icon: '🔥' },
    { id: 2, title: 'Weight Gain', icon: '🍽️' },
    { id: 3, title: 'Build Muscle', icon: '💪' },
    { id: 4, title: 'Stay Fit', icon: '🧘' },
    { id: 5, title: 'Healthy Eating', icon: '🥗' },
    { id: 6, title: 'Boost Energy', icon: '⚡' },
];

const GoalSelection = ({ navigation }) => {
    const orientation = useOrientation(); // Get current orientation
    const isPortrait = orientation === 'portrait';
    const [selectedGoals, setSelectedGoals] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const styles = isPortrait ? portraitStyles : landscapeStyles;

    const toggleGoal = (goal) => {
        if (selectedGoals.includes(goal)) {
            setSelectedGoals(selectedGoals.filter(g => g !== goal));
        } else {
            setSelectedGoals([...selectedGoals, goal]);
        }
    };

    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                onPress={() => toggleGoal(item.title)}
                style={{
                    backgroundColor: selectedGoals.includes(item.title) ? COLORS.greyColor : COLORS.primary,
                    borderWidth: 0,
                    borderColor: '#00BCD4',
                    padding: 15,
                    borderRadius: 5,
                    marginBottom: 10,
                }}
            >
                <Text style={styles.titleText}>{item.icon} {item.title}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.safeAreaStyle}>
            <View style={styles.headerView}>
                <Header title={'Choose Your Goal'} onPress={() => navigation.goBack()} />
            </View>
            <View style={[styles.container, { backgroundColor: COLORS.backColor }]}>
                <Text style={[styles.titleText, { marginBottom: hp(2), lineHeight: hp(3) }]}>Choose one or more goals to get personalized recommendations</Text>
                <View style={{ maxHeight: '70%' }}>
                    <FlatList
                        data={goals}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderItem}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
                <TouchableOpacity
                    style={[styles.buttonView, { opacity: isLoading ? 0.75 : 1 }]}
                    disabled={isLoading}
                    onPress={() => navigation.navigate('DietPreferenceScreen')}>
                    {isLoading ? (
                        <ActivityIndicator size={'large'} color={COLORS.white} />
                    ) : (
                        <Text style={styles.signinText}>Continue</Text>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default GoalSelection;
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
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { showMessage } from 'react-native-flash-message';
import useAuthStore from '../../store/authStore';

const goals = [
    { id: 1, title: 'Weight Loss', icon: '🔥' },
    { id: 2, title: 'Weight Gain', icon: '🍽️' },
    { id: 3, title: 'Build Muscle', icon: '💪' },
    { id: 4, title: 'Stay Fit', icon: '🧘' },
    { id: 5, title: 'Healthy Eating', icon: '🥗' },
    { id: 6, title: 'Boost Energy', icon: '⚡' },
];

const GoalSelection = ({ navigation }) => {
    const {updateSignupData, goalList} = useAuthStore();
    const orientation = useOrientation(); // Get current orientation
    const isPortrait = orientation === 'portrait';
    const insets = useSafeAreaInsets();
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

    const onGoalPress = async () => {
        console.log(selectedGoals);
        if (selectedGoals.length == 0) {
            showMessage({
                message: 'Please select at least one option',
                type: 'danger',
                duration: 4000,
                icon: 'danger',
            });
        } else {
            updateSignupData({
                goal: selectedGoals,
            });
            navigation.navigate('DietPreferenceScreen')
        }
    };

    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                onPress={() => toggleGoal(item.id)}
                style={{
                    backgroundColor: selectedGoals.includes(item.id) ? COLORS.greyColor : COLORS.primary,
                    borderWidth: 0,
                    borderColor: '#00BCD4',
                    padding: 15,
                    borderRadius: 5,
                    marginBottom: 10,
                }}>
                <Text style={styles.titleText}>{item.name}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.safeAreaStyle}>
            <View
                style={{
                    width: '100%',
                    paddingTop: insets.top,
                    backgroundColor: COLORS.primary,
                }}
            />
            <View style={styles.headerView}>
                <Header title={'Choose Your Goal'} onPress={() => navigation.goBack()} />
            </View>
            <View style={[styles.container, { backgroundColor: COLORS.backColor }]}>
                <Text style={[styles.titleText, { marginBottom: hp(2), lineHeight: hp(3) }]}>Choose one or more goals to get personalized recommendations</Text>
                <View style={{ maxHeight: '81%' }}>
                    <FlatList
                        data={goalList}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderItem}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{paddingBottom: hp(8)}}
                    />
                </View>
                <TouchableOpacity
                    style={[styles.buttonView, { opacity: isLoading ? 0.75 : 1 }]}
                    disabled={isLoading}
                    onPress={() => onGoalPress()}>
                    {isLoading ? (
                        <ActivityIndicator size={'large'} color={COLORS.white} />
                    ) : (
                        <Text style={styles.signinText}>Next</Text>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default GoalSelection;
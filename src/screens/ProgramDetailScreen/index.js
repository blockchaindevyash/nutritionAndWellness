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
    Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import { portraitStyles, landscapeStyles } from './styles';
import useOrientation from '../../components/OrientationComponent';
import Header from '../../components/HeaderComponent';
import { COLORS } from '../../utils';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { hp } from '../../components/responsive';
import { onAddCommonJsonApi } from '../../services/Api';

const ProgramDetailScreen = ({ navigation, route }) => {
    const orientation = useOrientation(); // Get current orientation
    const isPortrait = orientation === 'portrait';
    const styles = isPortrait ? portraitStyles : landscapeStyles;
    const insets = useSafeAreaInsets();
    const { t } = useTranslation();

    const { item } = route.params;

    const COMPLETED_EXERCISES_KEY = 'completed-exercises';

    const getTodayKey = () => moment().format('YYYY-MM-DD');

    // Add done state
    // const [exercises, setExercises] = useState(
    //     item.exercises.map((ex, index) => ({
    //         id: index,
    //         name: ex.name,
    //         done: false,
    //     }))
    // );
    const getExerciseMinutes = name => {
        const match = name.match(/(\d+)\s*(min|mins|minute|minutes)\b/i);

        return match ? parseInt(match[1], 10) : 0;
    };

    const [exercises, setExercises] = useState(
        item.exercises.map((ex, index) => ({
            id: index,
            name: ex.name,
            done: ex.is_completed || false,
            isRunning: false,
            remainingSeconds: getExerciseMinutes(ex.name) * 60,
        }))
    );

    useEffect(() => {
        const loadCompleted = async () => {
            try {
                const raw = await AsyncStorage.getItem(COMPLETED_EXERCISES_KEY);
                const parsed = raw ? JSON.parse(raw) : {};
                const dateKey = item.date || `${item.day}`;
                const saved = parsed?.[dateKey] || [];

                if (Array.isArray(saved) && saved.length > 0) {
                    setExercises(prev => prev.map(ex => ({
                        ...ex,
                        done: saved.includes(ex.id),
                    })));
                }
            } catch (err) {
                console.warn('Unable to load completed exercises', err);
            }
        };

        loadCompleted();
    }, [item]);

    useEffect(() => {
        const timer = setInterval(() => {
            setExercises(prev =>
                prev.map(ex => {
                    if (!ex.isRunning || ex.remainingSeconds <= 0) {
                        return ex;
                    }

                    const remaining = ex.remainingSeconds - 1;

                    if (remaining === 0) {
                        return {
                            ...ex,
                            remainingSeconds: 0,
                            isRunning: false,
                            done: true,
                        };
                    }

                    return {
                        ...ex,
                        remainingSeconds: remaining,
                    };
                }),
            );
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const toggleDone = (id) => {
        const dateKey = item.date || getTodayKey();
        if (dateKey !== getTodayKey()) {
            Alert.alert('Read only', 'You can only update exercises for today');
            return;
        }

        const updated = exercises.map(ex =>
            ex.id === id ? { ...ex, done: !ex.done } : ex
        );
        setExercises(updated);
    };

    const saveCompletedForDate = async () => {
        try {
            const dateKey = item.date || `${item.day}`;
            if (dateKey !== getTodayKey()) {
                Alert.alert('Read only', 'You can only save completed exercises for today');
                return;
            }
            const raw = await AsyncStorage.getItem(COMPLETED_EXERCISES_KEY);
            const parsed = raw ? JSON.parse(raw) : {};
            const completedIndices = exercises.filter(e => e.done).map(e => e.id);
            const updated = {
                ...parsed,
                [dateKey]: completedIndices,
            };
            await AsyncStorage.setItem(COMPLETED_EXERCISES_KEY, JSON.stringify(updated));
            console.log('Saved completed exercises for date:', exercises, completedIndices);
            for (const exercise_index of completedIndices) {
                let rawData = JSON.stringify({
                    date: item.date,
                    exercise_index,
                    is_exercise_completed: true,
                });
                console.log("Exercise progress:", rawData);

                const responseData = await onAddCommonJsonApi(
                    "plan/track-progress",
                    rawData
                );

                console.log("Response:", responseData?.data);
            }
        } catch (err) {
            console.warn('Unable to save completed exercises', err);
        }
    };

    const toggleExerciseTimer = id => {
        const dateKey = item.date || getTodayKey();

        if (dateKey !== getTodayKey()) {
            Alert.alert(
                'Read only',
                'You can only update exercises for today',
            );
            return;
        }

        setExercises(prev =>
            prev.map(ex =>
                ex.id === id
                    ? {
                        ...ex,
                        isRunning: !ex.isRunning,
                    }
                    : ex,
            ),
        );
    };

    const formatTime = seconds => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;

        return `${minutes.toString().padStart(2, '0')}:${secs
            .toString()
            .padStart(2, '0')}`;
    };

    const getProgress = () => {
        const done = exercises.filter(e => e.done).length;
        return `${done}/${exercises.length}`;
    };

    // const renderItem = ({ item }) => {
    //     return (
    //         <TouchableOpacity
    //             style={[styles.card, item.done]}
    //             onPress={() => toggleDone(item.id)}>
    //             <Text style={[styles.exerciseText, item.done && styles.doneText]}>
    //                 {item.name}
    //             </Text>
    //             <Text style={{color: COLORS.white}}>{item.done ? "✅" : "⬜"}</Text>
    //         </TouchableOpacity>
    //     );
    // };

    const renderItem = ({item}) => {
    const exerciseMinutes = getExerciseMinutes(item.name);
    const hasTimer = exerciseMinutes > 0;

    return (
        <View style={styles.card}>
            <View style={styles.exerciseContent}>
                <Text
                    style={[
                        styles.exerciseText,
                        item.done && styles.doneText,
                    ]}>
                    {item.name}
                </Text>

                {hasTimer ? (
                    <TouchableOpacity
                        style={styles.timerButton}
                        onPress={() =>
                            toggleExerciseTimer(item.id)
                        }>
                        <Text style={styles.timerButtonText}>
                            {item.isRunning ? 'Pause' : 'Start'}
                        </Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        onPress={() => toggleDone(item.id)}>
                        <Text style={styles.checkbox}>
                            {item.done ? '✅' : '⬜'}
                        </Text>
                    </TouchableOpacity>
                )}
            </View>

            {/* Timer */}
            {hasTimer && item.isRunning && (
                <View style={styles.timerContainer}>
                    <Text style={styles.timerText}>
                        {formatTime(item.remainingSeconds)}
                    </Text>
                </View>
            )}

            {/* Completed timer */}
            {hasTimer &&
                item.done &&
                item.remainingSeconds === 0 && (
                    <View style={styles.completedContainer}>
                        <Text style={styles.completedText}>
                            ✓ Exercise completed
                        </Text>
                    </View>
                )}
        </View>
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
                <Header title={`${item.day} ${t('workout')}`} onPress={() => navigation.goBack()} />
            </View>
            <View style={styles.mainView}>
                <Text style={styles.subtitle}>
                    Progress: {getProgress()}
                </Text>
                {/* Exercise List */}
                <FlatList
                    data={exercises}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{paddingBottom: hp(10)}}
                />

                {/* Bottom Buttons */}
                <View style={[styles.footer, {marginBottom: insets.bottom + 30}]}> 
                    <TouchableOpacity style={styles.completeBtn} onPress={async () => { await saveCompletedForDate(); navigation.goBack(); }}>
                        <Text style={styles.buttonText}>{t('complete_workout')}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default ProgramDetailScreen;
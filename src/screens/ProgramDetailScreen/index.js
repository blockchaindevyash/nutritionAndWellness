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
    const [exercises, setExercises] = useState(
        item.exercises.map((ex, index) => ({
            id: index,
            name: ex.name,
            done: false,
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

    const getProgress = () => {
        const done = exercises.filter(e => e.done).length;
        return `${done}/${exercises.length}`;
    };

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                style={[styles.card, item.done]}
                onPress={() => toggleDone(item.id)}>
                <Text style={[styles.exerciseText, item.done && styles.doneText]}>
                    {item.name}
                </Text>
                <Text style={{color: COLORS.white}}>{item.done ? "✅" : "⬜"}</Text>
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
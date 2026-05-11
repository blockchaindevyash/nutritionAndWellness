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
import Header from '../../components/HeaderComponent';
import { COLORS } from '../../utils';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ProgramDetailScreen = ({ navigation, route }) => {
    const orientation = useOrientation(); // Get current orientation
    const isPortrait = orientation === 'portrait';
    const styles = isPortrait ? portraitStyles : landscapeStyles;
    const insets = useSafeAreaInsets();

    const { item } = route.params;

    // Add done state
    const [exercises, setExercises] = useState(
        item.exercises.map((ex, index) => ({
            id: index,
            name: ex,
            done: false,
        }))
    );

    const toggleDone = (id) => {
        const updated = exercises.map(ex =>
            ex.id === id ? { ...ex, done: !ex.done } : ex
        );
        setExercises(updated);
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
                <Header title={`${item.day} Workout`} onPress={() => navigation.goBack()} />
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
                />

                {/* Bottom Buttons */}
                <View style={[styles.footer, {marginBottom: insets.bottom + 30}]}>
                    <TouchableOpacity style={styles.completeBtn} onPress={() => navigation.goBack()}>
                        <Text style={styles.buttonText}>Complete Workout</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default ProgramDetailScreen;
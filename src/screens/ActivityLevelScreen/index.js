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

const activityOptions = [
  {
    id: 1,
    title: 'Sedentary',
    icon: '😴',
    desc: 'Little or no exercise',
  },
  {
    id: 2,
    title: 'Lightly Active',
    icon: '🚶',
    desc: '1–2 days/week',
  },
  {
    id: 3,
    title: 'Moderately Active',
    icon: '🏃',
    desc: '3–5 days/week',
  },
  {
    id: 4,
    title: 'Very Active',
    icon: '🔥',
    desc: '6–7 days/week',
  },
];

const ActivityLevelScreen = ({ navigation }) => {
    const orientation = useOrientation(); // Get current orientation
    const isPortrait = orientation === 'portrait';
    const insets = useSafeAreaInsets();
    const [selectedLevel, setSelectedLevel] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const styles = isPortrait ? portraitStyles : landscapeStyles;

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
                    <Header title={'Activity Level'} onPress={() => navigation.goBack()}/>
                </View>
                <View style={[styles.container, {backgroundColor: COLORS.backColor}]}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Text style={styles.subtitle}>How active are you daily?</Text>
                        {activityOptions.map((item) => (
                            <TouchableOpacity
                                key={item.id}
                                style={[
                                styles.card,
                                selectedLevel === item.title && styles.selectedCard,
                                ]}
                                onPress={() => setSelectedLevel(item.title)}>
                                <Text style={styles.cardTitle}>
                                {item.icon} {item.title}
                                </Text>
                                <Text style={styles.cardDesc}>{item.desc}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                <TouchableOpacity
                    style={[styles.buttonView, { opacity: isLoading ? 0.75 : 1 }]}
                    disabled={isLoading}
                    onPress={() => navigation.navigate('MedicalScreen')}>
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

export default ActivityLevelScreen;
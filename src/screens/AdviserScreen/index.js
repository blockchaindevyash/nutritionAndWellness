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

const wellnessData = [
  {
    id: 1,
    type: "meal",
    title: "Meal Advice",
    icon: "🥗",
    color: ["#ff9966", "#ff5e62"],

    description:
      "Personalized meal guidance for healthy weight management and better metabolism.",

    recommendations: [
      "Eat high-fiber breakfast daily",
      "Add protein in every meal",
      "Eat seasonal vegetables",
      "Prefer home-cooked food",
    ],

    avoid: [
      "Processed sugar",
      "Deep fried food",
      "Late night meals",
      "Cold drinks with meals",
    ],

    schedule: [
      {
        time: "8:00 AM",
        title: "Healthy Breakfast",
        desc: "Oats + milk + almonds + apple",
      },
      {
        time: "1:00 PM",
        title: "Balanced Lunch",
        desc: "Chapati + dal + sabji + salad",
      },
      {
        time: "8:00 PM",
        title: "Light Dinner",
        desc: "Soup + paneer + vegetables",
      },
    ],

    goal: "1500 Calories Daily",
  },
  {
    id: 2,
    type: "drink",
    title: "Drink Advice",
    icon: "🥤",
    color: ["#36D1DC", "#5B86E5"],

    description:
      "Hydration and healthy drink recommendations to improve digestion and energy.",

    recommendations: [
      "Drink 3L water daily",
      "Take green tea after lunch",
      "Drink coconut water twice weekly",
      "Start day with warm water",
    ],

    avoid: [
      "Soft drinks",
      "Energy drinks",
      "Extra sugar beverages",
      "Excess caffeine",
    ],

    schedule: [
      {
        time: "7:00 AM",
        title: "Warm Water",
        desc: "1 glass warm water with lemon",
      },
      {
        time: "11:00 AM",
        title: "Hydration Break",
        desc: "Drink 500ml water",
      },
      {
        time: "4:00 PM",
        title: "Green Tea",
        desc: "Green tea without sugar",
      },
    ],

    goal: "3 Liters Water Daily",
  },
  {
    id: 3,
    type: "supplement",
    title: "Supplement & Vitamin",
    icon: "💊",
    color: ["#7F00FF", "#E100FF"],

    description:
      "Daily supplement guidance to improve immunity, bone health, and energy.",

    recommendations: [
      "Take multivitamin after breakfast",
      "Take Omega 3 after dinner",
      "Vitamin D once daily",
      "Calcium before sleep",
    ],

    avoid: [
      "Taking supplements on empty stomach",
      "Overdose vitamins",
      "Skipping water intake",
      "Mixing medicines without advice",
    ],

    schedule: [
      {
        time: "9:00 AM",
        title: "Multivitamin",
        desc: "1 tablet after breakfast",
      },
      {
        time: "2:00 PM",
        title: "Vitamin D",
        desc: "After lunch",
      },
      {
        time: "9:00 PM",
        title: "Calcium",
        desc: "Before bedtime",
      },
    ],

    goal: "Daily Supplement Routine",
  },
  {
    id: 4,
    type: "exercise",
    title: "Exercise Advice",
    icon: "🏋️",
    color: ["#11998e", "#38ef7d"],

    description:
      "Exercise guidance to improve fitness, stamina, and weight control.",

    recommendations: [
      "Walk 30 min daily",
      "Stretch every morning",
      "Strength workout 3x/week",
      "Practice breathing exercises",
    ],

    avoid: [
      "Overtraining",
      "Skipping warm-up",
      "Heavy workout after meals",
      "Poor posture exercise",
    ],

    schedule: [
      {
        time: "7:00 AM",
        title: "Morning Walk",
        desc: "30 minutes brisk walking",
      },
      {
        time: "5:00 PM",
        title: "Strength Training",
        desc: "Squats + Push-ups + Core",
      },
      {
        time: "9:00 PM",
        title: "Stretching",
        desc: "Light body stretching",
      },
    ],

    goal: "45 Min Daily Activity",
  },
  {
    id: 5,
    type: "sleep",
    title: "Sleep & Snore Advice",
    icon: "😴",
    color: ["#654ea3", "#eaafc8"],

    description:
      "Sleep improvement tips for better recovery, energy, and snoring reduction.",

    recommendations: [
      "Sleep before 11 PM",
      "Use side sleeping position",
      "Maintain dark room",
      "Meditate before sleep",
    ],

    avoid: [
      "Screen time before sleep",
      "Heavy dinner late night",
      "Caffeine after evening",
      "Irregular sleep timing",
    ],

    schedule: [
      {
        time: "8:00 PM",
        title: "Light Dinner",
        desc: "Eat low-oil dinner",
      },
      {
        time: "10:00 PM",
        title: "Relaxation",
        desc: "Meditation & breathing exercise",
      },
      {
        time: "10:30 PM",
        title: "Sleep Time",
        desc: "Proper dark & quiet room",
      },
    ],

    goal: "7-8 Hours Sleep",
  },
];

const AdviserScreen = ({ navigation }) => {
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
                <Header title={'Wellness Adviser'} onPress={() => navigation.goBack()} />
            </View>
            <View style={[styles.container, { backgroundColor: COLORS.backColor }]}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: hp(10)}}>
                    <Text style={styles.subtitle}>Personalized health guidance based on your lifestyle, medical conditions, diet, and fitness goals.</Text>
                    {wellnessData.map((item) => (
                        <View key={item.id} style={styles.card}>
                            <View style={styles.topRow}>
                                <View style={styles.iconContainer}>
                                    <Text style={styles.icon}>
                                        {item.icon}
                                    </Text>
                                </View>
                                <TouchableOpacity style={styles.viewButton} onPress={() =>
    navigation.navigate(
      "AdviserDetailScreen",
      { details: item }
    )
  }>
                                    <Text style={styles.viewButtonText}>
                                        View Details
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            {/* Title */}
                            <Text style={styles.cardTitle}>
                                {item.title}
                            </Text>
                            {/* Tips */}
                            <View style={styles.tipsContainer}>
                                {item.recommendations.map((tip, index) => (
                                    <View key={index} style={styles.tipRow}>
                                        <View style={styles.dot} />
                                        <Text style={styles.tipText}>{tip}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </View>
        </View>
    );
};

export default AdviserScreen;
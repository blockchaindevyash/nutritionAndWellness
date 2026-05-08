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
import { hp } from '../../components/responsive';
import dish1 from '../../images/dish1.jpg';
import dish2 from '../../images/dish2.png';
import dish3 from '../../images/dish3.jpg';
import dish4 from '../../images/dish4.jpg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../../utils';
import { LineChart } from "react-native-gifted-charts"

const weeklyPlan = [
  {
    date: "2026-05-04",
    day: "Monday",
    calories: 1500,
    meals: {
      breakfast: "Oats + milk + almonds + apple",
      lunch: "2 chapati + lauki sabji + moong dal + salad",
      dinner: "Vegetable soup + paneer (low oil)",
    },
    exercises: [
      "Walking 20 min",
      "Push-ups 3x10",
      "Squats 3x15",
      "Plank 30 sec x3",
    ],
  },
  {
    date: "2026-05-05",
    day: "Tuesday",
    calories: 1500,
    meals: {
      breakfast: "Poha (no onion) + peanuts + green tea",
      lunch: "Brown rice + rajma (no onion/garlic) + salad",
      dinner: "2 chapati + tori sabji",
    },
    exercises: [
      "Walking 25 min",
      "Jumping jacks 3x20",
      "Lunges 3x12",
    ],
  },
  {
    date: "2026-05-06",
    day: "Wednesday",
    calories: 1450,
    meals: {
      breakfast: "Vegetable upma + fruit",
      lunch: "2 chapati + chole (no onion/garlic) + curd",
      dinner: "Moong dal khichdi",
    },
    exercises: [
      "Yoga 20 min",
      "Stretching",
      "Core workout",
    ],
  },
  {
    date: "2026-05-07",
    day: "Thursday",
    calories: 1500,
    meals: {
      breakfast: "Banana smoothie (milk + peanut butter)",
      lunch: "Quinoa + dal + mix veg",
      dinner: "Paneer salad bowl",
    },
    exercises: [
      "Walking 30 min",
      "Squats 3x15",
      "Push-ups 3x10",
    ],
  },
  {
    date: "2026-05-08",
    day: "Friday",
    calories: 1500,
    meals: {
      breakfast: "Besan chilla + chutney",
      lunch: "2 chapati + mix veg + dal",
      dinner: "Soup + sprouts salad",
    },
    exercises: [
      "HIIT 15 min",
      "Plank + abs workout",
    ],
  },
  {
    date: "2026-05-09",
    day: "Saturday",
    calories: 1550,
    meals: {
      breakfast: "Idli + sambar (no onion)",
      lunch: "Veg pulao + raita",
      dinner: "Light sabji + 1 chapati",
    },
    exercises: [
      "Walking 40 min",
      "Outdoor activity",
    ],
  },
  {
    date: "2026-05-10",
    day: "Sunday",
    calories: 1400,
    meals: {
      breakfast: "Fruit bowl + nuts",
      lunch: "Light home food (controlled portion)",
      dinner: "Vegetable soup",
    },
    exercises: [
      "Light walk",
      "Stretching",
    ],
  },
];

const lineData = [
  { value: 0, dataPointText: '0' },
  { value: 20, dataPointText: '20' },
  { value: 18, dataPointText: '18' },
  { value: 40, dataPointText: '40' },
  { value: 36, dataPointText: '36' },
  { value: 60, dataPointText: '60' },
  { value: 54, dataPointText: '54' },
  { value: 50, dataPointText: '50' }
];

const areaData = [
  { id: 1, name: 'Glutes' },
  { id: 2, name: 'Abs' },
  { id: 3, name: 'Legs' },
]

const DashboardScreen = ({ navigation }) => {
  const orientation = useOrientation();
  const isPortrait = orientation === 'portrait';
  const styles = isPortrait ? portraitStyles : landscapeStyles;
  const insets = useSafeAreaInsets();
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const today = new Date();
    setSelectedDate({
      day: today.toLocaleDateString('en-US', { weekday: 'short' }),
      date: today.toISOString().split('T')[0],
    });
  }, []);

  const getCurrentWeek = () => {
    const today = new Date();

    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() + 1);
    console.log('Start of week:', JSON.stringify(today.toISOString().split('T')[0]));
    
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(startOfWeek);
      d.setDate(startOfWeek.getDate() + i);
      return {
        day: d.toLocaleDateString('en-US', { weekday: 'short' }),
        date: d.toISOString().split('T')[0],
      };
    });
  };

  const weekDays = getCurrentWeek();

  return (
    <View style={styles.safeAreaStyle}>
      <View
        style={{
          width: '100%',
          paddingTop: insets.top,
          backgroundColor: COLORS.primary,
        }}
      />
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: hp(8) }} showsVerticalScrollIndicator={false}>
        <Text style={styles.greeting}>👋 Good Morning, Yash</Text>
        <Text style={styles.subText}>You're doing great today!</Text>
        {/* Week Header */}
        <View style={styles.header}>
          {weekDays.map((d, i) => (
            <TouchableOpacity 
              key={i} 
              style={[styles.dayBox, {backgroundColor: selectedDate?.date === d.date ? COLORS.textColor : COLORS.primary}]} 
              onPress={() => {
                setSelectedDate(d);
                console.log('OnPress', d, i);
              }}>
              <Text style={styles.dayFont}>{d.day}</Text>
              <Text style={styles.dateFont}>{d.date.split("-")[2]}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {weeklyPlan.map((item, index) => {
          return item.date === selectedDate?.date ? (
            <View>
              <View style={styles.card}>
                <Text style={styles.date}>
                  {item.day} - {item.date}
                </Text>
                {/* Calories */}
                <Text style={styles.calories}>
                  🔥 {item.calories} kcal
                </Text>
              </View>
              {/* Meals */}
              <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('MealDetailScreen', {item: item})}>
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Breakfast</Text>
                  <Text style={styles.foodText}>{`${item.meals.breakfast}\n`}</Text>
                  <Text style={styles.sectionTitle}>Lunch</Text>
                  <Text style={styles.foodText}>{`${item.meals.lunch}\n`}</Text>
                  <Text style={styles.sectionTitle}>Dinner</Text>
                  <Text style={styles.foodText}>{`${item.meals.dinner}\n`}</Text>
                </View>
              </TouchableOpacity>
              {/* Exercises */}
              <View style={styles.card}>
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Workout</Text>
                  {item.exercises.map((ex, index) => (
                    <Text key={index} style={styles.exerciseText}>• {ex}</Text>
                  ))}
                  <TouchableOpacity style={styles.workoutButton} onPress={() => navigation.navigate('ProgramDetailScreen', {item: item})}>
                    <Text style={styles.startText}>Start Workout</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ) : null
        })}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>🔥  Calories burned</Text>
          <LineChart
            initialSpacing={0}
            data={lineData}
            spacing={39}
            textColor1={COLORS.white}
            textShiftY={-8}
            textShiftX={-10}
            textFontSize={13}
            thickness={5}
            hideRules
            hideYAxisText
            yAxisColor={COLORS.subPrimary}
            showVerticalLines
            verticalLinesColor="rgba(14,164,164,0.5)"
            xAxisColor={COLORS.subPrimary}
            color={COLORS.subPrimary}
            dataPointColor={COLORS.white}
          />
        </View>
        {/* <View style={styles.progremView}>
          <Text style={styles.cardTitle}>💪 Target Muscle Area</Text>
        </View> */}
        {/* <FlatList
          data={areaData}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.dishCard} onPress={() => { }}>
              <Text style={styles.cardTitle}>{item.name}</Text>
            </TouchableOpacity>
          )}
        /> */}
      </ScrollView>
    </View>
  );
};

export default DashboardScreen;
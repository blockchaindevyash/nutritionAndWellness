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

const dishArray = [
  { id: 1, image: dish1, name: 'Oats with Fruits' },
  { id: 2, image: dish2, name: 'Grilled Chicken Salad' },
  { id: 3, image: dish3, name: 'Pasta with Veggies' },
  { id: 4, image: dish4, name: 'Avocado Toast' },
];

const lineData = [
  {value: 0, dataPointText: '0'},
  {value: 20, dataPointText: '20'},
  {value: 18, dataPointText: '18'},
  {value: 40, dataPointText: '40'},
  {value: 36, dataPointText: '36'},
  {value: 60, dataPointText: '60'},
  {value: 54, dataPointText: '54'},
  {value: 85, dataPointText: '85'}
];

const DashboardScreen = ({ navigation }) => {
  const orientation = useOrientation();
  const isPortrait = orientation === 'portrait';
  const styles = isPortrait ? portraitStyles : landscapeStyles;
  const insets = useSafeAreaInsets();
  const [water, setWater] = useState(2); // current glasses
  const maxWater = 8;

  const handleAddWater = () => {
    if (water < maxWater) {
      setWater(water + 1);
    }
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
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: hp(8) }} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Text style={styles.greeting}>👋 Good Morning, Yash</Text>
        <Text style={styles.subText}>You're doing great today!</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>🔥  Calories burned</Text>
          
          <LineChart
            initialSpacing={0}
            data={lineData}
            spacing={36}
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

        <View style={styles.card}>
          <Text style={styles.cardTitle}>🍎  Food Summary</Text>
          <Text style={styles.foodStyle}>Breakfast: Oats + Milk</Text>
          <Text style={styles.foodStyle}>Lunch: Salad + Roti</Text>
          <Text style={styles.foodStyle}>Dinner: Not logged</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>💧  Water Intake</Text>
          <Text style={styles.bigText}>{water} / {maxWater} glasses</Text>

          <TouchableOpacity style={styles.button} onPress={handleAddWater}>
            <Text style={styles.buttonText}>+ Add Water</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>🏃 Workout</Text>
          <Text style={styles.foodStyle}>20 min Cardio</Text>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Start Workout</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.tipCard}>
          <Text style={styles.tipText}>
            💡 Drink more water today to stay energized
          </Text>
        </View>

      </ScrollView>
    </View>
  );
};

export default DashboardScreen;
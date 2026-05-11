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

const dishArray = [
    {id: 1, image: dish1, name: 'Oats with Fruits'},
    {id: 2, image: dish2, name: 'Grilled Chicken Salad'},
    {id: 3, image: dish3, name: 'Pasta with Veggies'},
    {id: 4, image: dish4, name: 'Avocado Toast'},
];

const HomeScreen = ({navigation}) => {
    const orientation = useOrientation();
    const isPortrait = orientation === 'portrait';
    const styles = isPortrait ? portraitStyles : landscapeStyles;
    const insets = useSafeAreaInsets();
    const [water, setWater] = useState(2); // current glasses
    const maxWater = 8;
  

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
        <Text style={styles.callLogText}>
          Food Recipes
        </Text>
      </View>
      <View style={{height: '92%', backgroundColor: COLORS.backColor, padding: 16}}>
        <FlatList
          data={dishArray}
          numColumns={2}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.dishCard} onPress={() => navigation.navigate('RecipeScreen', {item: item})}>
              <Image source={item.image} style={styles.dishImage} />
              <Text style={styles.cardTitle}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
      {/* <View style={styles.card}>
        <Text style={styles.cardTitle}>🔥 Daily Calories</Text>
        <Text style={styles.bigText}>850 / 1850 kcal</Text>

        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '70%' }]} />
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>🍎 Food Summary</Text>
        <Text style={styles.foodStyle}>Breakfast: Oats + Milk</Text>
        <Text style={styles.foodStyle}>Lunch: Salad + Roti</Text>
        <Text style={styles.foodStyle}>Dinner: Not logged</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>💧 Water Intake</Text>
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
      </View> */}
    </View>
  );
};

export default HomeScreen;
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
import React, { useCallback, useEffect, useState } from 'react';
import { portraitStyles, landscapeStyles } from './styles';
import useOrientation from '../../components/OrientationComponent';
import { hp } from '../../components/responsive';
import dish1 from '../../images/dish1.jpg';
import dish2 from '../../images/dish2.png';
import dish3 from '../../images/dish3.jpg';
import dish4 from '../../images/dish4.jpg';
import plus from '../../images/plus.png';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../../utils';
import { onGetCommonApi } from '../../services/Api';
import { useFocusEffect } from '@react-navigation/native';

const dishArray = [
  {
    id: 1, image: dish1, name: 'Oats with Fruits', recipeType: "Healthy Breakfast",
    prepTime: "20 min",
    calories: "350 kcal",
    ingredients: "1 cup oats\n1 cup milk\nAlmonds\nCarrot\nBroccoli\nSalt & pepper",
    steps: "Boil oats for 5 minutes\nAdd vegetables and cook\nMix milk and spices\nServe hot with almonds",
  },
  {
    id: 2, image: dish2, name: 'Grilled Chicken Salad', recipeType: "Healthy Breakfast",
    prepTime: "20 min",
    calories: "350 kcal",
    ingredients: "1 cup oats\n1 cup milk\nAlmonds\nCarrot\nBroccoli\nSalt & pepper",
    steps: "Boil oats for 5 minutes\nAdd vegetables and cook\nMix milk and spices\nServe hot with almonds",
  },
  {
    id: 3, image: dish3, name: 'Pasta with Veggies', recipeType: "Healthy Breakfast",
    prepTime: "20 min",
    calories: "350 kcal",
    ingredients: "1 cup oats\n1 cup milk\nAlmonds\nCarrot\nBroccoli\nSalt & pepper",
    steps: "Boil oats for 5 minutes\nAdd vegetables and cook\nMix milk and spices\nServe hot with almonds",
  },
  {
    id: 4, image: dish4, name: 'Avocado Toast', recipeType: "Healthy Breakfast",
    prepTime: "20 min",
    calories: "350 kcal",
    ingredients: "1 cup oats\n1 cup milk\nAlmonds\nCarrot\nBroccoli\nSalt & pepper",
    steps: "Boil oats for 5 minutes\nAdd vegetables and cook\nMix milk and spices\nServe hot with almonds",
  },
];

const HomeScreen = ({ navigation }) => {
  const orientation = useOrientation();
  const isPortrait = orientation === 'portrait';
  const styles = isPortrait ? portraitStyles : landscapeStyles;
  const insets = useSafeAreaInsets();
  const [recipeList, setRecipeList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      onGetRecipeData();
    }, [])
  );

  const onGetRecipeData = async () => {
    try {
      setIsLoading(true);
      const respose = await onGetCommonApi('recipes?per_page=100');
      if (respose.data.status) {
        setRecipeList(respose.data.data.data);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.log('Error fetching recipe data:', error);
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
      <View style={styles.headerView}>
        <Text style={styles.callLogText}>
          Food Recipes
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('CreateRecipeScreen')}>
          <Image source={plus} style={styles.addImage} />
        </TouchableOpacity>
      </View>
      <View style={{height: '92%', backgroundColor: COLORS.backColor, padding: 16}}>
        <FlatList
          data={recipeList}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={() => (
            <View key={0} style={styles.ListEmptyView}>
              {isLoading ? (
                <ActivityIndicator size={'large'} color={COLORS.subPrimary} />
              ) : (
                <Text style={styles.emptyText}>
                  {'No record found'}
                </Text>
              )}
            </View>
          )}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.dishCard} onPress={() => navigation.navigate('RecipeScreen', {item: item})}>
              <Image source={{uri: item.recipe_image_url}} style={styles.dishImage} />
              <Text style={styles.cardTitle}>{item.recipe_name}</Text>
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
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
import { useTranslation } from 'react-i18next';
import { portraitStyles, landscapeStyles } from './styles';
import useOrientation from '../../components/OrientationComponent';
import { hp } from '../../components/responsive';
import backArrow from '../../images/backArrow.png';
import plus from '../../images/plus.png';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../../utils';
import { onGetCommonApi } from '../../services/Api';
import { useFocusEffect } from '@react-navigation/native';
import Header from '../../components/HeaderComponent';

const SaveRecipeScreen = ({ navigation }) => {
  const orientation = useOrientation();
  const isPortrait = orientation === 'portrait';
  const styles = isPortrait ? portraitStyles : landscapeStyles;
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
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
      const respose = await onGetCommonApi('user/recipes');
      if (respose.data.status) {
        setRecipeList(respose.data.data.recipes);
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
        <View style={styles.headerRowView}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image style={styles.backIcon} source={backArrow} />
          </TouchableOpacity>
          <Text style={[styles.titleHeader, { color: COLORS.white }]}>{t('recipe')}</Text>
        </View>
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
                  {t('no_record_found')}
                </Text>
              )}
            </View>
          )}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.dishCard} onPress={() => navigation.navigate('SaveRecipeDetailScreen', {item: item})}>
              <Image source={{uri: item.recipe_image}} style={styles.dishImage} />
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

export default SaveRecipeScreen;
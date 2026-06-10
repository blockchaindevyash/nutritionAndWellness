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
import { portraitStyles, landscapeStyles } from './styles';
import useOrientation from '../../components/OrientationComponent';
import { hp, wp } from '../../components/responsive';
import backArrow from '../../images/backArrow.png';
import deleteIcon from '../../images/delete.png';
import editing from '../../images/editing.png';
import Header from '../../components/HeaderComponent';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../../utils';
import { onDeleteCommonApi } from '../../services/Api';
import { showMessage } from 'react-native-flash-message';

const RecipeScreen = ({ navigation, route }) => {
  const {item} = route.params;
  const orientation = useOrientation();
  const isPortrait = orientation === 'portrait';
  const styles = isPortrait ? portraitStyles : landscapeStyles;
  const insets = useSafeAreaInsets();
  const [isLoading, setIsLoading] = useState(false);

  const onDeleteRecipeData = async () => {
    Alert.alert(
      'Delete Recipe',
      'Are you sure you want to delete this recipe?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              setIsLoading(true);
              const response = await onDeleteCommonApi(`recipes/${item?.id}`);

              if (response.data.status) {
                setIsLoading(false);
                showMessage({
                  message: 'Recipe deleted successfully',
                  type: 'success',
                  duration: 4000,
                  icon: 'success'
                });
                navigation.goBack();
              } else {
                setIsLoading(false);
                showMessage({
                  message: 'Failed to delete recipe. Please try again.',
                  type: 'danger',
                  duration: 4000,
                  icon: 'danger'
                });
              }
            } catch (err) {
              console.log('onDeleteRecipeData Error:', err);
              setIsLoading(false);
              showMessage({
                message: err?.response?.data?.message || 'Something went wrong. Please try again.',
                type: 'danger',
                duration: 4000,
                icon: 'danger'
              });
            }
          }
        },
      ],
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
        {/* <Header title={'Recipe'} onPress={() => navigation.goBack()} /> */}
        <View style={styles.headerRowView}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image style={styles.backIcon} source={backArrow} />
          </TouchableOpacity>
          <Text style={[styles.titleHeader, { color: COLORS.white }]}>Recipe</Text>
        </View>
        <View style={styles.headerRowView}>
          <TouchableOpacity style={{marginRight: wp(4)}} onPress={() => navigation.navigate('CreateRecipeScreen', { item: item })}>
            <Image style={styles.backIcon} source={editing} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onDeleteRecipeData()}>
            <Image style={styles.backIcon} source={deleteIcon} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.mainView}>
        <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: hp(8)}} showsVerticalScrollIndicator={false}>
          <Image style={styles.fullImageStyle} source={{uri: item?.recipe_image_url}} />
          <View style={styles.infoView}>
            <View style={styles.topBadge}>
              <Text style={styles.badgeText}>
                {item?.recipe_type}
              </Text>
            </View>
            <View style={styles.headerRowView}>
              <Text style={styles.dishTitle}>{item?.recipe_name}</Text>
            </View>
            <View style={styles.infoRow}>
              <View style={styles.infoCard}>
                <Text style={styles.infoLabel}>
                  Preparation Time
                </Text>
                <Text style={styles.infoValue}>
                  {item?.prep_time}
                </Text>
              </View>
              <View style={styles.infoCard}>
                <Text style={styles.infoLabel}>
                  Calories
                </Text>
                <Text style={styles.infoValue}>
                  {item?.calories}
                </Text>
              </View>
            </View>
            <Text style={styles.titleText}>Ingredients</Text>
            <Text style={styles.descriptionText}>{item?.ingredients}</Text>
            <Text style={styles.titleText}>Cooking Steps</Text>
            <Text style={styles.descriptionText}>{item?.cooking_steps}</Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default RecipeScreen;
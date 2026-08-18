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
  Modal,
  KeyboardAvoidingView,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { portraitStyles, landscapeStyles } from './styles';
import useOrientation from '../../components/OrientationComponent';
import { hp, wp } from '../../components/responsive';
import backArrow from '../../images/backArrow.png';
import deleteIcon from '../../images/delete.png';
import editing from '../../images/editing.png';
import save from '../../images/save.png';
import Header from '../../components/HeaderComponent';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../../utils';
import { onAddCommonJsonApi, onDeleteCommonApi, onGetCommonApi } from '../../services/Api';
import { showMessage } from 'react-native-flash-message';
import { useFocusEffect } from '@react-navigation/native';

const SaveRecipeDetailScreen = ({ navigation, route }) => {
  const {item} = route.params;
  const orientation = useOrientation();
  const isPortrait = orientation === 'portrait';
  const styles = isPortrait ? portraitStyles : landscapeStyles;
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [recipeData, setRecipeData] = useState(null);
  const [likesCount, setLikesCount] = useState(item?.likes_count || 0);
  const [isLiked, setIsLiked] = useState(item?.is_liked_by_me || false);
  const [reviews, setReviews] = useState(item?.reviews || []);

  useFocusEffect(
    useCallback(() => {
      onGetRecipeData();
    }, [])
  );

  const onGetRecipeData = async () => {
    try {
      const respose = await onGetCommonApi(`recipes/${item?.id}`);
      if (respose.data.status) {
        setRecipeData(respose.data.data.recipe);
        setLikesCount(respose.data.data.recipe?.likes_count || 0);
        setIsLiked(respose.data.data.recipe?.is_liked_by_me || false);
        setReviews(respose.data.data.recipe?.reviews || []);
      }
    } catch (error) {
      setRecipeData(item);
      console.log('Error fetching recipe data:', error);
    }
  };

  const onDeleteRecipeData = async () => {
    Alert.alert(
      t('delete_recipe'),
      t('are_you_sure_you_want_to_delete_this_recipe'),
      [
        { text: t('cancel'), style: 'cancel' },
        {
          text: t('delete'),
          style: 'destructive',
          onPress: async () => {
            try {
              setIsLoading(true);
              const response = await onDeleteCommonApi(`user/recipes/${item?.id}`);

              if (response.data.status) {
                setIsLoading(false);
                showMessage({
                  message: t('recipe_deleted_successfully'),
                  type: 'success',
                  duration: 4000,
                  icon: 'success'
                });
                navigation.goBack();
              } else {
                setIsLoading(false);
                showMessage({
                  message: t('unable_to_delete_recipe'),
                  type: 'danger',
                  duration: 4000,
                  icon: 'danger'
                });
              }
            } catch (err) {
              console.log('onDeleteRecipeData Error:', err);
              setIsLoading(false);
              showMessage({
                message: err?.response?.data?.message || t('unable_to_delete_recipe'),
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
        <View style={styles.headerRowView}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image style={styles.backIcon} source={backArrow} />
          </TouchableOpacity>
          <Text style={[styles.titleHeader, { color: COLORS.white }]}>{t('recipe')}</Text>
        </View>
        <View style={styles.headerRowView}>
          <TouchableOpacity style={{marginRight: wp(4)}} onPress={() => navigation.navigate('CreateRecipeScreen', { item: recipeData })}>
            <Image style={styles.backIcon} source={editing} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onDeleteRecipeData()}>
            <Image style={styles.backIcon} source={deleteIcon} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.mainView}>
        <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: hp(8)}} showsVerticalScrollIndicator={false}>
          <Image style={styles.fullImageStyle} source={{uri: recipeData?.recipe_image}} />
          <View style={styles.infoView}>
            <View style={styles.topBadge}>
              <Text style={styles.badgeText}>
                {recipeData?.recipe_type}
              </Text>
            </View>
            <View style={styles.headerRowView}>
              <Text style={styles.dishTitle}>{recipeData?.recipe_name}</Text>
            </View>
            <View style={styles.infoRow}>
              <View style={styles.infoCard}>
                <Text style={styles.infoLabel}>
                  {t('preparation_time')}
                </Text>
                <Text style={styles.infoValue}>
                  {recipeData?.prep_time}
                </Text>
              </View>
              <View style={styles.infoCard}>
                <Text style={styles.infoLabel}>
                  {t('calories')}
                </Text>
                <Text style={styles.infoValue}>
                  {recipeData?.calories}
                </Text>
              </View>
            </View>
            <Text style={styles.titleText}>{t('ingredients')}</Text>
            <Text style={styles.descriptionText}>{recipeData?.ingredients?.replace(/\\n/g, '\n')}</Text>
            <Text style={styles.titleText}>{t('cooking_step')}</Text>
            <Text style={styles.descriptionText}>{recipeData?.cooking_steps?.replace(/\\n/g, '\n')}</Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default SaveRecipeDetailScreen;
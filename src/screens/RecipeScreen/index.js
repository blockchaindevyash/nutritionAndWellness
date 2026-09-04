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
import { useTranslation } from 'react-i18next';
import Icon from '../../components/Icon';

const RecipeScreen = ({ navigation, route }) => {
  const { t } = useTranslation();
  const {item} = route.params;
  const orientation = useOrientation();
  const isPortrait = orientation === 'portrait';
  const styles = isPortrait ? portraitStyles : landscapeStyles;
  const insets = useSafeAreaInsets();
  const [isLoading, setIsLoading] = useState(false);
  const [likesCount, setLikesCount] = useState(item?.likes_count || 0);
  const [isLiked, setIsLiked] = useState(item?.is_liked_by_me || false);
  const [reviews, setReviews] = useState(item?.reviews || []);
  const [isCommentModalVisible, setIsCommentModalVisible] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [commentSubmitting, setCommentSubmitting] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);
  const [recipeData, setRecipeData] = useState(null);

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
              const response = await onDeleteCommonApi(`recipes/${recipeData?.id}`);

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

  const onToggleLike = async () => {
    if (likeLoading) return;
    try {
      setLikeLoading(true);
      const response = await onAddCommonJsonApi(`recipes/${recipeData?.id}/toggle-like`, {});
      if (response.data.status) {
        const nextLiked = !isLiked;
        setIsLiked(nextLiked);
        setLikesCount(prev => prev + (nextLiked ? 1 : -1));
      }
    } catch (err) {
      console.log('onToggleLike Error:', err);
      showMessage({
        message: t('unable_to_update_like'),
        type: 'danger',
        duration: 3000,
        icon: 'danger',
      });
    } finally {
      setLikeLoading(false);
    }
  };

  const onSubmitComment = async () => {
    if (!commentText.trim()) return;

    try {
      setCommentSubmitting(true);
      const payload = JSON.stringify({ comment: commentText });
      const response = await onAddCommonJsonApi(`recipes/${recipeData?.id}/review`, payload);
      if (response.data.status) {
        const newReview = response.data.data?.review || {
          id: Date.now(),
          comment: commentText,
          user: { name: 'You' },
          created_at: new Date().toISOString(),
        };
        setReviews(prev => [newReview, ...prev]);
        setCommentText('');
        setIsCommentModalVisible(false);
        showMessage({
          message: t('comment_added_successfully'),
          type: 'success',
          duration: 3000,
          icon: 'success',
        });
      } else {
        showMessage({
          message: t('unable_to_add_comment'),
          type: 'danger',
          duration: 3000,
          icon: 'danger',
        });
      }
    } catch (err) {
      console.log('onSubmitComment Error:', err);
      showMessage({
        message: t('unable_to_add_comment'),
        type: 'danger',
        duration: 3000,
        icon: 'danger',
      });
    } finally {
      setCommentSubmitting(false);
    }
  };

  const onSaveRecipeData = async () => {
    try {
      const response = await onAddCommonJsonApi(`recipes/${recipeData?.id}/save`, {});
      if (response.data.status) {
        console.log('Recipe saved successfully', response.data.data);
        showMessage({
          message: t('recipe_saved_successfully'),
          type: 'success',
          duration: 3000,
          icon: 'success',
        });
      } else {
        showMessage({
          message: t('unable_to_save_recipe'),
          type: 'danger',
          duration: 3000,
          icon: 'danger',
        });
      }
    } catch (err) {
      console.log('onSaveRecipeData Error:', err);
      showMessage({
        message: t('unable_to_save_recipe'),
        type: 'danger',
        duration: 3000,
        icon: 'danger',
      });
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
        {/* <Header title={'Recipe'} onPress={() => navigation.goBack()} /> */}
        <View style={styles.headerRowView}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image style={styles.backIcon} source={backArrow} />
          </TouchableOpacity>
          <Text style={[styles.titleHeader, { color: COLORS.white }]}>{t('recipe')}</Text>
        </View>
        <View style={styles.headerRowView}>
          <TouchableOpacity style={{marginRight: wp(4)}} onPress={() => onSaveRecipeData()}>
            <Image style={styles.backIcon} source={save} />
          </TouchableOpacity>
          {/* <TouchableOpacity style={{marginRight: wp(4)}} onPress={() => navigation.navigate('CreateRecipeScreen', { item: item })}>
            <Image style={styles.backIcon} source={editing} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onDeleteRecipeData()}>
            <Image style={styles.backIcon} source={deleteIcon} />
          </TouchableOpacity> */}
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
            <View style={styles.actionRow}>
              <TouchableOpacity
                style={[
                  styles.actionButton,
                  isLiked && styles.actionButtonActive,
                ]}
                onPress={onToggleLike}
                disabled={likeLoading}
              >
                <Icon
                  name={isLiked ? 'heart' : 'heart-outline'}
                  size={21}
                  color={isLiked ? COLORS.subPrimary : COLORS.white}
                />
                <Text
                  style={[
                    styles.actionText,
                    isLiked && styles.actionTextActive,
                  ]}
                >
                  Like {likesCount}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => setIsCommentModalVisible(true)}
              >
                <Text style={styles.actionText}>{t('comments')}</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.titleText}>{t('ingredients')}</Text>
            <Text style={styles.descriptionText}>{recipeData?.ingredients?.replace(/\\n/g, '\n')}</Text>
            <Text style={styles.titleText}>{t('cooking_step')}</Text>
            <Text style={styles.descriptionText}>{recipeData?.cooking_steps?.replace(/\\n/g, '\n')}</Text>
            <Text style={styles.titleText}>{t('comments')}</Text>
            {reviews.length > 0 ? (
              reviews.map(review => (
                <View key={review.id} style={styles.commentCard}>
                  <Text style={styles.commentUserName}>{review.user?.name || 'User'}</Text>
                  <Text style={styles.commentText}>{review.comment}</Text>
                  <Text style={styles.commentDate}>
                    {review.created_at ? review.created_at.split('T')[0] : ''}
                  </Text>
                </View>
              ))
            ) : (
              <Text style={styles.emptyCommentText}>{t('no_comments')}</Text>
            )}
          </View>
        </ScrollView>
      </View>
      <Modal
        visible={isCommentModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsCommentModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setIsCommentModalVisible(false)}
          />
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={styles.modalContainer}
          >
            <View style={styles.commentModalContent}>
              <View style={styles.modalHandle} />
              <Text style={styles.modalTitle}>{t('add_comment')}</Text>
              <TextInput
                value={commentText}
                onChangeText={setCommentText}
                placeholder={t('write_your_comment')}
                placeholderTextColor={COLORS.greyColor}
                style={styles.commentInput}
                multiline
                numberOfLines={4}
              />
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  onPress={() => setIsCommentModalVisible(false)}
                  style={[styles.modalButton, styles.modalCancelButton]}
                >
                  <Text style={styles.modalButtonText}>{t('cancel')}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={onSubmitComment}
                  style={[styles.modalButton, styles.modalSubmitButton]}
                  disabled={commentSubmitting}
                >
                  <Text style={styles.modalButtonText}>
                    {commentSubmitting ? t('posting') : t('post_comment')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </View>
  );
};

export default RecipeScreen;
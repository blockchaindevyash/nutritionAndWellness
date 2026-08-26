import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  Alert,
  StatusBar,
} from 'react-native';
import Icon from '../../components/Icon';
import { portraitStyles, landscapeStyles } from './styles';
import useOrientation from '../../components/OrientationComponent';
import { COLORS } from '../../utils';
import Header from '../../components/HeaderComponent';
import { useTranslation } from 'react-i18next';
import down from '../../images/down.png';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const categories = [
  'Nutrition',
  'Fitness',
  'Mental Health',
  'Weight Loss',
  'Sleep',
  'General',
];

const CreatePostScreen = ({navigation}) => {
  const orientation = useOrientation();
  const isPortrait = orientation === 'portrait';
  const styles = isPortrait ? portraitStyles : landscapeStyles;
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [image, setImage] = useState(null);

  const handlePost = () => {
    if (!title.trim()) {
      Alert.alert('Required', 'Please enter a post title.');
      return;
    }

    if (!description.trim()) {
      Alert.alert('Required', 'Please enter your description.');
      return;
    }

    if (!selectedCategory) {
      Alert.alert('Required', 'Please select a category.');
      return;
    }

    const postData = {
      title,
      description,
      category: selectedCategory,
      image,
    };

    console.log('Post Data:', postData);

    Alert.alert(
      'Success',
      'Your post has been published successfully.',
      [
        {
          text: 'OK',
          onPress: () => navigation?.goBack?.(),
        },
      ],
    );
  };

  const handleSelectImage = () => {
    // Integrate react-native-image-picker here.
    Alert.alert(
      'Image Picker',
      'Connect your image picker here.',
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          width: '100%',
          paddingTop: insets.top,
          backgroundColor: COLORS.primary,
        }}
      />
      {/* Header */}
      <View style={styles.headerView}>
        <Header title={t('create_post')} onPress={() => navigation.goBack()} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>

        {/* Intro */}
        <View style={styles.introContainer}>
          <View style={styles.introIcon}>
            <Icon
              name="chat"
              size={25}
              color="#4CAF50"
            />
          </View>

          <View style={styles.introTextContainer}>
            <Text style={styles.introTitle}>
              {t('start_discussion')}
            </Text>

            <Text style={styles.introDescription}>
              {t('share_experience')}
            </Text>
          </View>
        </View>

        {/* Title */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>
            {t('title')}{' '}
            <Text style={styles.required}>*</Text>
          </Text>

          <View style={styles.inputContainer}>
            <Icon
              name="edit"
              size={19}
              color="#999"
            />

            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="What would you like to discuss?"
              placeholderTextColor="#A0A0A0"
              style={styles.titleInput}
              maxLength={100}
            />
          </View>

          <Text style={styles.characterCount}>
            {title.length}/100
          </Text>
        </View>

        {/* Category */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>
            {t('category')}{' '}
            <Text style={styles.required}>*</Text>
          </Text>

          <View style={styles.categoriesContainer}>
            {categories.map(category => {
              const selected =
                selectedCategory === category;

              return (
                <TouchableOpacity
                  key={category}
                  activeOpacity={0.8}
                  onPress={() =>
                    setSelectedCategory(category)
                  }
                  style={[
                    styles.categoryChip,
                    selected &&
                      styles.selectedCategoryChip,
                  ]}>

                  {selected && (
                    <Icon
                      name="check"
                      size={15}
                      color="#FFF"
                    />
                  )}

                  <Text
                    style={[
                      styles.categoryText,
                      selected &&
                        styles.selectedCategoryText,
                    ]}>
                    {category}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Description */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>
            {t('description')}{' '}
            <Text style={styles.required}>*</Text>
          </Text>

          <View style={styles.descriptionContainer}>
            <TextInput
              value={description}
              onChangeText={setDescription}
              placeholder="Write your question or share your experience..."
              placeholderTextColor="#A0A0A0"
              style={styles.descriptionInput}
              multiline
              textAlignVertical="top"
              maxLength={1000}
            />
          </View>

          <Text style={styles.characterCount}>
            {description.length}/1000
          </Text>
        </View>

        {/* Image */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>
            {t('add_image')}
          </Text>

          {!image ? (
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.imageUpload}
              onPress={handleSelectImage}>

              <View style={styles.uploadIcon}>
                <Icon
                  name="image"
                  size={28}
                  color="#4CAF50"
                />
              </View>

              <Text style={styles.uploadTitle}>
                {t('add_an_image')}
              </Text>

              <Text style={styles.uploadDescription}>
                JPG, PNG up to 5MB
              </Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.imagePreviewContainer}>
              <Image
                source={{uri: image}}
                style={styles.imagePreview}
              />

              <TouchableOpacity
                style={styles.removeImageButton}
                onPress={() => setImage(null)}>
                <Icon
                  name="close"
                  size={22}
                  color="#FFF"
                />
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Community Guidelines */}
        <View style={styles.guidelineContainer}>
          <Icon
            name="info"
            size={20}
            color="#4CAF50"
          />

          <Text style={styles.guidelineText}>
            {t('note_community')}
          </Text>
        </View>

        {/* Post Button */}
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.postButton}
          onPress={handlePost}>

          <Icon
            name="send"
            size={19}
            color="#FFF"
          />

          <Text style={styles.postButtonText}>
            {t('publish_post')}
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
};

export default CreatePostScreen;
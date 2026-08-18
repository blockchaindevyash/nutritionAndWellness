import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { hp, wp } from '../../components/responsive';
import { portraitStyles, landscapeStyles } from './styles';
import useOrientation from '../../components/OrientationComponent';
import ImagePicker from "react-native-image-crop-picker";
import { COLORS, Fonts } from '../../utils';
import Header from '../../components/HeaderComponent';
import moment from 'moment';
import plane from '../../images/plane.png';
import plus from '../../images/plus.png';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


const FoodAnalysis = ({ navigation }) => {
  const orientation = useOrientation(); // Get current orientation
  const isPortrait = orientation === 'portrait';
  const styles = isPortrait ? portraitStyles : landscapeStyles;
  const insets = useSafeAreaInsets();
  const [enterText, setEnterText] = useState('');
  const [searchList, setSearchList] = useState([]);
  const [imageAttachment, setImageAttachment] = useState(null);
  const { t } = useTranslation();

  const onCameraPress = () => {
    try {
      ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: false,
      }).then((image) => {
        console.log(image);

        setImageAttachment({
          uri: image.path,
          type: image.mime,
          name: image.filename,
        });
      });
      console.log('onCameraPress');
    } catch (err) {
      console.log('onCameraPress Error:', err);
    }
  };

  const onGalleryPress = () => {
    try {
      ImagePicker.openPicker({
        cropping: false,
        mediaType: 'any',
      }).then((image) => {
        console.log(image)
        setImageAttachment({
          uri: image.path,
          type: image.mime,
          name: image.filename,
        });
      });
      console.log('onGalleryPress');
    } catch (err) {
      console.log('onGalleryPress Error:', err);
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
      <View style={[styles.container, { backgroundColor: COLORS.backColor }]}>
        <View style={styles.headerView}>
          <Text style={styles.callLogText}>
            {t('food_scanner')}
          </Text>
        </View>
        <View style={styles.mainView}>
          <Text style={styles.titleText}>{t('scan_your_food')}</Text>
          <Text style={styles.subtitleText}>{t('scan_your_food_subtitle')}</Text>
          <View style={styles.imageView}>
            {imageAttachment ? (
              <Image source={{ uri: imageAttachment.uri }} style={styles.foodImage} />
            ) : (
              <Text style={styles.scanText}>{t('scanner_image')}</Text>
            )}
          </View>
          <View style={styles.scanView}>
            <TouchableOpacity style={styles.scanButton} onPress={() => onGalleryPress()}>
              <Text style={styles.scanText}>{t('gallery')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.scanButton} onPress={() => onCameraPress()}>
              <Text style={styles.scanText}>{t('camera')}</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.analysisButton} onPress={() => navigation.navigate('AnalysisDetailScreen', { imageAttachment: imageAttachment })}>
            <Text style={styles.analysisText}>{t('analyze_food')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default FoodAnalysis;
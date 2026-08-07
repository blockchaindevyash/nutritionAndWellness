import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState, useRef, useCallback} from 'react';
import {hp, wp} from '../../components/responsive';
import {portraitStyles, landscapeStyles} from './styles';
import useOrientation from '../../components/OrientationComponent';
import {COLORS, Fonts} from '../../utils';
import Header from '../../components/HeaderComponent';
import moment from 'moment';
import plane from '../../images/plane.png';
import plus from '../../images/plus.png';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { onAddCommonFormApi } from '../../services/Api';


const AnalysisDetailScreen = ({navigation, route}) => {
  const orientation = useOrientation(); // Get current orientation
  const insets = useSafeAreaInsets();
  const isPortrait = orientation === 'portrait';
  const styles = isPortrait ? portraitStyles : landscapeStyles;
  const [isLoading, setIsLoading] = useState(false);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [errorShow, setErrorShow] = useState(false);

  useFocusEffect(
    useCallback(() => {
      onPostImageData();
    }, [])
  );

  const onPostImageData = async () => {
    try {
      setIsLoading(true);
      var formdata = new FormData();
      formdata.append("image", route.params.imageAttachment);
      const response = await onAddCommonFormApi('ai/analyze-meal', formdata);
      console.log('onPostImageData Response:', response.data);
      if (response.data.status) {
        setAnalyticsData(response.data.data.analysis);
        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
      console.log('onPostImageData Error:', err);
    }
  };

  return(
    <View style={styles.safeAreaStyle}>
      <View
        style={{
            width: '100%',
            paddingTop: insets.top,
            backgroundColor: COLORS.primary,
        }}
      />
        <View style={[styles.container, {backgroundColor: COLORS.backColor}]}>
            <View style={styles.headerView}>
              <Header title={'Analysis Details'} onPress={() => navigation.goBack()}/>
            </View>
            {isLoading ? (
              <View style={[styles.mainView, {alignItems: 'center', justifyContent: 'center'}]}>
                <ActivityIndicator size={'large'} color={COLORS.secondary} />
                <Text style={styles.analysisText}>Analyzing...</Text>
              </View>
            ) : (
            <View style={styles.mainView}>
              <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: hp(8)}}>
              <View style={styles.imageView}>
                {analyticsData?.image_url ? (
                  <Image source={{ uri: analyticsData?.image_url }} style={styles.foodImage} />
                ) : (
                  <Text style={styles.scanText}>Scanner Image</Text>
                )}
              </View>
              <View style={styles.scanView}>
                <Text style={[styles.analysisText, {color: COLORS.secondary}]}>{analyticsData?.dish_name}</Text>
                <Text style={styles.percentageText}>Calories: {analyticsData?.total_calories}</Text>
              </View>
              <Text style={styles.dateText}>{analyticsData?.notes?.health_assessment}</Text>
              <Text style={[styles.analysisText, {color: COLORS.secondary}]}>Ingredients:</Text>
              {analyticsData?.ingredients?.map((item, index) => {
                return (
                <View key={index} style={[styles.ingredientView]}>
                  <Text style={styles.ingredientText}>{item?.name}</Text>
                  <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                    <Text style={styles.ingredientDetailText}>{item?.estimated_portion}</Text>
                    <Text style={styles.ingredientDetailText}>Calories: {item?.calories}</Text>
                  </View>
                </View>
              )})}
              </ScrollView>
            </View>
            )}
        </View>
    </View>
  );
};

export default AnalysisDetailScreen;
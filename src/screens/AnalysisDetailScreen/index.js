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


const AnalysisDetailScreen = ({navigation, route}) => {
  const orientation = useOrientation(); // Get current orientation
  const insets = useSafeAreaInsets();
  const isPortrait = orientation === 'portrait';
  const styles = isPortrait ? portraitStyles : landscapeStyles;
  const [enterText, setEnterText] = useState('');
  const [searchList, setSearchList] = useState([]);

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
            <View style={styles.mainView}>
              <View style={styles.imageView}>
                {route.params?.imageAttachment ? (
                  <Image source={{ uri: route.params.imageAttachment.uri }} style={styles.foodImage} />
                ) : (
                  <Text style={styles.scanText}>Scanner Image</Text>
                )}
              </View>
              <View style={styles.scanView}>
                <Text style={styles.analysisText}>Nutritional Analysis</Text>
                <Text style={styles.percentageText}>95% confidence</Text>
              </View>
              <Text style={styles.dateText}>Oct 10, 2025 03:34 PM</Text>
            </View>
        </View>
    </View>
  );
};

export default AnalysisDetailScreen;
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
import { COLORS } from '../../utils';
import Header from '../../components/HeaderComponent';
import { hp } from '../../components/responsive';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from "react-native-linear-gradient";

const AdviserDetailScreen = ({ navigation, route }) => {
  const { details } = route.params;
  const orientation = useOrientation(); // Get current orientation
  const isPortrait = orientation === 'portrait';
  const insets = useSafeAreaInsets();
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const styles = isPortrait ? portraitStyles : landscapeStyles;

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
        <Header title={'Wellness Adviser'} onPress={() => navigation.goBack()} />
      </View>
      <View style={[styles.container, {backgroundColor: COLORS.backColor}]}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: hp(10) }}>
          <LinearGradient
            colors={['#99e141', '#79B433']}
            style={styles.headerCard}>
            <View style={styles.iconContainer}>
              <Text style={styles.icon}>
                {details.icon}
              </Text>
            </View>
            <Text style={styles.title}>
              {details.title}
            </Text>
            <Text style={styles.description}>
              {details.description}
            </Text>
            <View style={styles.goalBox}>
              <Text style={styles.goalText}>
                🎯 {details.dailyGoal}
              </Text>
            </View>
          </LinearGradient>

          {/* Recommendations */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Recommended
            </Text>
            {details.recommendations.map((item, index) => (
              <View key={index} style={styles.listItem}>
                <Text style={styles.listIcon}>✅</Text>
                <Text style={styles.listText}>
                  {item}
                </Text>
              </View>
            ))}
          </View>

          {/* Avoid Foods */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Avoid Foods
            </Text>
            {details.avoid.map((item, index) => (
              <View key={index} style={styles.listItem}>
                <Text style={styles.listIcon}>❌</Text>
                <Text style={styles.listText}>{item}</Text>
              </View>
            ))}
          </View>

          {/* Meal Timing */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Meal Timing
            </Text>
            {details.schedule.map((item, index) => (
              <View key={index} style={styles.timingCard}>
                <View style={styles.timingTopRow}>
                  <Text style={styles.mealTitle}>
                    {item.title}
                  </Text>
                  <View style={styles.timeBadge}>
                    <Text style={styles.timeText}>
                      {item.time}
                    </Text>
                  </View>
                </View>
                <Text style={styles.tipDescription}>
                  {item.desc}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default AdviserDetailScreen;
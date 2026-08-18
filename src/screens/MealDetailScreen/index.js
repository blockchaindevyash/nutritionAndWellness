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
import { useTranslation } from 'react-i18next';
import { portraitStyles, landscapeStyles } from './styles';
import useOrientation from '../../components/OrientationComponent';
import Header from '../../components/HeaderComponent';
import { COLORS } from '../../utils';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const MealDetailScreen = ({ navigation, route }) => {
    const { t } = useTranslation();
    const orientation = useOrientation(); // Get current orientation
    const isPortrait = orientation === 'portrait';
    const styles = isPortrait ? portraitStyles : landscapeStyles;
    const insets = useSafeAreaInsets();

    const { item } = route.params;

    const mealCards = [
        { title: "Breakfast", data: item.meals.breakfast, kcal: 400 },
        { title: "Lunch", data: item.meals.lunch, kcal: 500 },
        { title: "Dinner", data: item.meals.dinner, kcal: 450 },
    ];

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
                <Header title={`${item.day} ${t('meals')}`} onPress={() => navigation.goBack()} />
            </View>
            <View style={styles.mainView}>
                <ScrollView>
                    <Text style={styles.date}>{item.day} - {item.date}</Text>
                    <View style={styles.calorieCard}>
                        <View>
                            <Text style={styles.eaten}>{t('eaten')}</Text>
                            <Text style={styles.kcal}>{item.calories} kcal</Text>
                        </View>
                        <View style={styles.circle}>
                            <Text style={styles.remaining}>1250</Text>
                            <Text style={styles.remaining}>{t('kcal_left')}</Text>
                        </View>
                    </View>
                    {/* Meals */}
                    <View style={styles.mealHeader}>
                        <Text style={styles.sectionTitle}>{t('meals_today')}</Text>
                    </View>
                    <View style={styles.mealContainer}>
                        {mealCards.map((meal, index) => (
                            <LinearGradient
                                key={index}
                                colors={["#79B433", "#a7db68"]}
                                style={styles.mealCard}>
                                <View style={{padding: 15}}>
                                    <Text style={styles.mealTitle}>{meal.title}</Text>
                                    <Text style={styles.mealDesc}>{meal.data}</Text>
                                    <Text style={styles.kcalText}>{meal.kcal} kcal</Text>
                                </View>
                            </LinearGradient>
                        ))}
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};

export default MealDetailScreen;
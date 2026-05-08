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
import Header from '../../components/HeaderComponent';
import { COLORS } from '../../utils';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const MealDetailScreen = ({ navigation, route }) => {
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
                <Header title={`${item.day} Workout`} onPress={() => navigation.goBack()} />
            </View>
            <View style={styles.mainView}>
                <ScrollView>
                    <Text style={styles.date}>{item.day} - {item.date}</Text>
                    <View style={styles.calorieCard}>
                        <View>
                            <Text style={styles.eaten}>Eaten</Text>
                            <Text style={styles.kcal}>{item.calories} kcal</Text>
                        </View>
                        <View style={styles.circle}>
                            <Text style={styles.remaining}>1250</Text>
                            <Text style={styles.remaining}>kcal left</Text>
                        </View>
                    </View>
                    {/* Meals */}
                    <View style={styles.mealHeader}>
                        <Text style={styles.sectionTitle}>Meals Today</Text>
                    </View>
                    <View style={styles.mealContainer}>
                        {mealCards.map((meal, index) => (
                            <LinearGradient
                                key={index}
                                colors={["#fc6127", "#faa181"]}
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
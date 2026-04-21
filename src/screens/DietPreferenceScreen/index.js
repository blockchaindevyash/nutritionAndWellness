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

const dietOptions = [
    { id: 1, title: 'Vegetarian', icon: '🥦', desc: 'Plant-based diet' },
    { id: 2, title: 'Vegan', icon: '🌱', desc: 'No animal products' },
    { id: 3, title: 'Eggetarian', icon: '🥚', desc: 'Vegetarian + eggs' },
    { id: 4, title: 'Non-Vegetarian', icon: '🍗', desc: 'Includes meat & fish' },
];

const allergyOptions = [
    'Nuts',
    'Dairy',
    'Gluten',
    'None',
];

const DietPreferenceScreen = ({ navigation }) => {
    const orientation = useOrientation(); // Get current orientation
    const isPortrait = orientation === 'portrait';
    const [selectedDiet, setSelectedDiet] = useState(null);
    const [selectedAllergies, setSelectedAllergies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const styles = isPortrait ? portraitStyles : landscapeStyles;

    const toggleAllergy = (item) => {
        if (item === 'None') {
            setSelectedAllergies(['None']);
            return;
        }

        if (selectedAllergies.includes(item)) {
            setSelectedAllergies(selectedAllergies.filter(a => a !== item));
        } else {
            setSelectedAllergies([
                ...selectedAllergies.filter(a => a !== 'None'),
                item,
            ]);
        }
    };

    const handleContinue = () => {
        const payload = {
            diet: selectedDiet,
            allergies: selectedAllergies,
        };

        console.log('User Data:', payload);

        // Navigate to next screen
        navigation.navigate('ActivityLevelScreen', payload);
    };

    return (
        <View style={styles.safeAreaStyle}>
            <View style={styles.headerView}>
                <Header title={'Your Diet Preference'} onPress={() => navigation.goBack()} />
            </View>
            <View style={[styles.container, { backgroundColor: COLORS.backColor }]}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={styles.subtitle}>Select your eating style</Text>
                    {/* Diet Options */}
                    {dietOptions.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            style={[
                                styles.card,
                                selectedDiet === item.title && styles.selectedCard,
                            ]}
                            onPress={() => setSelectedDiet(item.title)}>
                            <Text style={styles.cardTitle}>
                                {item.icon} {item.title}
                            </Text>
                            <Text style={styles.cardDesc}>{item.desc}</Text>
                        </TouchableOpacity>
                    ))}
                    {/* Allergies Section */}
                    <Text style={styles.sectionTitle}>⚠️ Allergies (Optional)</Text>
                    <View style={styles.allergyContainer}>
                        {allergyOptions.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    styles.allergyItem,
                                    selectedAllergies.includes(item) && styles.selectedAllergy,
                                ]}
                                onPress={() => toggleAllergy(item)}>
                                <Text style={styles.checkbox}>
                                    {selectedAllergies.includes(item) ? '☑' : '☐'}
                                </Text>
                                <Text style={styles.allergyText}>{item}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
                <TouchableOpacity
                    style={[styles.buttonView, { opacity: isLoading ? 0.75 : 1 }]}
                    disabled={isLoading}
                    onPress={() => navigation.navigate('ActivityLevelScreen')}>
                    {isLoading ? (
                        <ActivityIndicator size={'large'} color={COLORS.white} />
                    ) : (
                        <Text style={styles.signinText}>Continue</Text>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default DietPreferenceScreen;
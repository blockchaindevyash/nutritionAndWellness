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
import { showMessage } from 'react-native-flash-message';
import useAuthStore from '../../store/authStore';

const dietOptions = [
    { id: 1, title: 'Vegetarian', icon: '🥦', desc: 'Plant-based diet' },
    { id: 2, title: 'Vegan', icon: '🌱', desc: 'No animal products' },
    { id: 3, title: 'Eggetarian', icon: '🥚', desc: 'Vegetarian + eggs' },
    { id: 4, title: 'Non-Vegetarian', icon: '🍗', desc: 'Includes meat & fish' },
    { id: 5, title: 'No Onion/Garlic', icon: '🌱', desc: 'Vegetarian without onions/garlic' },
];

const DietPreferenceScreen = ({ navigation }) => {
    const {updateSignupData, dietList} = useAuthStore();
    const orientation = useOrientation(); // Get current orientation
    const isPortrait = orientation === 'portrait';
    const insets = useSafeAreaInsets();
    const [selectedDiet, setSelectedDiet] = useState('');
    const [selectedAllergies, setSelectedAllergies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const styles = isPortrait ? portraitStyles : landscapeStyles;

    const handleContinue = () => {
        console.log('User Data:', selectedDiet);
        if (selectedDiet == '') {
            showMessage({
                message: 'Please select at least one option',
                type: 'danger',
                duration: 4000,
                icon: 'danger',
            });
        } else {
            updateSignupData({
                diet: selectedDiet,
            });
            navigation.navigate('ActivityLevelScreen');
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
                <Header title={'Your Diet Preference'} onPress={() => navigation.goBack()} />
            </View>
            <View style={[styles.container, { backgroundColor: COLORS.backColor }]}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: hp(10)}}>
                    <Text style={styles.subtitle}>Select your eating style</Text>
                    {/* Diet Options */}
                    {dietList.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            style={[
                                styles.card,
                                selectedDiet === item.id && styles.selectedCard,
                            ]}
                            onPress={() => setSelectedDiet(item.id)}>
                            <Text style={styles.cardTitle}>
                                {item.name}
                            </Text>
                            <Text style={styles.cardDesc}>{item.description}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
                <TouchableOpacity
                    style={[styles.buttonView, { opacity: isLoading ? 0.75 : 1 }]}
                    disabled={isLoading}
                    onPress={() => handleContinue()}>
                    {isLoading ? (
                        <ActivityIndicator size={'large'} color={COLORS.white} />
                    ) : (
                        <Text style={styles.signinText}>Next</Text>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default DietPreferenceScreen;
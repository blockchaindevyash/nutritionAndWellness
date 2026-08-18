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
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { portraitStyles, landscapeStyles } from './styles';
import useOrientation from '../../components/OrientationComponent';
import { COLORS } from '../../utils';
import Header from '../../components/HeaderComponent';
import { hp } from '../../components/responsive';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { showMessage } from 'react-native-flash-message';
import useAuthStore from '../../store/authStore';
import { onAddCommonFormApi, onGetCommonApi } from '../../services/Api';
import { useFocusEffect } from '@react-navigation/native';
import moment from 'moment';

const dietOptions = [
    { id: 1, title: 'Vegetarian', icon: '🥦', desc: 'Plant-based diet' },
    { id: 2, title: 'Vegan', icon: '🌱', desc: 'No animal products' },
    { id: 3, title: 'Eggetarian', icon: '🥚', desc: 'Vegetarian + eggs' },
    { id: 4, title: 'Non-Vegetarian', icon: '🍗', desc: 'Includes meat & fish' },
    { id: 5, title: 'No Onion/Garlic', icon: '🌱', desc: 'Vegetarian without onions/garlic' },
];

const DietPreferenceScreen = ({ navigation, route }) => {
    const { updateSignupData, dietList, profileData, updateProfileData, signupData } = useAuthStore();
    const orientation = useOrientation(); // Get current orientation
    const isPortrait = orientation === 'portrait';
    const insets = useSafeAreaInsets();
    const [selectedDiet, setSelectedDiet] = useState('');
    const [fromAccount, setFromAccount] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const styles = isPortrait ? portraitStyles : landscapeStyles;
    const { t } = useTranslation();

    useFocusEffect(
        useCallback(() => {
            if (route.params?.item) {
                setSelectedDiet(route.params.item.diet?.id || '');
                setFromAccount(true);
            } else {
                setSelectedDiet(signupData?.diet || '');
            }
        }, [route.params?.item, profileData?.diet, signupData?.diet])
    );

    const buildProfileFile = fileValue => {
        if (!fileValue || typeof fileValue !== 'string') return null;
        if (fileValue.startsWith('http://') || fileValue.startsWith('https://')) return null;

        const normalizedPath = fileValue.startsWith('file://') ? fileValue : `file://${fileValue}`;
        const extension = fileValue.split('.').pop()?.toLowerCase() || '';
        let mimeType = 'image/png';

        switch (extension) {
            case 'jpg':
            case 'jpeg':
                mimeType = 'image/jpeg';
                break;
            case 'png':
                mimeType = 'image/png';
                break;
            case 'webp':
                mimeType = 'image/webp';
                break;
            case 'pdf':
                mimeType = 'application/pdf';
                break;
            default:
                mimeType = 'image/png';
        }

        return {
            uri: normalizedPath,
            type: mimeType,
            name: fileValue.split('/').pop() || 'file',
        };
    };

    const handleContinue = async () => {
        console.log('User Data:', selectedDiet);
        if (selectedDiet == '') {
            showMessage({
                message: 'Please select at least one option',
                type: 'danger',
                duration: 4000,
                icon: 'danger',
            });
        } else {
            if (fromAccount) {
                try {
                    setIsLoading(true);
                    console.log('Profile Data before API call:', profileData);
                    const imageFile = buildProfileFile(profileData?.prescription_file);
                    const goalIds = profileData?.goals?.map(item => item.id) || [];
                    const medicalIds = profileData?.medical_conditions?.map(item => item.id) || [];
                    console.log('Profile Data for API:', selectedDiet);
                    var formdata = new FormData();
                    formdata.append("name", profileData?.name || '');
                    formdata.append("dob", moment(profileData?.dob).format('DD/MM/YYYY'));
                    formdata.append("gender", profileData?.gender || '');
                    formdata.append("height", profileData?.height || '');
                    formdata.append("weight", profileData?.weight || '');
                    formdata.append("diet", `${selectedDiet}`);
                    formdata.append("activity_level", `${profileData?.activity_level?.id || ''}`);
                    formdata.append("medical_condition_text", profileData?.medical_condition_text || '');
                    // if (imageFile) {
                    //     formdata.append("prescription_file", imageFile);
                    // }
                    formdata.append("health_note", profileData?.health_note || '');
                    goalIds.forEach(id => {
                        formdata.append("goal[]", `${id}`);
                    });

                    medicalIds.forEach(id => {
                        formdata.append("medical_condition[]", `${id}`);
                    });

                    profileData?.medicines?.forEach((medicine, index) => {
                        formdata.append(`current_medicine[${index}][medicine_name]`, medicine.medicine_name);
                        formdata.append(`current_medicine[${index}][dosage]`, medicine.dosage);
                        formdata.append(`current_medicine[${index}][timing]`, medicine.timing);
                        formdata.append(`current_medicine[${index}][additional_notes]`, medicine.additional_notes);
                    });
                    formdata.append("workout_reference", `${profileData?.workout_reference?.id || ''}`);
                    console.log('Form Data for API:', formdata);
                    const response = await onAddCommonFormApi('user/profile', formdata);
                    console.log('Profile Update Response:', response);
                    if (response.data.status) {
                        showMessage({
                            message: 'Profile updated successfully',
                            type: 'success',
                            duration: 4000,
                            icon: 'success',
                        });
                        const profileRes = await onGetCommonApi('user/profile');
                        updateProfileData(profileRes.data.data.user);
                        setIsLoading(false);
                        navigation.goBack();
                    } else {
                        showMessage({
                            message: response.data.message,
                            type: 'danger',
                            duration: 4000,
                            icon: 'danger',
                        });
                        setIsLoading(false);
                    }
                } catch (error) {
                    showMessage({
                        message: 'Error updating profile',
                        type: 'danger',
                        duration: 4000,
                        icon: 'danger',
                    });
                    setIsLoading(false);
                    console.log('Error saving profile data:', error.response || error);
                }
            } else {
                updateSignupData({
                    diet: selectedDiet,
                });
                navigation.navigate('ActivityLevelScreen');
            }
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
                <Header title={t('your_diet_preference')} onPress={() => navigation.goBack()} />
            </View>
            <View style={[styles.container, { backgroundColor: COLORS.backColor }]}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: hp(10) }}>
                    <Text style={styles.subtitle}>{t('select_your_eating_style')}</Text>
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
                        <Text style={styles.signinText}>{fromAccount ? t('save') : t('next')}</Text>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default DietPreferenceScreen;
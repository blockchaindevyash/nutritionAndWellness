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
import { useFocusEffect } from '@react-navigation/native';
import { onAddCommonFormApi, onGetCommonApi } from '../../services/Api';
import moment from 'moment';

const activityOptions = [
    {
        id: 1,
        title: 'Sedentary',
        icon: '😴',
        desc: 'Little or no exercise',
    },
    {
        id: 2,
        title: 'Lightly Active',
        icon: '🚶',
        desc: '1–2 days/week',
    },
    {
        id: 3,
        title: 'Moderately Active',
        icon: '🏃',
        desc: '3–5 days/week',
    },
    {
        id: 4,
        title: 'Very Active',
        icon: '🔥',
        desc: '6–7 days/week',
    },
];

const ActivityLevelScreen = ({ navigation, route }) => {
    const { updateSignupData, activityList, profileData, updateProfileData, signupData } = useAuthStore();
    const orientation = useOrientation(); // Get current orientation
    const isPortrait = orientation === 'portrait';
    const insets = useSafeAreaInsets();
    const [selectedLevel, setSelectedLevel] = useState('');
    const [fromAccount, setFromAccount] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const styles = isPortrait ? portraitStyles : landscapeStyles;
    const { t } = useTranslation();

    useFocusEffect(
        useCallback(() => {
            if (route.params?.item) {
                setSelectedLevel(route.params.item.activity_level?.id);
                setFromAccount(true);
            } else {
                setSelectedLevel(signupData?.activity_level || '');
            }
        }, [route.params?.item, profileData?.activity_level, signupData?.activity_level])
    );

    const handleContinue = async () => {
        if (selectedLevel == '') {
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
                    const imageUrl = profileData.prescription_file;
                    const extension = imageUrl ? imageUrl.split(".").pop().toLowerCase() : null;
                    let mimeType = "image/png";
                    switch (extension) {
                        case "jpg":
                        case "jpeg":
                            mimeType = "image/jpeg";
                            break;
                        case "png":
                            mimeType = "image/png";
                            break;
                        case "webp":
                            mimeType = "image/webp";
                            break;
                        // PDF
                        case "pdf":
                            mimeType = "application/pdf";
                            break;
                    }
                    const imageFile = {
                        uri: imageUrl,
                        type: mimeType,
                        name: imageUrl ? imageUrl.split('/').pop() : null,
                    };
                    const goalIds = profileData?.goals.map(item => item.id);
                    const medicalIds = profileData?.medical_conditions.map(item => item.id);
                    console.log('Profile Data for API:', goalIds, medicalIds, profileData);
                    var formdata = new FormData();
                    formdata.append("name", profileData?.name);
                    formdata.append("dob", moment(profileData?.dob).format('DD/MM/YYYY'));
                    formdata.append("gender", profileData?.gender);
                    formdata.append("height", profileData?.height);
                    formdata.append("weight", profileData?.weight);
                    // formdata.append("goal", goalIds);
                    formdata.append("diet", profileData?.diet?.id || '');
                    formdata.append("activity_level", selectedLevel);
                    // formdata.append("medical_condition", medicalIds);
                    formdata.append("medical_condition_text", profileData?.medical_condition_text || '');
                    if (profileData.prescription_file) {
                        formdata.append("prescription_file", imageFile);
                    }
                    formdata.append("health_note", profileData?.health_note || '');
                    // formdata.append("current_medicine", profileData?.current_medicine);
                    goalIds.forEach(id => {
                        formdata.append("goal[]", id);
                    });
                    medicalIds.forEach(id => {
                        formdata.append("medical_condition[]", id);
                    });
                    profileData?.medicines?.forEach((medicine, index) => {
                        formdata.append(`current_medicine[${index}][medicine_name]`, medicine.medicine_name);
                        formdata.append(`current_medicine[${index}][dosage]`, medicine.dosage);
                        formdata.append(`current_medicine[${index}][timing]`, medicine.timing);
                        formdata.append(`current_medicine[${index}][additional_notes]`, medicine.additional_notes);
                    });
                    formdata.append("workout_reference", profileData?.workout_reference?.id || '');

                    const response = await onAddCommonFormApi('user/profile', formdata);
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
                    activity_level: selectedLevel,
                });
                navigation.navigate('MedicalScreen');
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
                <Header title={t('activity_level')} onPress={() => navigation.goBack()} />
            </View>
            <View style={[styles.container, { backgroundColor: COLORS.backColor }]}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: hp(10) }}>
                    <Text style={styles.subtitle}>{t('how_active_are_you_daily')}</Text>
                    {activityList.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            style={[
                                styles.card,
                                selectedLevel === item.id && styles.selectedCard,
                            ]}
                            onPress={() => setSelectedLevel(item.id)}>
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

export default ActivityLevelScreen;
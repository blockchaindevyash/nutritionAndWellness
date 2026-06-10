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

const goals = [
    { id: 1, title: 'Weight Loss', icon: '🔥' },
    { id: 2, title: 'Weight Gain', icon: '🍽️' },
    { id: 3, title: 'Build Muscle', icon: '💪' },
    { id: 4, title: 'Stay Fit', icon: '🧘' },
    { id: 5, title: 'Healthy Eating', icon: '🥗' },
    { id: 6, title: 'Boost Energy', icon: '⚡' },
];

const GoalSelection = ({ navigation, route }) => {
    const { updateSignupData, goalList, profileData, updateProfileData } = useAuthStore();
    const orientation = useOrientation(); // Get current orientation
    const isPortrait = orientation === 'portrait';
    const insets = useSafeAreaInsets();
    const [selectedGoals, setSelectedGoals] = useState([]);
    const [fromAccount, setFromAccount] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const styles = isPortrait ? portraitStyles : landscapeStyles;

    useFocusEffect(
        useCallback(() => {
            if (route.params?.item) {
                setSelectedGoals(profileData?.goal.map(item => item.id) || []);
                setFromAccount(true);
            }
        }, [])
    );

    const toggleGoal = (goal) => {
        if (selectedGoals.includes(goal)) {
            setSelectedGoals(selectedGoals.filter(g => g !== goal));
        } else {
            setSelectedGoals([...selectedGoals, goal]);
        }
    };

    const onGoalPress = async () => {
        console.log(selectedGoals);
        if (selectedGoals.length == 0) {
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
                    const extension = imageUrl.split(".").pop().toLowerCase();
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
                        case "pdf":
                            mimeType = "application/pdf";
                            break;
                    }
                    const imageFile = {
                        uri: imageUrl,
                        type: mimeType,
                        name: imageUrl.split('/').pop(),
                    };
                    const medicalIds = profileData?.medical_condition.map(item => item.id);
                    console.log('Profile Data for API:', medicalIds, profileData?.current_medicine);
                    var formdata = new FormData();
                    formdata.append("name", profileData?.name);
                    formdata.append("dob", profileData?.dob);
                    formdata.append("gender", profileData?.gender);
                    formdata.append("height", profileData?.height);
                    formdata.append("weight", profileData?.weight);
                    formdata.append("diet", profileData?.diet?.id);
                    formdata.append("activity_level", profileData?.activity_level?.id);
                    formdata.append("medical_condition_text", profileData?.medical_condition_text);
                    formdata.append("prescription_file", imageFile);
                    formdata.append("health_note", profileData?.health_note);
                    selectedGoals.forEach(id => {
                        formdata.append("goal[]", id);
                    });

                    medicalIds.forEach(id => {
                        formdata.append("medical_condition[]", id);
                    });

                    profileData?.current_medicine?.forEach((medicine, index) => {
                        formdata.append(`current_medicine[${index}][medicine_name]`, medicine.medicine_name);
                        formdata.append(`current_medicine[${index}][dosage]`, medicine.dosage);
                        formdata.append(`current_medicine[${index}][timing]`, medicine.timing);
                        formdata.append(`current_medicine[${index}][additional_notes]`, medicine.additional_notes);
                    });
                    formdata.append("workout_reference", profileData?.workout_reference?.id);

                    const response = await onAddCommonFormApi('user/profile', formdata);
                    if (response.data.status) {
                        showMessage({
                            message: 'Profile updated successfully',
                            type: 'success',
                            duration: 4000,
                            icon: 'success',
                        });
                        const profileRes = await onGetCommonApi('user/profile');
                        updateProfileData(profileRes.data.data);
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
                    goal: selectedGoals,
                });
                navigation.navigate('DietPreferenceScreen');
            }
        }
    };

    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                onPress={() => toggleGoal(item.id)}
                style={{
                    backgroundColor: selectedGoals.includes(item.id) ? COLORS.greyColor : COLORS.primary,
                    borderWidth: 0,
                    borderColor: '#00BCD4',
                    padding: 15,
                    borderRadius: 5,
                    marginBottom: 10,
                }}>
                <Text style={styles.titleText}>{item.name}</Text>
            </TouchableOpacity>
        );
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
                <Header title={'Choose Your Goal'} onPress={() => navigation.goBack()} />
            </View>
            <View style={[styles.container, { backgroundColor: COLORS.backColor }]}>
                <Text style={[styles.titleText, { marginBottom: hp(2), lineHeight: hp(3) }]}>Choose one or more goals to get personalized recommendations</Text>
                <View style={{ maxHeight: '81%' }}>
                    <FlatList
                        data={goalList}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderItem}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: hp(8) }}
                    />
                </View>
                <TouchableOpacity
                    style={[styles.buttonView, { opacity: isLoading ? 0.75 : 1 }]}
                    disabled={isLoading}
                    onPress={() => onGoalPress()}>
                    {isLoading ? (
                        <ActivityIndicator size={'large'} color={COLORS.white} />
                    ) : (
                        <Text style={styles.signinText}>{fromAccount ? 'Save' : 'Next'}</Text>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default GoalSelection;
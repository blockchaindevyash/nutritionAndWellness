import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image,
    ScrollView,
    FlatList,
    Platform,
    PermissionsAndroid,
    ActivityIndicator,
} from 'react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { portraitStyles, landscapeStyles } from './styles';
import useOrientation from '../../components/OrientationComponent';
import Header from '../../components/HeaderComponent';
import { COLORS } from '../../utils';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { hp } from '../../components/responsive';
import { showMessage } from 'react-native-flash-message';
import useAuthStore from '../../store/authStore';
import { useFocusEffect } from '@react-navigation/native';
import { onAddCommonFormApi, onEditCommonFormApi, onGetCommonApi } from '../../services/Api';

const medicalOptions = [
    { id: 1, title: "None" },
    { id: 2, title: "Diabetes" },
    { id: 3, title: "Thyroid" },
    { id: 4, title: "PCOS" },
    { id: 5, title: "High BP" },
    { id: 6, title: "Other" },
];

const MedicalScreen = ({ navigation, route }) => {
    const { updateSignupData, medicalList, profileData, updateProfileData, signupData } = useAuthStore();
    const orientation = useOrientation(); // Get current orientation
    const isPortrait = orientation === 'portrait';
    const styles = isPortrait ? portraitStyles : landscapeStyles;
    const insets = useSafeAreaInsets();
    const [selected, setSelected] = useState([]);
    const [fromAccount, setFromAccount] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [otherText, setOtherText] = useState("");

    useFocusEffect(
        useCallback(() => {
            if (route.params?.item) {
                setSelected(profileData?.medical_conditions.map(item => item.id) || []);
                setFromAccount(true);
            } else {
                setSelected(signupData?.medical_condition);
                setOtherText(signupData?.medical_condition_text || "");
            }
        }, [route.params?.item, profileData?.medical_conditions, signupData?.medical_condition])
    );

    // 🔹 Toggle logic
    const toggleSelect = (item) => {
        let updated = [...selected];
        // -----------------------------------------
        // NONE SELECTED
        // -----------------------------------------
        if (item.name === "None") {
            updated = [item.id];
        } else {
            // Remove NONE if any other selected
            const noneItem = medicalList.find(
                (v) => v.name === "None"
            );
            updated = updated.filter(
                (id) => id !== noneItem?.id
            );
            // Already Selected
            if (updated.includes(item.id)) {
                updated = updated.filter(
                    (id) => id !== item.id
                );
            } else {
                updated.push(item.id);
            }
        }
        setSelected(updated);
    };

    // 🔹 Next button
    const handleNext = async () => {
        if (selected.length === 0) {
            navigation.navigate('DoctorDescription');
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
                    // const medicalIds = profileData?.medical_condition.map(item => item.id);
                    console.log('Profile Data for API:', goalIds, profileData?.medicines);
                    var formdata = new FormData();
                    formdata.append("name", profileData?.name);
                    formdata.append("dob", moment(profileData?.dob).format('DD/MM/YYYY'));
                    formdata.append("gender", profileData?.gender);
                    formdata.append("height", profileData?.height);
                    formdata.append("weight", profileData?.weight);
                    formdata.append("diet", profileData?.diet?.id || '');
                    formdata.append("activity_level", profileData?.activity_level?.id || '');
                    formdata.append("medical_condition_text", otherText);
                    if (profileData.prescription_file) {
                        formdata.append("prescription_file", imageFile);
                    }
                    formdata.append("health_note", profileData?.health_note || '');
                    goalIds.forEach(id => {
                        formdata.append("goal[]", id);
                    });
                    selected.forEach(id => {
                        formdata.append("medical_condition[]", id);
                    });
                    profileData?.medicines?.forEach((medicine, index) => {
                        formdata.append(`current_medicine[${index}][medicine_name]`, medicine.medicine_name);
                        formdata.append(`current_medicine[${index}][dosage]`, medicine.dosage);
                        formdata.append(`current_medicine[${index}][timing]`, medicine.timing);
                        formdata.append(`current_medicine[${index}][additional_notes]`, medicine.additional_notes);
                    });
                    formdata.append("workout_reference", profileData?.workout_reference?.id || '');

                    const response = await onEditCommonFormApi('user/profile', formdata);
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
                console.log("Medical Data:", selected);
                updateSignupData({
                    medical_condition: selected,
                    medical_condition_text: otherText,
                });
                navigation.navigate('DoctorDescription');
            }
        }
        // const formData = {
        //     medical: selected,
        // };


        // navigation.navigate("NextScreen", formData);
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
                <Header title={'Medical Conditions'} onPress={() => navigation.goBack()} />
            </View>
            <View style={[styles.container, { backgroundColor: COLORS.backColor }]}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: hp(10) }}>
                    <Text style={styles.subtitle}>This helps us personalize your diet plan</Text>
                    {medicalList.map((item) => {
                        const isSelected = selected.includes(item.id);
                        return (
                            <View>
                                <TouchableOpacity
                                    key={item.id}
                                    style={[
                                        styles.card,
                                        isSelected && styles.selectedCard,
                                    ]}
                                    onPress={() => toggleSelect(item)}>
                                    <Text style={styles.cardTitle}>
                                        {item.name}
                                    </Text>
                                </TouchableOpacity>
                                {item.name === "Other" && isSelected && (
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Enter your condition..."
                                        value={otherText}
                                        onChangeText={setOtherText}
                                        placeholderTextColor={COLORS.white}
                                    />
                                )}
                            </View>
                        )
                    })}
                </ScrollView>
                <TouchableOpacity
                    style={[styles.buttonView, { opacity: isLoading ? 0.75 : 1 }]}
                    disabled={isLoading}
                    onPress={handleNext}>
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

export default MedicalScreen;
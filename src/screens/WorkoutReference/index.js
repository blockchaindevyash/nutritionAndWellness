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
import React, { useEffect, useState } from 'react';
import { portraitStyles, landscapeStyles } from './styles';
import useOrientation from '../../components/OrientationComponent';
import Header from '../../components/HeaderComponent';
import { useTranslation } from 'react-i18next';
import { COLORS } from '../../utils';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { hp } from '../../components/responsive';
import { showMessage } from 'react-native-flash-message';
import useAuthStore from '../../store/authStore';
import { onRegistrationApi } from '../../services/Api';

const workoutOptions = [
    { id: 1, title: "Home Workout", icon: "🏠" },
    { id: 2, title: "Gym", icon: "🏋️" },
    { id: 3, title: "No Equipment", icon: "🚫" },
    { id: 4, title: "Other", icon: "✍️" }, // ✅ NEW
];

const WorkoutReference = ({ navigation }) => {
    const { updateSignupData, workoutList, signupData } = useAuthStore();
    const orientation = useOrientation(); // Get current orientation
    const isPortrait = orientation === 'portrait';
    const styles = isPortrait ? portraitStyles : landscapeStyles;
    const insets = useSafeAreaInsets();
    const { t } = useTranslation();
    const [selected, setSelected] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [otherText, setOtherText] = useState("");
    const [apiErrorMessage, setApiErrorMessage] = useState('');
    const [apiError, setApiError] = useState(false);

    // 🔹 Toggle logic
    const toggleSelect = (item) => {
        setSelected(item.id);
    };

    // 🔹 Next button
    const handleNext = async () => {
        if (selected == '') {
            showMessage({
                message: t('please_select_workout'),
                type: 'danger',
                duration: 4000,
                icon: 'danger',
            });
            return;
        } else {
            updateSignupData({
                workout_reference: selected,
            });
            console.log("Medical Data:", signupData);
            try {
                setIsLoading(true);
                var formdata = new FormData();
                formdata.append("name", signupData?.name);
                formdata.append("mobileno", signupData?.mobileno);
                formdata.append("email", signupData?.email);
                formdata.append("password", signupData?.password);
                formdata.append("confirm_password", signupData?.password);
                formdata.append("dob", signupData?.dob);
                formdata.append("gender", signupData?.gender);
                formdata.append("height", signupData?.height);
                formdata.append("weight", signupData?.weight);
                // formdata.append("goal", signupData?.goal);
                formdata.append("diet", signupData?.diet);
                formdata.append("activity_level", signupData?.activity_level);
                // formdata.append("medical_condition", signupData?.medical_condition);
                formdata.append("medical_condition_text", signupData?.medical_condition_text);
                if (signupData.prescription_file != null) {
                    formdata.append("prescription_file", signupData?.prescription_file);
                }
                formdata.append("health_note", signupData?.health_note);
                // formdata.append("current_medicine", signupData?.current_medicine);
                signupData?.goal?.forEach(id => {
                    formdata.append("goal[]", id);
                });
                signupData?.medical_condition?.forEach(id => {
                    formdata.append("medical_condition[]", id);
                });
                signupData?.current_medicine?.forEach((medicine, index) => {
                    formdata.append(`current_medicine[${index}][medicine_name]`, medicine.medicine_name);
                    formdata.append(`current_medicine[${index}][dosage]`, medicine.dosage);
                    formdata.append(`current_medicine[${index}][timing]`, medicine.timing);
                    formdata.append(`current_medicine[${index}][additional_notes]`, medicine.additional_notes);
                });
                formdata.append("workout_reference", selected);

                const responseData = await onRegistrationApi(formdata);
                if (responseData.data.status) {
                    setIsLoading(false);
                    showMessage({
                        message: t('register_successfully'),
                        type: 'success',
                        duration: 6000,
                        icon: 'success',
                    });
                    navigation.replace('LoginScreen');
                } else {
                    showMessage({
                        message: responseData.data.message,
                        type: 'danger',
                        duration: 4000,
                        icon: 'danger',
                    });
                    // setApiError(true);
                    // setApiErrorMessage('Invalid Credentials');
                    setIsLoading(false);
                    console.log('onRegistrationApi response else', responseData.data);
                }
            } catch (err) {
                console.log('onRegistrationApi error', err?.response || err);
                showMessage({
                    message: err?.response?.data?.message || t('something_went_wrong'),
                    type: 'danger',
                    duration: 4000,
                    icon: 'danger',
                });
                // setApiError(true);
                // setApiErrorMessage(err?.response?.data?.message ||
                //     'Something went wrong. Please try again.');
                setIsLoading(false);
            }
            // navigation.navigate('TabStack');
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
                <Header title={t('workout_reference')} onPress={() => navigation.goBack()} />
            </View>
            <View style={[styles.container, { backgroundColor: COLORS.backColor }]}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: hp(10) }}>
                    <Text style={styles.subtitle}>{t('workout_personalization')}</Text>
                    {workoutList.map((item) => {
                        return (
                            <View>
                                <TouchableOpacity
                                    key={item.id}
                                    style={[
                                        styles.card,
                                        selected === item.id && styles.selectedCard,
                                    ]}
                                    onPress={() => toggleSelect(item)}>
                                    <Text style={[styles.cardTitle]}>
                                        {item.name}
                                    </Text>
                                </TouchableOpacity>
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
                        <Text style={styles.signinText}>{t('submit')}</Text>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default WorkoutReference;
import React, { useCallback, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Image,
    Alert,
    ActivityIndicator,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { pick } from '@react-native-documents/picker'
import ImagePicker from 'react-native-image-crop-picker';
import { portraitStyles, landscapeStyles } from './styles';
import useOrientation from '../../components/OrientationComponent';
import Header from '../../components/HeaderComponent';
import { COLORS } from '../../utils';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { showMessage } from "react-native-flash-message";
import useAuthStore from "../../store/authStore";
import { useFocusEffect } from "@react-navigation/native";
import { onAddCommonFormApi, onGetCommonApi } from "../../services/Api";
import camera from '../../images/camera.png';
import document from '../../images/document.png';
import moment from "moment";
import { useTranslation } from 'react-i18next';
import { hp } from "../../components/responsive";

const DoctorDescriptionScreen = ({navigation, route}) => {
    const {updateSignupData, profileData, updateProfileData, signupData} = useAuthStore();
    const orientation = useOrientation();
    const isPortrait = orientation === 'portrait';
    const styles = isPortrait ? portraitStyles : landscapeStyles;
    const insets = useSafeAreaInsets();
    const [doctorNotes, setDoctorNotes] = useState("");
    const [documentFile, setDocumentFile] = useState(null);
    const [selectedTags, setSelectedTags] = useState([]);
    const [fromAccount, setFromAccount] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { t } = useTranslation();

    useFocusEffect(
        useCallback(() => {
            if (route.params?.item) {
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
                setDocumentFile({
                    uri: imageUrl,
                    type: mimeType,
                    name: imageUrl.split('/').pop(),
                });
                setDoctorNotes(profileData.health_note || "");
                setFromAccount(true);
            } else {
                setDocumentFile(signupData?.prescription_file);
                setDoctorNotes(signupData?.health_note || "");
            }
        }, [route.params?.item, profileData?.prescription_file, signupData?.prescription_file])
    );

    // ----------------------------
    // Pick Document
    // ----------------------------
    const pickDocument = async () => {
        try {
            const [result] = await pick({
                mode: 'open'
            });
            console.log("Selected File:", result);
            let document = {
                uri: result.uri,
                type: result.type,
                name: result.name,
            };
            setDocumentFile(document);
        } catch (error) {
            console.log("Document Error:", error);
        }
    };

    const takePhoto = async () => {
        try {
            const result = await ImagePicker.openCamera({
                cropping: false,
                mediaType: 'photo',
                compressImageQuality: 0.8,
            });
            console.log('Camera result:', result);
            const document = {
                uri: result.path,
                type: result.mime || 'image/jpeg',
                name: result.filename || `camera-${Date.now()}.jpg`,
            };
            setDocumentFile(document);
        } catch (error) {
            if (error.code !== 'E_PICKER_CANCELLED') {
                console.log('Camera Error:', error);
            }
        }
    };

    const removeFile = () => {
        setDocumentFile(null);
    };

    const handleContinue = async () => {
        if (!doctorNotes.trim() && !documentFile) {
            navigation.navigate('MedicineDetailScreen');
        } else {
            if (fromAccount) {
                try {
                    setIsLoading(true);
                    const goalIds = profileData?.goals.map(item => item.id);
                    const medicalIds = profileData?.medical_conditions.map(item => item.id);
                    console.log('Profile Data for API:', goalIds, profileData);
                    var formdata = new FormData();
                    formdata.append("name", profileData?.name);
                    formdata.append("dob", moment(profileData?.dob).format('DD/MM/YYYY'));
                    formdata.append("gender", profileData?.gender);
                    formdata.append("height", profileData?.height);
                    formdata.append("weight", profileData?.weight);
                    formdata.append("diet", profileData?.diet?.id || '');
                    formdata.append("activity_level", profileData?.activity_level?.id || '');
                    formdata.append("medical_condition_text", profileData?.medical_condition_text || '');
                    if (documentFile != null) {
                        formdata.append("prescription_file", documentFile);
                    }
                    formdata.append("health_note", doctorNotes || '');
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
                    prescription_file: documentFile,
                    health_note: doctorNotes,
                });
                navigation.navigate('MedicineDetailScreen');
            }
        }
    };

    const handleTagPress = (item) => {
        let updatedTags = [];
        // Remove if already selected
        if (selectedTags.includes(item)) {
            updatedTags = selectedTags.filter(tag => tag !== item);
        } else {
            // Add item
            updatedTags = [...selectedTags, item];
        }
        setSelectedTags(updatedTags);
        // Update Notes
        const notesText = updatedTags
            .map(tag => `• ${tag}`)
            .join("\n");
        setDoctorNotes(notesText);
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
                <Header title={t('header_doctor_recommendations')} onPress={() => navigation.goBack()} />
            </View>
            <View style={[styles.mainView, { backgroundColor: COLORS.backColor }]}>
            <ScrollView
                contentContainerStyle={{paddingBottom: hp(20), padding: 15}}
                showsVerticalScrollIndicator={false}>
                {/* Header */}
                <Text style={styles.subtitle}>
                    {t('doctor_advice')}
                </Text>
                {/* Upload Section */}
                <View style={styles.uploadContainer}>
                    <Text style={styles.uploadTitle}>
                        {t('upload_prescription_report')}
                    </Text>
                    <View style={styles.uploadOptionsRow}>
                        <TouchableOpacity
                            style={styles.uploadOptionBox}
                            onPress={() => pickDocument()}>
                            <Image source={document} style={styles.optionImageStyle} />
                            <Text style={styles.uploadText}>{t('upload_file')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.uploadOptionBox}
                            onPress={() => takePhoto()}>
                            <Image source={camera} style={styles.optionImageStyle} />
                            <Text style={styles.uploadText}>{t('use_camera')}</Text>
                        </TouchableOpacity>
                    </View>
                    {/* Preview */}
                    {documentFile && (
                        <View style={styles.previewCard}>
                            <View style={styles.fileHeader}>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.fileName} numberOfLines={1}>
                                        {documentFile.name}
                                    </Text>
                                    <Text style={styles.fileType}>
                                        {documentFile.type}
                                    </Text>
                                </View>
                                <TouchableOpacity onPress={removeFile}>
                                    <Text style={styles.removeText}>
                                        {t('remove')}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            {/* Image Preview */}
                            {documentFile.type?.includes("image") && (
                                <Image
                                    source={{ uri: documentFile.uri }}
                                    style={styles.previewImage}
                                    resizeMode="cover"
                                />
                            )}
                            {/* PDF Preview */}
                            {documentFile.type?.includes("pdf") && (
                                <View style={styles.pdfBox}>
                                    <Text style={styles.pdfText}>
                                        {t('pdf_document_selected')}
                                    </Text>
                                </View>
                            )}
                        </View>
                    )}
                </View>
                {/* Doctor Notes Card */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>
                        {t('health_notes')}
                    </Text>
                    <TextInput
                        placeholder={`Example:\n• Avoid sugar\n• Low sodium diet\n• Daily walking recommended\n• Thyroid-friendly foods`}
                        placeholderTextColor="#eee"
                        multiline
                        value={doctorNotes}
                        onChangeText={setDoctorNotes}
                        style={styles.input}
                        textAlignVertical="top"
                        maxLength={500}
                    />
                    <Text style={styles.limitText}>
                        {doctorNotes.length}/500
                    </Text>
                </View>
                {/* Suggestions */}
                <View style={styles.suggestionContainer}>
                    <Text style={styles.suggestionTitle}>
                        {t('common_instructions')}
                    </Text>
                    <View style={styles.tagsContainer}>
                        {[
                            t('low_sugar'),
                            t('high_protein'),
                            t('low_carb'),
                            t('low_sodium'),
                            t('daily_walking'),
                            t('avoid_junk_food'),
                            t('more_water'),
                            t('thyroid_diet'),
                        ].map((item, index) => {
                        const isSelected = selectedTags.includes(item);
                        return (
                            <TouchableOpacity
                                key={index}
                                style={[styles.tag,
                                    isSelected && styles.selectedTag,
                                ]}
                                onPress={() => handleTagPress(item)}>
                                <Text style={[styles.tagText,
                                    isSelected && styles.selectedTagText,
                                ]}>
                                    {item}
                                </Text>
                            </TouchableOpacity>
                        )})}
                    </View>
                </View>
                {/* Bottom Button */}
                <View style={styles.footer}>
                    <TouchableOpacity
                        style={styles.button}
                        disabled={isLoading}
                        onPress={handleContinue}>
                            {isLoading ? (
                                <ActivityIndicator size={'large'} color={COLORS.white} />
                            ) : (
                                <Text style={styles.buttonText}>{t('next')}</Text>
                            )}
                    </TouchableOpacity>
                </View>
            </ScrollView>

            </View>
        </View>
    );
};

export default DoctorDescriptionScreen;

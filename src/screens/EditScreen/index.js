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
    Modal,
    TouchableWithoutFeedback,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { portraitStyles, landscapeStyles } from './styles';
import useOrientation from '../../components/OrientationComponent';
import { COLORS } from '../../utils';
import user from '../../images/user.png';
import rightArrow from '../../images/rightArrow.png';
import { hp, wp } from '../../components/responsive';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import SelectDropdown from 'react-native-select-dropdown';
import down from '../../images/down.png';
import Header from '../../components/HeaderComponent';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useAuthStore from '../../store/authStore';
import { showMessage } from 'react-native-flash-message';
import { onAddCommonFormApi, onGetCommonApi } from '../../services/Api';

const genderArray = [
    { id: 1, value: 'Male' },
    { id: 2, value: 'Female' },
];

const EditScreen = ({ navigation }) => {
    const {profileData, updateProfileData} = useAuthStore();
    const orientation = useOrientation(); // Get current orientation
    const isPortrait = orientation === 'portrait';
    const insets = useSafeAreaInsets();
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState(false);
    const [dob, setDob] = useState(null);
    const [dobError, setDobError] = useState(false);
    const [gender, setGender] = useState('');
    const [genderError, setGenderError] = useState(false);
    const [height, setHeight] = useState('');
    const [heightError, setHeightError] = useState(false);
    const [weight, setWeight] = useState('');
    const [weightError, setWeightError] = useState(false);
    const [dateModalVisible, setDateModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const styles = isPortrait ? portraitStyles : landscapeStyles;

    useEffect(() => {
        if (profileData) {
            setName(profileData?.name || '');
            setDob(profileData?.dob || null);
            setGender(profileData?.gender || '');
            setHeight(profileData?.height || '');
            setWeight(profileData?.weight || '');
        }
    }, [profileData]);

    const onSaveProfileData = async () => {
        if (name == '') {
            setNameError(true);
        } else if (dob == null) {
            setDobError(true);
        } else if (gender == '') {
            setGenderError(true);
        } else if (height == '') {
            setHeightError(true);
        } else if (weight == '') {
            setWeightError(true);
        } else {
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
                // PDF
                case "pdf":
                    mimeType = "application/pdf";
                    break;
                }
                const imageFile = {
                    uri: imageUrl,
                    type: mimeType,
                    name: imageUrl.split('/').pop(),
                };
                const goalIds = profileData?.goal.map(item => item.id);
                const medicalIds = profileData?.medical_condition.map(item => item.id);
                var formdata = new FormData();
                formdata.append("name", name);
                formdata.append("dob", dob);
                formdata.append("gender", gender);
                formdata.append("height", height);
                formdata.append("weight", weight);
                // formdata.append("goal", goalIds);
                formdata.append("diet", profileData?.diet?.id);
                formdata.append("activity_level", profileData?.activity_level?.id);
                // formdata.append("medical_condition", medicalIds);
                formdata.append("medical_condition_text", profileData?.medical_condition_text);
                formdata.append("prescription_file", imageFile);
                formdata.append("health_note", profileData?.health_note);
                // formdata.append("current_medicine", profileData?.current_medicine);
                goalIds.forEach(id => {
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
                    setIsLoading(false);
                    const profileRes = await onGetCommonApi('user/profile');
                    updateProfileData(profileRes.data.data);
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
                console.log('Error saving profile data:', error);
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
                <Header title={'Edit Profile'} onPress={() => navigation.goBack()} />
            </View>
            <View style={styles.editTextInputView}>
                <>
                <View style={styles.textInputView}>
                    <Text style={styles.titleText}>Name</Text>
                    <TextInput
                        value={name}
                        onChangeText={text => {
                            setName(text);
                        }}
                        placeholder="Enter Name"
                        placeholderTextColor={COLORS.greyColor}
                        style={[styles.textInput, { color: COLORS.white, width: '100%' }]}
                        keyboardType={'email-address'}
                        textContentType={'none'}
                        autoCapitalize={'none'}
                    />
                </View>
                {nameError && (
                    <Text style={styles.errorText}>
                        {'name is required.'}
                    </Text>
                )}
                <View style={styles.textInputView}>
                    <Text style={styles.titleText}>Date of Birth</Text>
                    <Text
                        style={[
                            styles.textInput,
                            { width: '100%', color: COLORS.white },
                        ]}
                        onPress={() => setDateModalVisible(!dateModalVisible)}>
                        {dob != null ? moment(dob).format('DD/MM/YYYY') : 'DD/MM/YYYY'}
                    </Text>
                    {Platform.OS == 'android' ? (
                        dateModalVisible && (
                            <DateTimePicker
                                value={dob != null ? dob : new Date()}
                                mode="date"
                                display="spinner"
                                onChange={(event, selectedDate) => {
                                    if (selectedDate) {
                                        setDob(selectedDate);
                                    }
                                    setDateModalVisible(false);
                                }}
                            />
                        )
                    ) : (
                        <Modal
                            animationType="fade"
                            transparent={true}
                            visible={dateModalVisible}
                            onRequestClose={() => setDateModalVisible(false)}>
                            <View style={styles.maneModalView}>
                                <TouchableWithoutFeedback
                                    onPress={() => {
                                        setDateModalVisible(false);
                                    }}>
                                    <View style={styles.modalOverlay} />
                                </TouchableWithoutFeedback>
                                <View style={styles.container1}>
                                    <DateTimePicker
                                        value={dob != null ? dob : new Date()}
                                        mode="date"
                                        display="spinner"
                                        onChange={(event, selectedDate) => {
                                            if (selectedDate) {
                                                setDob(selectedDate);
                                            }
                                        }}
                                    />
                                </View>
                            </View>
                        </Modal>
                    )}
                </View>
                {dobError && (
                    <Text style={styles.errorText}>
                        {'Date of birth is required.'}
                    </Text>
                )}
                <View style={styles.textInputView}>
                    <Text style={styles.titleText}>Gender</Text>
                    <SelectDropdown
                        data={genderArray}
                        dropdownOverlayColor='transparent'
                        onSelect={(selectedItem, index) => {
                            setGender(selectedItem?.value);
                            console.log('gert Value:::', selectedItem?.value);
                        }}
                        renderButton={(selectedItem, isOpen) => {
                            return (
                                <View style={[styles.dropdown2BtnStyle2, { marginTop: hp(0.5) }]}>
                                    {gender != '' ? (
                                        <Text style={styles.dropdownItemTxtStyle}>
                                            {gender == selectedItem?.value
                                                ? selectedItem?.value
                                                : gender}
                                        </Text>
                                    ) : (
                                        <Text style={styles.dropdownItemTxtStyle}>
                                            {selectedItem?.value || 'Select Gender'}
                                        </Text>
                                    )}
                                    <View style={{ width: wp(7) }}>
                                        <Image style={styles.filterImage} source={down} />
                                    </View>
                                </View>
                            );
                        }}
                        showsVerticalScrollIndicator={false}
                        renderItem={(item, index, isSelected) => {
                            return (
                                <TouchableOpacity style={styles.dropdownView}>
                                    <Text style={styles.dropdownItemTxtStyle}>
                                        {item?.value}
                                    </Text>
                                </TouchableOpacity>
                            );
                        }}
                        dropdownIconPosition={'left'}
                        dropdownStyle={styles.dropdown2DropdownStyle}
                    />
                </View>
                {genderError && (
                    <Text style={styles.errorText}>
                        {'Gender is required.'}
                    </Text>
                )}
                <View style={styles.textInputView}>
                    <Text style={styles.titleText}>Height</Text>
                    <TextInput
                        value={height}
                        onChangeText={text => {
                            setHeight(text);
                        }}
                        placeholder="Enter Height"
                        placeholderTextColor={COLORS.greyColor}
                        style={[styles.textInput, { color: COLORS.white, width: '100%' }]}
                    />
                </View>
                {heightError && (
                    <Text style={styles.errorText}>
                        {'Height is required.'}
                    </Text>
                )}
                <View style={styles.textInputView}>
                    <Text style={styles.titleText}>Weight</Text>
                    <TextInput
                        value={weight}
                        onChangeText={text => {
                            setWeight(text);
                        }}
                        placeholder="Enter Weight"
                        placeholderTextColor={COLORS.greyColor}
                        style={[styles.textInput, { color: COLORS.white, width: '100%' }]}
                    />
                </View>
                {weightError && (
                    <Text style={styles.errorText}>
                        {'Weight is required.'}
                    </Text>
                )}
                </>
                <TouchableOpacity style={styles.logoutButton} onPress={() => onSaveProfileData()}>
                    <Text style={styles.logoutText}>Save</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default EditScreen;
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
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { portraitStyles, landscapeStyles } from './styles';
import useOrientation from '../../components/OrientationComponent';
import { COLORS } from '../../utils';
import pencil from '../../images/pencil.png';
import user from '../../images/user.png';
import down from '../../images/down.png';
import rightArrow from '../../images/rightArrow.png';
import { hp, wp } from '../../components/responsive';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useAuthStore from '../../store/authStore';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import { changeAppLanguage } from '../../i18n';
import SelectDropdown from 'react-native-select-dropdown';

const LANGS = [
  { code: 'en', labelKey: 'English' },
  { code: 'vi', labelKey: 'Vietnamese' },
  { code: 'es', labelKey: 'Spanish' },
  { code: 'ja', labelKey: 'Japanese' },
  { code: 'zh', labelKey: 'Chinese' },
  { code: 'ko', labelKey: 'Korean' },
];

const AccountScreen = ({ navigation }) => {
    const { t, i18n } = useTranslation();
    const {profileData, updateProfileData, updateSignupData} = useAuthStore();
    const orientation = useOrientation(); // Get current orientation
    const isPortrait = orientation === 'portrait';
    const insets = useSafeAreaInsets();
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [email, setEmail] = useState('');
    const [nameError, setNameError] = useState(false);
    const [numberError, setNumberError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState('');
    const [languageValue, setLanguageValue] = useState('');
    const styles = isPortrait ? portraitStyles : landscapeStyles;

    const calculateAge = (dob) => {
        return moment().diff(
            moment(dob, "YYYY-MM-DD"),
            "years"
        );
    };

    const onLogout = async () => {
        // Clear user data from AsyncStorage
        AsyncStorage.removeItem('accessToken');
        AsyncStorage.removeItem('userId');
        updateProfileData(null);
        updateSignupData({
            name: "",
            email: "",
            mobileno: "",
            password: "",
            dob: "",
            gender: "",
            height: "",
            weight: "",
            goal: [],
            diet: "",
            activity_level: "",
            medical_condition: [],
            medical_condition_text: "",
            prescription_file: null,
            health_note: "",
            current_medicine: [],
            workout_reference: "",
        });
        // Navigate to the login screen
        navigation.reset({
            index: 0,
            routes: [{ name: 'LoginScreen' }],
        });
    };

    const select = async (code) => {
        await changeAppLanguage(code);
        setOpen(code);
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
            <ScrollView contentContainerStyle={{paddingBottom: hp(5)}}>
            <View style={styles.editTextInputView}>
                <View style={styles.optionView1}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image style={{width: wp(10), height: hp(6), resizeMode: 'contain', tintColor: COLORS.white}} source={user} />
                    <View style={{marginLeft: wp(3)}}>
                        <Text style={styles.detailText}>{profileData?.name}</Text>
                        <Text style={[styles.detailText1, {color: COLORS.greyColor}]}>{t('edit_profile')}</Text>
                    </View>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('EditScreen')}>
                        <Image style={[styles.editImage, {tintColor: COLORS.secondary}]} source={pencil} />
                    </TouchableOpacity>
                </View>
                <View style={styles.detailView}>
                    <View style={styles.optionView}>
                        <Text style={[styles.detailText,{color: COLORS.secondary}]}>{t('age')}</Text>
                        <Text style={styles.detailText1}>{calculateAge(profileData?.dob)}</Text>
                    </View>
                    <View style={styles.optionView}>
                        <Text style={[styles.detailText,{color: COLORS.secondary}]}>{t('height')}</Text>
                        <Text style={styles.detailText1}>{profileData?.height} cm</Text>
                    </View>
                    <View style={styles.optionView}>
                        <Text style={[styles.detailText,{color: COLORS.secondary}]}>{t('weight')}</Text>
                        <Text style={styles.detailText1}>{profileData?.weight}</Text>
                    </View>
                </View>
                <View style={styles.optionView}>
                    <Text style={styles.detailText}>{'Languages'}</Text>
                    <SelectDropdown
                        data={LANGS}
                        defaultValueByIndex={0}
                        dropdownOverlayColor="transparent"
                        onSelect={(selectedItem, index) => {
                            select(selectedItem?.code);
                            setLanguageValue(selectedItem?.labelKey);
                            console.log('gert Value:::', selectedItem?.value);
                        }}
                        renderButton={(selectedItem, isOpen) => {
                            return (
                                <View style={[styles.dropdown2BtnStyle2, { marginTop: hp(0.5) }]}>
                                    {languageValue != '' ? (
                                        <Text style={styles.dropdownItemTxtStyle}>
                                            {languageValue == selectedItem?.labelKey
                                                ? selectedItem?.labelKey
                                                : languageValue}
                                        </Text>
                                    ) : (
                                        <Text style={styles.dropdownItemTxtStyle}>
                                            {selectedItem?.labelKey || t('select_gender')}
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
                                        {item?.labelKey}
                                    </Text>
                                </TouchableOpacity>
                            );
                        }}
                        dropdownIconPosition={'left'}
                        dropdownStyle={styles.dropdown2DropdownStyle}
                    />
                </View>
                <TouchableOpacity style={styles.optionView} onPress={() => navigation.navigate('DietPreferenceScreen', {item: profileData})}>
                    <Text style={styles.detailText}>{t('diet')}</Text>
                    <Image style={styles.editImage} source={rightArrow} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionView} onPress={() => navigation.navigate('GoalSelection', {item: profileData})}>
                    <Text style={styles.detailText}>{t('goal')}</Text>
                    <Image style={styles.editImage} source={rightArrow} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionView} onPress={() => navigation.navigate('SaveRecipeScreen')}>
                    <Text style={styles.detailText}>{t('saved_recipes')}</Text>
                    <Image style={styles.editImage} source={rightArrow} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionView} onPress={() => navigation.navigate('CommunityForum')}>
                    <Text style={styles.detailText}>{t('community_forum')}</Text>
                    <Image style={styles.editImage} source={rightArrow} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionView} onPress={() => navigation.navigate('ActivityLevelScreen', {item: profileData})}>
                    <Text style={styles.detailText}>{t('activity_level')}</Text>
                    <Image style={styles.editImage} source={rightArrow} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionView} onPress={() => navigation.navigate('MedicalScreen', {item: profileData})}>
                    <Text style={styles.detailText}>{t('medical_conditions')}</Text>
                    <Image style={styles.editImage} source={rightArrow} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionView} onPress={() => navigation.navigate('DoctorDescription', {item: profileData})}>
                    <Text style={styles.detailText}>{t('header_doctor_recommendations')}</Text>
                    <Image style={styles.editImage} source={rightArrow} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionView} onPress={() => navigation.navigate('ConsultantScreen')}>
                    <Text style={styles.detailText}>{t('consultant')}</Text>
                    <Image style={styles.editImage} source={rightArrow} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionView} onPress={() => navigation.navigate('HomeScreen')}>
                    <Text style={styles.detailText}>{t('food_recipes')}</Text>
                    <Image style={styles.editImage} source={rightArrow} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionView} onPress={() => navigation.navigate('ChangePassword')}>
                    <Text style={styles.detailText}>{t('change_password')}</Text>
                    <Image style={styles.editImage} source={rightArrow} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionView} onPress={() => navigation.navigate('AdviserScreen')}>
                    <Text style={styles.detailText}>{t('wellness_adviser')}</Text>
                    <Image style={styles.editImage} source={rightArrow} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionView} onPress={() => navigation.navigate('NotificationScreen')}>
                    <Text style={styles.detailText}>{t('notification')}</Text>
                    <Image style={styles.editImage} source={rightArrow} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionView}>
                    <Text style={styles.detailText}>{t('term_conditions')}</Text>
                    <Image style={styles.editImage} source={rightArrow} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionView}>
                    <Text style={styles.detailText}>{t('privacy_policy')}</Text>
                    <Image style={styles.editImage} source={rightArrow} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.logoutButton} onPress={() => onLogout()}>
                    <Text style={styles.logoutText}>{t('logout')}</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
        </View>
    );
};

export default AccountScreen;
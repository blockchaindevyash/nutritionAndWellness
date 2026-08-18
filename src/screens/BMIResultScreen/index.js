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
import React, { useCallback, useEffect, useState } from 'react';
import { portraitStyles, landscapeStyles } from './styles';
import useOrientation from '../../components/OrientationComponent';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
    import { useTranslation } from 'react-i18next';
import { COLORS, Fonts } from '../../utils/index';
import Header from '../../components/HeaderComponent';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { hp, wp } from '../../components/responsive';
import SelectDropdown from 'react-native-select-dropdown';
import down from '../../images/down.png';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useAuthStore from '../../store/authStore';
import { useFocusEffect } from '@react-navigation/native';

const genderArray = [
    { id: 1, value: 'Male' },
    { id: 2, value: 'Female' },
];

const BMIResultScreen = ({navigation, route}) => {
    const { t } = useTranslation();
    const orientation = useOrientation(); // Get current orientation
    const isPortrait = orientation === 'portrait';
    const insets = useSafeAreaInsets();
    const [isLoading, setIsLoading] = useState(false);
    const styles = isPortrait ? portraitStyles : landscapeStyles;

     useFocusEffect(
            useCallback(() => {

            }, [])
        );

    return (
        <KeyboardAwareScrollView contentContainerStyle={styles.safeAreaStyle}>
            <View
                style={{
                    width: '100%',
                    paddingTop: insets.top,
                    backgroundColor: COLORS.primary,
                }}
            />
            <View style={[styles.container, { backgroundColor: COLORS.backColor }]}>
                <View style={styles.headerView}>
                    <Header title={t('basic_information')} onPress={() => {signupData?.verify_phone ? navigation.navigate('SignupScreen') : navigation.goBack()}} />
                </View>
                <View style={styles.mainView}>
                    <Text style={styles.titleText}>{t('gender')}</Text>
                    <SelectDropdown
                        data={genderArray}
                        dropdownOverlayColor='transparent'
                        onSelect={(selectedItem, index) => {
                            setGender(selectedItem?.value);
                            console.log('gert Value:::', selectedItem?.value);
                        }}
                        renderButton={(selectedItem, isOpen) => {
                            return (
                                <View style={[styles.dropdown2BtnStyle2, {marginTop: hp(0.5)}]}>
                                    {gender != '' ? (
                                        <Text style={styles.dropdownItemTxtStyle}>
                                            {gender == selectedItem?.value
                                                ? selectedItem?.value
                                                : gender}
                                        </Text>
                                    ) : (
                                        <Text style={styles.dropdownItemTxtStyle}>
                                            {selectedItem?.value || t('select_gender')}
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
                    {genderError && (
                        <Text style={styles.errorText}>
                            {t('gender_is_required')}
                        </Text>
                    )}
                    <Text style={styles.titleText}>{t('height')+' (cm)'}</Text>
                    <TextInput
                        value={height}
                        onChangeText={text => {
                            setHeight(text);
                            setHeightError(false);
                            setApiError(false);
                        }}
                        placeholder={t('enter_height')}
                        keyboardType='numeric'
                        placeholderTextColor={COLORS.greyColor}
                        style={[styles.textInput]}
                    />
                    {heightError && (
                        <Text style={styles.errorText}>
                            {t('height_is_required')}
                        </Text>
                    )}
                    <Text style={styles.titleText}>{t('weight')+' (kg)'}</Text>
                    <TextInput
                        value={weight}
                        onChangeText={text => {
                            setWeight(text);
                            setWeightError(false);
                            setApiError(false);
                        }}
                        keyboardType='numeric'
                        placeholder={t('enter_weight')}
                        placeholderTextColor={COLORS.greyColor}
                        style={[styles.textInput]}
                    />
                    {weightError && (
                        <Text style={styles.errorText}>
                            {t('weight_is_required')}
                        </Text>
                    )}
                    <TouchableOpacity
                        style={[styles.buttonView, { opacity: isLoading ? 0.75 : 1 }]}
                        disabled={isLoading}>
                        {isLoading ? (
                            <ActivityIndicator size={'large'} color={COLORS.white} />
                        ) : (
                            <Text style={styles.signinText}>{t('next')}</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAwareScrollView>
    );
};

export default BMIResultScreen;
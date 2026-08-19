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
import { hp, normalize, wp } from '../../components/responsive';
import SelectDropdown from 'react-native-select-dropdown';
import man from '../../images/man.png';
import people from '../../images/people.png';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useAuthStore from '../../store/authStore';
import { useFocusEffect } from '@react-navigation/native';

const genderArray = [
    { id: 1, value: 'Male' },
    { id: 2, value: 'Female' },
];

const BMIScreen = ({ navigation, route }) => {
    const { t } = useTranslation();
    const { signupData, updateSignupData } = useAuthStore();
    const orientation = useOrientation(); // Get current orientation
    const isPortrait = orientation === 'portrait';
    const insets = useSafeAreaInsets();
    const [gender, setGender] = useState(false);
    const [height, setHeight] = useState('');
    const [heightError, setHeightError] = useState(false);
    const [weight, setWeight] = useState('');
    const [weightError, setWeightError] = useState(false);
    const [apiError, setApiError] = useState(false);
    const [apiErrorMessage, setApiErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [bmiResult, setBmiResult] = useState(0);
    const [bmiResultText, setBmiResultText] = useState('');
    const [dateModalVisible, setDateModalVisible] = useState(false);
    const [calculateLoading, setCalculateLoading] = useState(false);
    const [heightOption, setHeightOption] = useState('cm');
    const [weightOption, setWeightOption] = useState('kg');
    const styles = isPortrait ? portraitStyles : landscapeStyles;

    useFocusEffect(
        useCallback(() => {
            if (signupData?.dob != '') {
                setDob(signupData?.dob ? moment(signupData?.dob, 'DD/MM/YYYY').toDate() : null);
                setGender(signupData?.gender);
                setHeight(signupData?.height);
                setWeight(signupData?.weight);
            }
        }, [signupData?.dob])
    );

    // const calculateBMI = () => {
    //     if (height == '') {
    //         setHeightError(true);
    //     } else if (weight == '') {
    //         setWeightError(true);
    //     } else {
    //         //heightOption = cm, inches
    //         //weightOption = kg, lbs
    //         //gender = true means female, false means male
    //         setCalculateLoading(true);
    //     setDateModalVisible(true);
    //     const weightKg = parseFloat(weight);
    //     const heightCm = parseFloat(height);

    //     if (!weightKg || !heightCm || heightCm <= 0) {
    //         setCalculateLoading(false);
    //         return null;
    //     }

    //     const heightM = heightCm / 100;

    //     const bmi = weightKg / (heightM * heightM);
    //     let finalResult = Number(bmi.toFixed(1));
    //     setBmiResult(finalResult);
    //     if (finalResult < 18.5) {
    //         setBmiResultText('Underweight');
    //         setCalculateLoading(false);
    //     } else if (finalResult < 25) {
    //         setBmiResultText('Normal weight');
    //         setCalculateLoading(false);
    //     } else if (finalResult < 30) {
    //         setBmiResultText('Overweight');
    //         setCalculateLoading(false);
    //     } else {
    //         setBmiResultText('Obesity');
    //         setCalculateLoading(false);
    //     }
    // }
    // };

    const calculateBMI = () => {
        if (height === '') {
            setHeightError(true);
            return;
        }

        if (weight === '') {
            setWeightError(true);
            return;
        }

        setHeightError(false);
        setWeightError(false);
        setCalculateLoading(true);

        const heightValue = parseFloat(height);
        const weightValue = parseFloat(weight);

        if (
            isNaN(heightValue) ||
            isNaN(weightValue) ||
            heightValue <= 0 ||
            weightValue <= 0
        ) {
            setCalculateLoading(false);
            return;
        }

        let bmi = 0;

        // Height: CM + Weight: KG
        if (heightOption === 'cm' && weightOption === 'kg') {
            const heightM = heightValue / 100;

            bmi = weightValue / (heightM * heightM);
        }

        // Height: CM + Weight: LBS
        else if (heightOption === 'cm' && weightOption === 'lbs') {
            const weightKg = weightValue * 0.453592;
            const heightM = heightValue / 100;

            bmi = weightKg / (heightM * heightM);
        }

        // Height: Inches + Weight: KG
        else if (heightOption === 'inches' && weightOption === 'kg') {
            const heightM = heightValue * 0.0254;

            bmi = weightValue / (heightM * heightM);
        }

        // Height: Inches + Weight: LBS
        else if (heightOption === 'inches' && weightOption === 'lbs') {
            bmi = (weightValue * 703) / (heightValue * heightValue);
        }

        if (!isFinite(bmi) || bmi <= 0) {
            setCalculateLoading(false);
            return;
        }

        const finalResult = Number(bmi.toFixed(1));

        setBmiResult(finalResult);

        // Standard adult BMI categories
        if (finalResult < 18.5) {
            setBmiResultText('Underweight');
        } else if (finalResult < 25) {
            setBmiResultText('Normal weight');
        } else if (finalResult < 30) {
            setBmiResultText('Overweight');
        } else {
            setBmiResultText('Obesity');
        }

        // Gender does not change standard BMI calculation.
        // true = female
        // false = male
        //   console.log('Gender:', gender ? 'Female' : 'Male');
        //   console.log('Height:', heightValue, heightOption);
        //   console.log('Weight:', weightValue, weightOption);
        //   console.log('BMI:', finalResult);

        setDateModalVisible(true);
        setCalculateLoading(false);
    };

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
                    <Header title={t('bmi_calculator')} onPress={() => { signupData?.verify_phone ? navigation.navigate('SignupScreen') : navigation.goBack() }} />
                </View>

                <View style={styles.mainView}>
                    <ScrollView contentContainerStyle={{ paddingBottom: hp(15) }}>
                        <View style={styles.rowOptionView}>
                            <TouchableOpacity onPress={() => setGender(false)} style={[styles.optionButton, { borderColor: gender ? COLORS.white : COLORS.secondary }]}>
                                <Image style={styles.maleOptionImage} source={man} />
                                <Text style={styles.optionText}>{t('male')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setGender(true)} style={[styles.optionButton, { borderColor: gender ? COLORS.secondary : COLORS.white }]}>
                                <Image style={styles.maleOptionImage} source={people} />
                                <Text style={styles.optionText}>{t('female')}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.heightOptionView}>
                            <TouchableOpacity style={[styles.cmButton, { backgroundColor: heightOption === 'cm' ? COLORS.secondary : 'transparent' }]} onPress={() => setHeightOption('cm')}>
                                <Text style={styles.cmButtonText}>cm</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.cmButton, { backgroundColor: heightOption === 'inches' ? COLORS.secondary : 'transparent' }]} onPress={() => setHeightOption('inches')}>
                                <Text style={styles.cmButtonText}>inches</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.titleText}>{t('height') + ' (' + heightOption + ')'}</Text>
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
                        <View style={styles.heightOptionView}>
                            <TouchableOpacity style={[styles.cmButton, { backgroundColor: weightOption === 'kg' ? COLORS.secondary : 'transparent' }]} onPress={() => setWeightOption('kg')}>
                                <Text style={styles.cmButtonText}>kg</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.cmButton, { backgroundColor: weightOption === 'lbs' ? COLORS.secondary : 'transparent' }]} onPress={() => setWeightOption('lbs')}>
                                <Text style={styles.cmButtonText}>lbs</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.titleText}>{t('weight') + ' (' + weightOption + ')'}</Text>
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
                            style={[styles.buttonView, { opacity: calculateLoading ? 0.75 : 1 }]}
                            disabled={calculateLoading} onPress={() => calculateBMI(weight, height)}>
                            {calculateLoading ? (
                                <ActivityIndicator size={'large'} color={COLORS.white} />
                            ) : (
                                <Text style={styles.signinText}>{t('calculate_bmi')}</Text>
                            )}
                        </TouchableOpacity>
                        {/* {dateModalVisible && (
                    <View style={styles.card}>
                        <Text style={styles.sectionTitle}>{t('result')}</Text>
                        <Text style={styles.bmiResultText}>{bmiResult}<Text style={{fontSize: normalize(20)}}> BMI</Text></Text>
                        <Text style={styles.resultText}>{bmiResultText}</Text>
                    </View>
                    )} */}
                        {dateModalVisible && (
                            <View style={styles.card}>
                                {/* Header */}
                                <View style={styles.bmiHeader}>
                                    <Text style={styles.sectionTitle}>
                                        {t('result')}
                                    </Text>
                                </View>
                                {/* BMI Value */}
                                <View style={styles.bmiValueContainer}>
                                    <Text style={styles.bmiResultText}>
                                        {bmiResult}
                                    </Text>
                                    <Text style={styles.bmiUnit}>
                                        BMI
                                    </Text>
                                </View>
                                {/* Result Category */}
                                <View style={styles.categoryBadge}>
                                    <Text style={styles.resultText}>
                                        {bmiResultText}
                                    </Text>
                                </View>
                                {/* BMI Scale */}
                                <View style={styles.scaleContainer}>
                                    <View style={styles.scaleBar}>
                                        <View style={styles.underweightBar} />
                                        <View style={styles.normalBar} />
                                        <View style={styles.overweightBar} />
                                        <View style={styles.obesityBar} />
                                    </View>
                                    <View
                                        style={[
                                            styles.scaleIndicator,
                                            {
                                                left: `${Math.min((bmiResult / 40) * 100, 100)}%`,
                                            },
                                        ]}
                                    />
                                    <View style={styles.scaleLabels}>
                                        <Text style={[styles.scaleLabel, { flex: 18.5 }]}>18.5</Text>
                                        <Text style={[styles.scaleLabel, { flex: 6.5, }]}>25</Text>
                                        <Text style={[styles.scaleLabel, { flex: 5 }]}>30</Text>
                                        <Text style={[styles.scaleLabel, { flex: 10 }]}>40+</Text>
                                    </View>
                                </View>
                                {/* Description */}
                                <Text style={styles.bmiDescription}>
                                    {bmiResultText === 'Underweight'
                                        ? 'Your BMI is below the normal range.'
                                        : bmiResultText === 'Normal weight'
                                            ? 'Your BMI is within the normal range.'
                                            : bmiResultText === 'Overweight'
                                                ? 'Your BMI is above the normal range.'
                                                : 'Your BMI is in the obesity range.'}
                                </Text>
                            </View>
                        )}
                    </ScrollView>
                </View>
            </View>
        </KeyboardAwareScrollView>
    );
};

export default BMIScreen;
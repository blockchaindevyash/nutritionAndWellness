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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { COLORS, Fonts } from '../../utils/index';
import view from '../../images/view.png';
import hidden from '../../images/hidden.png';
import logo from '../../images/logo.png';
import CountryPicker, { DEFAULT_THEME } from 'react-native-country-picker-modal';
import useAuthStore from '../../store/authStore';

const SignupScreen = ({ navigation }) => {
    const {updateSignupData, goalList} = useAuthStore();
    const orientation = useOrientation(); // Get current orientation
    const isPortrait = orientation === 'portrait';
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(true);
    const [confirmPass, setConfirmPass] = useState('');
    const [confirmPassVisible, setConfirmPassVisible] = useState(true);
    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPassError, setConfirmPassError] = useState(false);
    const [apiError, setApiError] = useState(false);
    const [apiErrorMessage, setApiErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [countryCode, setCountryCode] = useState('+1');
    const [countries, setCountries] = useState(null);
    const [isCountryPickerVisible, setCountryPickerVisibility] = useState(false);
    const [number, setNumber] = useState('');
    const [numberError, setNumberError] = useState(false);
    const styles = isPortrait ? portraitStyles : landscapeStyles;

    const onSignupData = async () => {
        if (name == '') {
            setNameError(true);
        } else if (number == '') {
            setNumberError(true);
        } else if (email == '') {
            setEmailError(true);
        } else if (password == '') {
            setPasswordError(true);
        } else if (confirmPass == '') {
            setConfirmPassError(true);
        } else if (password !== confirmPass) {
            setApiError(true);
            setApiErrorMessage('Password and Confirm password not match.');
        } else {
            updateSignupData({
                name,
                email,
                mobileno: countryCode?.startsWith('+')
                    ? countryCode + number
                    : `+${countryCode}${number}`,
                password,
            });
            console.log('Signup Click')
            navigation.navigate('BasicInfoScreen', {name: name, email: email, number: countryCode?.startsWith('+') ? countryCode + number : `+${countryCode}${number}`, password: password});
        }
    };

    const onSelect = country => {
        console.log('Get Selected Country', country);
        setCountryCode(`+${country.callingCode[0]}`);
        setCountries(country);
    };

    return (
        <KeyboardAwareScrollView contentContainerStyle={styles.safeAreaStyle}>
            <View style={[styles.container, { backgroundColor: COLORS.backColor }]}>
                <View style={styles.mainView}>
                    <Image style={styles.logoImage} source={logo} />
                    <View style={styles.textInputView}>
                        <TextInput
                            value={name}
                            onChangeText={text => {
                                setName(text);
                                setNameError(false);
                                setApiError(false);
                            }}
                            placeholder="Enter Name"
                            placeholderTextColor={COLORS.greyColor}
                            style={[styles.textInput]}
                            keyboardType={'email-address'}
                            textContentType={'none'}
                            autoCapitalize={'none'}
                        />
                    </View>
                    {nameError && (
                        <Text style={styles.errorText}>
                            {'Please first enter your name.'}
                        </Text>
                    )}
                    <View style={styles.countryCodeStyle}>
                        <TouchableOpacity
                            onPress={() =>
                                setCountryPickerVisibility(!isCountryPickerVisible)
                            }
                            style={styles.countryCodeText}>
                            <Text style={styles.textInput}>
                                {countryCode?.startsWith('+') ? countryCode : `+${countryCode}`}
                            </Text>
                        </TouchableOpacity>

                        {isCountryPickerVisible && (
                            <CountryPicker
                                visible={isCountryPickerVisible}
                                onClose={() => setCountryPickerVisibility(false)}
                                onSelect={onSelect}
                                withCloseButton
                                withCallingCode
                                withFilter
                                theme={{ ...DEFAULT_THEME, onBackgroundTextColor: '#000000' }}
                            />
                        )}
                        <View style={[styles.textInputView, { width: '75%' }]}>
                            <TextInput
                                value={number}
                                placeholder={'User Phone'}
                                placeholderTextColor={COLORS.greyColor}
                                keyboardType={'numeric'}
                                onChangeText={text => {
                                    setNumber(text);
                                    setNumberError(false);
                                    setApiError(false);
                                }}
                                style={[styles.textInput]}
                            />
                        </View>
                    </View>
                    {numberError && (
                        <Text style={styles.errorText}>
                            {'Phone number is required.'}
                        </Text>
                    )}
                    <View style={styles.textInputView}>
                        <TextInput
                            value={email}
                            onChangeText={text => {
                                setEmail(text);
                                setEmailError(false);
                                setApiError(false);
                            }}
                            placeholder="Enter Email"
                            placeholderTextColor={COLORS.greyColor}
                            style={[styles.textInput]}
                            keyboardType={'email-address'}
                            textContentType={'none'}
                            autoCapitalize={'none'}
                        />
                    </View>
                    {emailError && (
                        <Text style={styles.errorText}>
                            {'Please first enter email address.'}
                        </Text>
                    )}
                    <View
                        style={[
                            styles.textInputView,
                            { flexDirection: 'row', alignItems: 'center' },
                        ]}>
                        <TextInput
                            value={password}
                            onChangeText={text => {
                                setPassword(text);
                                setPasswordError(false);
                                setApiError(false);
                            }}
                            placeholder="Enter Password"
                            placeholderTextColor={COLORS.greyColor}
                            style={[
                                styles.textInput,
                                { width: isPortrait ? '83%' : '90%' },
                            ]}
                            secureTextEntry={passwordVisible}
                            textContentType={'none'}
                        />
                        <TouchableOpacity
                            style={{ width: isPortrait ? '12%' : '10%' }}
                            onPress={() => {
                                setPasswordVisible(!passwordVisible);
                            }}>
                            <Image
                                style={[styles.eyeIcon, { tintColor: COLORS.greyColor }]}
                                source={passwordVisible ? hidden : view}
                            />
                        </TouchableOpacity>
                    </View>
                    {passwordError && (
                        <Text style={styles.errorText}>
                            {'Please first enter password.'}
                        </Text>
                    )}
                    <View
                        style={[
                            styles.textInputView,
                            { flexDirection: 'row', alignItems: 'center' },
                        ]}>
                        <TextInput
                            value={confirmPass}
                            onChangeText={text => {
                                setConfirmPass(text);
                                setConfirmPassError(false);
                                setApiError(false);
                            }}
                            placeholder="Enter Confirm Password"
                            placeholderTextColor={COLORS.greyColor}
                            style={[
                                styles.textInput,
                                { width: isPortrait ? '83%' : '90%' },
                            ]}
                            secureTextEntry={confirmPassVisible}
                            textContentType={'none'}
                        />
                        <TouchableOpacity
                            style={{ width: isPortrait ? '12%' : '10%' }}
                            onPress={() => {
                                setConfirmPassVisible(!confirmPassVisible);
                            }}>
                            <Image
                                style={[styles.eyeIcon, { tintColor: COLORS.greyColor }]}
                                source={confirmPassVisible ? hidden : view}
                            />
                        </TouchableOpacity>
                    </View>
                    {confirmPassError && (
                        <Text style={styles.errorText}>
                            {'Please first enter confirm password.'}
                        </Text>
                    )}
                    {apiError && (
                        <Text style={styles.errorText}>
                            {apiErrorMessage}
                        </Text>
                    )}

                    <TouchableOpacity
                        style={[styles.buttonView, { opacity: isLoading ? 0.75 : 1 }]}
                        disabled={isLoading}
                        onPress={() => onSignupData()}>
                        {isLoading ? (
                            <ActivityIndicator size={'large'} color={COLORS.white} />
                        ) : (
                            <Text style={styles.signinText}>Sign up</Text>
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.signupView]}
                        onPress={() => { navigation.navigate('LoginScreen') }}>
                        <Text style={styles.signupText}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAwareScrollView>
    );
};

export default SignupScreen;
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

const LoginScreen = ({ navigation }) => {
    const orientation = useOrientation(); // Get current orientation
    const isPortrait = orientation === 'portrait';
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(true);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [apiError, setApiError] = useState(false);
    const [apiErrorMessage, setApiErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const styles = isPortrait ? portraitStyles : landscapeStyles;

    const onLoginData = async () => {
        console.log('Login Click');
        navigation.navigate('TabStack');
    };

    return (
        <KeyboardAwareScrollView contentContainerStyle={styles.safeAreaStyle}>
            <View style={[styles.container, { backgroundColor: COLORS.backColor }]}>
                <View style={styles.mainView}>
                    <Image style={styles.logoImage} source={logo} />
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
                            style={[styles.textInput, { color: COLORS.greyColor }]}
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
                                { width: isPortrait ? '83%' : '90%', color: COLORS.greyColor },
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
                                style={[styles.eyeIcon, {tintColor: COLORS.greyColor}]}
                                source={passwordVisible ? hidden : view}
                            />
                        </TouchableOpacity>
                    </View>
                    {passwordError && (
                        <Text style={styles.errorText}>
                            {'Please first enter password.'}
                        </Text>
                    )}
                    {apiError && (
                        <Text style={styles.errorText}>
                            {apiErrorMessage}
                        </Text>
                    )}
                    <Text
                        style={styles.forgotPassword}
                        onPress={() => {
                            navigation.navigate('ForgotPassword');
                        }}>
                        Forgot Password?
                    </Text>

                    <TouchableOpacity
                        style={[styles.buttonView, { opacity: isLoading ? 0.75 : 1 }]}
                        disabled={isLoading}
                        onPress={() => onLoginData()}>
                        {isLoading ? (
                            <ActivityIndicator size={'large'} color={COLORS.white} />
                        ) : (
                            <Text style={styles.signinText}>Login</Text>
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.signupView]}
                        onPress={() => { navigation.navigate('SignupScreen') }}>
                        <Text style={styles.signupText}>Sign up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAwareScrollView>
    );
};

export default LoginScreen;
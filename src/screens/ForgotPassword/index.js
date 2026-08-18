import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { portraitStyles, landscapeStyles } from './styles';
import useOrientation from '../../components/OrientationComponent';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { COLORS, Fonts } from '../../utils/index';
import Header from '../../components/HeaderComponent';
import { onForgotPasswordApi } from '../../services/Api';

const ForgotPassword = ({ navigation }) => {
    const orientation = useOrientation(); // Get current orientation
    const isPortrait = orientation === 'portrait';
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [apiError, setApiError] = useState(false);
    const [apiErrorMessage, setApiErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const styles = isPortrait ? portraitStyles : landscapeStyles;
    const { t } = useTranslation();

    const onForgotData = async () => {
        if (email === '') {
            setEmailError(true);
        } else {
            try {
                setIsLoading(true);
                let raw = JSON.stringify({
                    email: email,
                });
                console.log('get request>>', raw);
                const response = await onForgotPasswordApi(raw);
                console.log('get Repsonse>>', response);
                if (response.data.success) {
                    setIsLoading(false);
                    navigation.goBack();
                } else {
                    setApiError(true);
                    setApiErrorMessage('The selected email is invalid.');
                    setIsLoading(false);
                    console.log('get Repsonse>>', response);
                }
            } catch (error) {
                console.log('error::', error.response);
                setApiError(true);
                setApiErrorMessage('The selected email is invalid.');
                setIsLoading(false);
                
            }
        }
    };

    return (
       <KeyboardAwareScrollView contentContainerStyle={styles.safeAreaStyle}>
            <View style={[styles.container, {backgroundColor: COLORS.backColor}]}>
                <View style={styles.headerView}>
                    <Header title={t('forgot_password')} onPress={() => navigation.goBack()}/>
                </View>
                <View style={styles.mainView}>
                    <View style={styles.textInputView}>
                        <TextInput
                            value={email}
                            onChangeText={text => {
                                setEmail(text);
                                setEmailError(false);
                                setApiError(false);
                            }}
                            placeholder={t('enter_email')}
                            placeholderTextColor={COLORS.greyColor}
                            style={[styles.textInput, { color: COLORS.greyColor }]}
                            keyboardType={'email-address'}
                            textContentType={'none'}
                            autoCapitalize={'none'}
                        />
                    </View>
                    {emailError && (
                        <Text style={styles.errorText}>
                            {t('please_enter_email')}
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
                        onPress={() => onForgotData()}>
                        {isLoading ? (
                            <ActivityIndicator size={'large'} color={COLORS.white} />
                        ) : (
                            <Text style={styles.signinText}>{t('submit')}</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAwareScrollView>
    );
};

export default ForgotPassword;
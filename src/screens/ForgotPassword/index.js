import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { portraitStyles, landscapeStyles } from './styles';
import useOrientation from '../../components/OrientationComponent';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { COLORS, Fonts } from '../../utils/index';
import Header from '../../components/HeaderComponent';

const ForgotPassword = ({ navigation }) => {
    const orientation = useOrientation(); // Get current orientation
    const isPortrait = orientation === 'portrait';
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [apiError, setApiError] = useState(false);
    const [apiErrorMessage, setApiErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const styles = isPortrait ? portraitStyles : landscapeStyles;

    const onLoginData = async () => {
        console.log('Login Click');
    };

    return (
       <KeyboardAwareScrollView contentContainerStyle={styles.safeAreaStyle}>
            <View style={[styles.container, {backgroundColor: COLORS.backColor}]}>
                <View style={styles.headerView}>
                    <Header title={'Forgot Password'} onPress={() => navigation.goBack()}/>
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
                    {apiError && (
                        <Text style={styles.errorText}>
                            {apiErrorMessage}
                        </Text>
                    )}
                    <TouchableOpacity
                        style={[styles.buttonView, { opacity: isLoading ? 0.75 : 1 }]}
                        disabled={isLoading}
                        onPress={() => onLoginData()}>
                        {isLoading ? (
                            <ActivityIndicator size={'large'} color={COLORS.white} />
                        ) : (
                            <Text style={styles.signinText}>Submit</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAwareScrollView>
    );
};

export default ForgotPassword;
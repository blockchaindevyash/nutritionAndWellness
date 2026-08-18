import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  StatusBar,
  Alert,
  Keyboard,
} from 'react-native';
import {useCallback, useEffect, useRef, useState} from 'react';
import { useTranslation } from 'react-i18next';
import {portraitStyles, landscapeStyles} from './styles';
import {COLORS} from '../../utils';
import useOrientation from '../../components/OrientationComponent';
import backArrow from '../../images/backArrow.png';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { OtpInput } from "react-native-otp-entry";
import { showMessage } from 'react-native-flash-message';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { getConfirmation, clearConfirmation } from '../PhoneAuthStore';
// import {getAuth, signInWithPhoneNumber} from '@react-native-firebase/auth';
import { hp } from '../../components/responsive';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../components/HeaderComponent';
import useAuthStore from '../../store/authStore';
import { getAuth, signInWithPhoneNumber } from '@react-native-firebase/auth';

const AuthVerificationScreen = ({navigation, route}) => {
  const otpRef = useRef(null);
  const {updateSignupData} = useAuthStore();
  const insets = useSafeAreaInsets();
  const orientation = useOrientation(); // Get current orientation
  const isPortrait = orientation === 'portrait';
  const [emailError, setEmailError] = useState(false);
  const [otpPin, setOtpPin] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [confirm, setConfirm] = useState(null);
  const [resendLoading, setResendLoading] = useState(false);
  const [timer, setTimer] = useState(30);

  const styles = isPortrait ? portraitStyles : landscapeStyles;
  const { t } = useTranslation();

   useFocusEffect(
    useCallback(() => {
      setConfirm(route.params?.confirm);
      StatusBar.setBarStyle('light-content');
    }, [])
  );

  const onVerifyOtp = async () => {
    if (otpPin.length < 6) {
      setEmailError(true);
      return;
    } else {
      try {
        setIsLoading(true);
        await confirm.confirm(otpPin);
        updateSignupData({verify_phone: true});
        setIsLoading(false);
        navigation.navigate('BasicInfoScreen');
        console.log('Verifying OTP:', otpPin);
      } catch (error) {
        setIsLoading(false);
        console.log('Error verifying OTP:', error);
        showMessage({
          message: error.message || 'Invalid OTP',
          type: 'danger',
          duration: 5000,
          icon: 'danger',
        });
      }
    }
  };

  const onResendOtp = async () => {
    try {
      setResendLoading(true);
      const confirmation = await signInWithPhoneNumber(getAuth(), route.params?.phone);
      setConfirm(confirmation);
      showMessage({
        message: 'Resend OTP successfully!',
        type: 'success',
        duration: 5000,
        icon: 'success',
      });
      setResendLoading(false);
    } catch (error) {
      setResendLoading(false);
      console.log('error::', error.response);
      showMessage({
        message: 'Invalid OTP. Please enter the correct OTP.',
        type: 'danger',
        duration: 5000,
        icon: 'danger',
      })
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
      <KeyboardAwareScrollView contentContainerStyle={styles.safeAreaStyle}>
        <View style={styles.headerView}>
          <Header title={t('phone_verification')} onPress={() => navigation.goBack()} />
        </View>
        <View style={styles.mainView}>
          <View>
            <Text style={styles.desText}>{t('enter_otp_sent')}</Text>
            <OtpInput
              ref={otpRef}
              numberOfDigits={6}
              onTextChange={(text) => {
                console.log(`OTP is ${text} ${text.length}`);
                setOtpPin(text);
                setEmailError(false);
              }}
              onFilled={(text) => {
                Keyboard.dismiss();
                otpRef.current?.blur();
                setOtpPin(text);
              }}
              blurOnFilled={true}
              focusColor={COLORS.secondary}
              theme={{
                containerStyle: styles.containerStyle,
                pinCodeContainerStyle: styles.pinCodeContainerStyle,
                pinCodeTextStyle: styles.pinCodeTextStyle,
                focusedPinCodeContainerStyle: styles.activePinCodeContainer,
              }}
            />
            {emailError && (
              <Text style={styles.errorText}>
                {t('please_enter_valid_otp')}
              </Text>
            )}
          </View>
          <View style={{width: '100%', alignItems: 'center'}}>
            <TouchableOpacity
              style={[styles.logoutButtonView, {opacity: isLoading ? 0.75 : 1}]}
              disabled={isLoading}
              onPress={() => onVerifyOtp()}>
              {isLoading ? (
                <ActivityIndicator size={'large'} color={COLORS.white} />
              ) : (
                <Text style={styles.logoutText}>{t('verify')}</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.resendButtonView, {opacity: resendLoading ? 0.75 : 1}]}
              disabled={resendLoading}
              onPress={() => onResendOtp()}>
              {resendLoading ? (
                <ActivityIndicator size={'large'} color={COLORS.black} />
                ) : (
                <Text style={styles.resendText}>{t('resend_otp')}</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default AuthVerificationScreen;

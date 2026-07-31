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

const AuthVerificationScreen = ({navigation, route}) => {
  const otpRef = useRef(null);
  const {updateSignupData} = useAuthStore();
  const insets = useSafeAreaInsets();
  const orientation = useOrientation(); // Get current orientation
  const isPortrait = orientation === 'portrait';
  const [emailError, setEmailError] = useState(false);
  const [otpPin, setOtpPin] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResendLoading, setIsResendLoading] = useState(false);
  const [confirm, setConfirm] = useState(null);
  const [resendLoading, setResendLoading] = useState(false);
  const [timer, setTimer] = useState(30);

  const styles = isPortrait ? portraitStyles : landscapeStyles;

   useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('light-content');
    }, [])
  );

  const onVerifyOtp = async () => {
    if (otpPin.length < 6) {
      setEmailError(true);
      return;
    } else {
      updateSignupData({verify_phone: true});
      navigation.navigate('BasicInfoScreen');
      console.log('Verifying OTP:', otpPin);
    }
  };

  const onResendOtp = async () => {
    try {
      setResendLoading(true);
      // if (response.data.success) {
      //   showMessage({
      //     message: response.data.message,
      //     type: 'success',
      //     duration: 5000,
      //     icon: 'success',
      //   });
      // }
      setResendLoading(false);
    } catch (error) {
      setResendLoading(false);
      console.log('error::', error.response);
      showMessage({
        message: error.message || 'Invalid OTP',
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
          <Header title={'Phone Verification'} onPress={() => navigation.goBack()} />
        </View>
        <View style={styles.mainView}>
          <View>
            <Text style={styles.desText}>{`Enter the OTP sent to your Phone Number`}</Text>
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
                {'Please enter valid otp.'}
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
                <Text style={styles.logoutText}>{'Verify'}</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.resendButtonView, {opacity: isLoading ? 0.75 : 1}]}
              disabled={isResendLoading}
              onPress={() => onResendOtp()}>
              {isResendLoading ? (
                <ActivityIndicator size={'large'} color={COLORS.black} />
              ) : (
                <Text style={styles.resendText}>{'Resend OTP'}</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default AuthVerificationScreen;

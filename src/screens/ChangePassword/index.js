import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import React, {useEffect, useState, useRef, useCallback} from 'react';
import { portraitStyles, landscapeStyles } from './styles';
import useOrientation from '../../components/OrientationComponent';
import { COLORS, Fonts } from '../../utils';
import logo from '../../images/logo.png';
import backButton from '../../images/backArrow.png';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { showMessage } from 'react-native-flash-message';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';

const ChangePassword = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const orientation = useOrientation();
  const isPortrait = orientation === 'portrait';
  const styles = isPortrait ? portraitStyles : landscapeStyles;
  const [upcomingVisible, setUpcomingVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordError, setNewPasswordError] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('light-content');
    }, [])
  );

  const onVerifyFunction = async () => {
    try {
      if (password == '') {
        setPasswordError(true);
      } else if (newPassword == '') {
        setNewPasswordError(true);
      } else if (confirmPassword == '') {
        setConfirmPasswordError(true);
      } else {
        setIsLoading(true);
        let raw = JSON.stringify({
          old_password: password,
          new_password: newPassword,
          new_password_confirmation: confirmPassword
        });
        const response = await onAddCommonJsonApi('reset-password', raw);
        console.log('get Repsonse>>', response.data);
        if (response.data.success) {
          showMessage({
            message: 'Password reset successfully!',
            type: 'success',
            duration: 6000,
            icon: 'success',
          });
          setPassword('');
          setNewPassword('');
          setConfirmPassword('');
          setIsLoading(false);
        }
      }
    } catch(err) {
      setIsLoading(false);
      setApiError(true);
      setApiErrorMessage(err.response.data.message);
      console.log('Err', err);
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
      <View style={[styles.headerView, {alignItems: 'center', justifyContent: 'flex-start'}]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image style={styles.backImage} source={backButton} />
        </TouchableOpacity>
        <Text style={styles.mobileNumberText}>Change Password</Text>
      </View>
      <KeyboardAwareScrollView contentContainerStyle={styles.safeAreaStyle}>
        <View style={[styles.container, {backgroundColor: COLORS.backColor}]}>
          <Image style={styles.logoImage} source={logo} />
          {/* <Text style={styles.resetText}>Verify Yourself by Password</Text> */}
          <View style={styles.mainView}>
            <Text style={styles.titleText}>Enter Old Password</Text>
            <View style={styles.textInputView}>
              <TextInput
                value={password}
                onChangeText={text => {
                  setPassword(text);
                  setPasswordError(false);
                  setApiError(false);
                }}
                placeholder="Old Password"
                placeholderTextColor={COLORS.greyColor}
                style={styles.textInput}
                secureTextEntry={true}
                textContentType={'none'}
                autoCapitalize={'none'}
              />
            </View>
            {passwordError && (
              <Text style={styles.errorText}>
                {'Please enter your old password.'}
              </Text>
            )}
            <Text style={styles.titleText}>Enter New Password</Text>
            <View style={styles.textInputView}>
              <TextInput
                value={newPassword}
                onChangeText={text => {
                  setNewPassword(text);
                  setNewPasswordError(false);
                  setApiError(false);
                }}
                placeholder="New Password"
                placeholderTextColor={COLORS.greyColor}
                style={styles.textInput}
                secureTextEntry={true}
                textContentType={'none'}
                autoCapitalize={'none'}
              />
            </View>
            {newPasswordError && (
              <Text style={styles.errorText}>
                {'Please enter your new password.'}
              </Text>
            )}
            <Text style={styles.titleText}>Enter Confirm Password</Text>
            <View style={styles.textInputView}>
              <TextInput
                value={confirmPassword}
                onChangeText={text => {
                  setConfirmPassword(text);
                  setConfirmPasswordError(false);
                  setApiError(false);
                }}
                placeholder="Confirm Password"
                placeholderTextColor={COLORS.greyColor}
                style={styles.textInput}
                secureTextEntry={true}
                textContentType={'none'}
                autoCapitalize={'none'}
              />
            </View>
            {confirmPasswordError && (
              <Text style={styles.errorText}>
                {'Please enter your confirm password.'}
              </Text>
            )}
            {apiError && (
              <Text style={styles.errorText}>
                {apiErrorMessage}
              </Text>
            )}
              <TouchableOpacity
                style={[styles.buttonView, {opacity: isLoading ? 0.75 : 1}]}
                disabled={isLoading}
                onPress={() => onVerifyFunction()}>
                {isLoading ? (
                  <ActivityIndicator size={'large'} color={COLORS.white} />
                ) : (
                  <Text style={styles.signinText}>Change Password</Text>
                )}
              </TouchableOpacity>
            </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default ChangePassword;

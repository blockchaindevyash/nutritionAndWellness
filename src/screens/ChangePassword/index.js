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
import view from '../../images/view.png';
import hidden from '../../images/hidden.png';
import backButton from '../../images/backArrow.png';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { showMessage } from 'react-native-flash-message';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { onAddCommonJsonApi } from '../../services/Api';

const ChangePassword = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const orientation = useOrientation();
  const isPortrait = orientation === 'portrait';
  const styles = isPortrait ? portraitStyles : landscapeStyles;
  const [upcomingVisible, setUpcomingVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [passwordError, setPasswordError] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordError, setNewPasswordError] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(true);
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
      console.log('Password:', password, confirmPassword);
      if (password == '') {
        setPasswordError(true);
      } else if (newPassword == '') {
        setNewPasswordError(true);
      } else if (confirmPassword == '') {
        setConfirmPasswordError(true);
      } else {
        console.log('Password:', password);
        setIsLoading(true);
        let raw = JSON.stringify({
          old_password: password,
          new_password: newPassword,
          confirm_password: confirmPassword
        });
        const response = await onAddCommonJsonApi('user/change-password', raw);
        console.log('get Repsonse>>', response.data);
        if (response.data.status) {
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
          navigation.goBack();
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
            <View style={[styles.textInputView, { flexDirection: 'row', alignItems: 'center' }]}>
              <TextInput
                value={password}
                onChangeText={text => {
                  setPassword(text);
                  setPasswordError(false);
                  setApiError(false);
                }}
                placeholder="Old Password"
                placeholderTextColor={COLORS.greyColor}
                style={[styles.textInput, { width: isPortrait ? '83%' : '90%', color: COLORS.white }]}
                secureTextEntry={passwordVisible}
                textContentType={'none'}
                autoCapitalize={'none'}
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
                {'Please enter your old password.'}
              </Text>
            )}
            <Text style={styles.titleText}>Enter New Password</Text>
            <View style={[styles.textInputView, { flexDirection: 'row', alignItems: 'center' }]}>
              <TextInput
                value={newPassword}
                onChangeText={text => {
                  setNewPassword(text);
                  setNewPasswordError(false);
                  setApiError(false);
                }}
                placeholder="New Password"
                placeholderTextColor={COLORS.greyColor}
                style={[styles.textInput, { width: isPortrait ? '83%' : '90%', color: COLORS.white }]}
                secureTextEntry={newPasswordVisible}
                textContentType={'none'}
                autoCapitalize={'none'}
              />
              <TouchableOpacity
                style={{ width: isPortrait ? '12%' : '10%' }}
                onPress={() => {
                    setNewPasswordVisible(!newPasswordVisible);
                }}>
                <Image
                    style={[styles.eyeIcon, {tintColor: COLORS.greyColor}]}
                    source={newPasswordVisible ? hidden : view}
                />
              </TouchableOpacity>
            </View>
            {newPasswordError && (
              <Text style={styles.errorText}>
                {'Please enter your new password.'}
              </Text>
            )}
            <Text style={styles.titleText}>Enter Confirm Password</Text>
            <View style={[styles.textInputView, { flexDirection: 'row', alignItems: 'center' }]}>
              <TextInput
                value={confirmPassword}
                onChangeText={text => {
                  setConfirmPassword(text);
                  setConfirmPasswordError(false);
                  setApiError(false);
                }}
                placeholder="Confirm Password"
                placeholderTextColor={COLORS.greyColor}
                style={[styles.textInput, { width: isPortrait ? '83%' : '90%', color: COLORS.white }]}
                secureTextEntry={confirmPasswordVisible}
                textContentType={'none'}
                autoCapitalize={'none'}
              />
              <TouchableOpacity
                style={{ width: isPortrait ? '12%' : '10%' }}
                onPress={() => {
                    setConfirmPasswordVisible(!confirmPasswordVisible);
                }}>
                <Image
                    style={[styles.eyeIcon, {tintColor: COLORS.greyColor}]}
                    source={confirmPasswordVisible ? hidden : view}
                />
              </TouchableOpacity>
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

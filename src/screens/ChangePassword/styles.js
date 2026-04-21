import {Platform, StyleSheet} from 'react-native';
import { hp, normalize, wp } from '../../components/responsive';
import {COLORS, Fonts} from '../../utils/index';

export const portraitStyles = StyleSheet.create({
  safeAreaStyle: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  container: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.backColor,
  },
  headerView: {
    width: '100%',
    paddingHorizontal: wp(4),
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    height: hp(7),
    backgroundColor: COLORS.primary
  },
  backImage: {
    width: wp(5),
    height: hp(4),
    resizeMode: 'contain',
    tintColor: COLORS.white,
  },
  mobileNumberText: {
    fontSize: hp(2.4),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    color: COLORS.white,
    marginLeft: wp(5),
  },
  mainView: {
    width: '90%',
  },
  textInputView: {
    width: '100%',
    borderWidth: 0.3,
    borderColor: COLORS.greyColor,
    borderRadius: 6,
    paddingVertical: hp(0.1),
    justifyContent: 'center',
    marginTop: hp(1),
  },
  textInput: {
    marginHorizontal: wp(3),
    fontFamily: Fonts.FONTS.PoppinsMedium,
    color: COLORS.greyColor,
    fontSize: hp(2),
    paddingVertical: hp(0.3),
  },
  resetText: {
    fontFamily: Fonts.FONTS.PoppinsBold,
    color: COLORS.black,
    fontSize: hp(2.4),
    marginVertical: hp(3),
  },
  titleText: {
    fontFamily: Fonts.FONTS.PoppinsMedium,
    color: COLORS.white,
    fontSize: hp(2),
    marginTop: hp(2)
  },
  buttonView: {
    width: '100%',
    borderRadius: 6,
    height: hp(6),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(4),
    backgroundColor: COLORS.subPrimary,
  },
  signinText: {
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    color: COLORS.white,
    fontSize: hp(2.2),
  },
  logoImage: {
    width: wp(40),
    height: hp(20),
    resizeMode: 'contain',
  },
  errorText: {
    fontSize: hp(1.8),
    color: COLORS.errorColor,
    fontFamily: Fonts.FONTS.PoppinsMedium,
    marginTop: hp(1),
    marginLeft: wp(1),
  },
});

export const landscapeStyles = StyleSheet.create({
  safeAreaStyle: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  container: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
  mainView: {
    width: '50%',
  },
  headerView: {
    width: '100%',
    paddingHorizontal: hp(4),
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    height: hp(8),
    backgroundColor: COLORS.primary
  },
  backImage: {
    width: wp(3),
    height: hp(3),
    resizeMode: 'contain',
    tintColor: COLORS.white,
  },
  mobileNumberText: {
    fontSize: hp(2.8),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    color: COLORS.white,
    marginLeft: wp(1.5),
  },
  textInputView: {
    width: '100%',
    borderWidth: 0.3,
    borderColor: COLORS.black,
    borderRadius: 6,
    height: hp(6),
    justifyContent: 'center',
    marginTop: hp(1),
  },
  textInput: {
    paddingHorizontal: wp(1),
    fontFamily: Fonts.FONTS.PoppinsMedium,
    color: COLORS.black,
    fontSize: hp(2),
  },
  resetText: {
    fontFamily: Fonts.FONTS.PoppinsBold,
    color: COLORS.black,
    fontSize: hp(2.4),
    marginVertical: hp(2),
  },
  titleText: {
    fontFamily: Fonts.FONTS.PoppinsMedium,
    color: COLORS.black,
    fontSize: hp(2),
    marginTop: hp(1)
  },
  buttonView: {
    width: '100%',
    borderRadius: 6,
    height: hp(6),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(4),
    backgroundColor: COLORS.primary,
  },
  signinText: {
    fontFamily: Fonts.FONTS.PoppinsMedium,
    color: COLORS.white,
    fontSize: hp(2.2),
  },
  logoImage: {
    width: wp(35),
    height: hp(17),
    resizeMode: 'contain',
  },
  errorText: {
    fontSize: hp(1.8),
    color: COLORS.errorColor,
    fontFamily: Fonts.FONTS.PoppinsMedium,
    marginTop: hp(1),
    marginLeft: wp(1),
  },
});

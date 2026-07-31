import {StyleSheet} from 'react-native';
import {
  wp,
  hp,
} from '../../components/responsive';
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
    backgroundColor: COLORS.white,
  },
  headerView: {
    height: '8%', 
    width: '100%', 
    backgroundColor: COLORS.primary,
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
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: wp(4),
    backgroundColor: COLORS.backColor,
    height: '92%',
    paddingVertical: hp(3),
  },
  logoutButtonView: {
    width: '100%',
    height: hp(5),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.subPrimary,
    borderRadius: 5,
    marginTop: hp(6),
  },
  resendButtonView: {
    width: '100%',
    borderRadius: 6,
    height: hp(5),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(2),
    backgroundColor: COLORS.white,
    borderWidth: 0.4,
    borderColor: COLORS.greyColor,
  },
  resendText: {
    fontSize: hp(2.3),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    color: COLORS.black,
  },
  logoutText: {
    fontSize: hp(2.4),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    color: COLORS.white,
  },
  dataHistoryText1: {
    fontSize: hp(2.1),
    fontFamily: Fonts.FONTS.PoppinsMedium,
    color: COLORS.black,
  },
  containerStyle: {
    width: '100%',
    justifyContent: 'space-between'
  },
  pinCodeContainerStyle: {
    height: hp(6),
    width: wp(12),
    marginTop: hp(2),
    borderColor: COLORS.white,
    borderRadius: 5,
  },
  pinCodeTextStyle: {
    fontSize: hp(3.4),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    color: COLORS.white,
  },
  activePinCodeContainer: {
    height: hp(6),
    width: wp(12),
    marginTop: hp(2),
    borderColor: COLORS.secondary,
    borderRadius: 5,
    borderWidth: wp(0.5),
  },
  desText: {
    fontSize: hp(2.2),
    fontFamily: Fonts.FONTS.PoppinsMedium,
    color: COLORS.secondary,
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
  headerView: {
    width: '100%',
    paddingHorizontal: hp(4),
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    height: hp(10),
  },
  backImage: {
    width: wp(3),
    height: hp(4),
    resizeMode: 'contain',
  },
  mobileNumberText: {
    fontSize: hp(2.8),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    color: COLORS.black,
    marginLeft: wp(1.5),
  },
  mainView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: wp(4),
    backgroundColor: COLORS.primary,
    height: '100%',
    paddingVertical: hp(2),
  },
  logoutButtonView: {
    width: '100%',
    height: hp(5),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 5,
  },
  logoutText: {
    fontSize: wp(2),
    fontFamily: Fonts.FONTS.PoppinsBold,
    color: COLORS.white,
  },
  resendButtonView: {
    width: '100%',
    borderRadius: 6,
    height: hp(5),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(1),
    backgroundColor: COLORS.white,
    borderWidth: 0.4,
    borderColor: COLORS.greyColor,
  },
  resendText: {
    fontSize: hp(2.4),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    color: COLORS.black,
  },
  dataHistoryText1: {
    fontSize: hp(2.1),
    fontFamily: Fonts.FONTS.PoppinsMedium,
    color: COLORS.black,
  },
  containerStyle: {
    width: '100%',
    justifyContent: 'space-between'
  },
  pinCodeContainerStyle: {
    height: hp(6.5),
    width: wp(13),
    marginTop: hp(2),
    borderColor: COLORS.white,
    borderRadius: 5,
  },
  pinCodeTextStyle: {
    fontSize: hp(3.4),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    color: COLORS.white,
  },
  activePinCodeContainer: {
    height: hp(7.5),
    width: wp(13),
    marginTop: hp(2),
    borderColor: COLORS.secondary,
    borderRadius: 5,
    borderWidth: wp(0.5),
  },
  desText: {
    fontSize: hp(2),
    fontFamily: Fonts.FONTS.PoppinsRegular,
    color: COLORS.greyColor,
  }
});

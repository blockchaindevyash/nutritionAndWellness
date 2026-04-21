import {StyleSheet} from 'react-native';
import { COLORS, Fonts } from '../../utils';
import { hp, normalize, wp } from '../../components/responsive';

export const portraitStyles = StyleSheet.create({
  safeAreaStyle: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: COLORS.backColor,
  },
  editTextInputView: {
    width: '94%',
    alignSelf: 'center',
    marginTop: hp(2),
  },
  textInputView: {
    width: '100%',
    borderWidth: 0.3,
    borderColor: COLORS.black,
    borderRadius: 6,
    height: hp(9),
    justifyContent: 'center',
    marginTop: hp(1),
    backgroundColor: COLORS.primary,
    paddingHorizontal: wp(3),
  },
  textInput: {
    fontFamily: Fonts.FONTS.PoppinsMedium,
    color: COLORS.greyColor,
    fontSize: hp(1.9),
    paddingVertical: hp(0.5)
  },
  titleText: {
    fontFamily: Fonts.FONTS.PoppinsMedium,
    color: COLORS.white,
    fontSize: hp(2),
  },
  editImage: {
    width: wp(5),
    height: hp(2),
    resizeMode: 'contain',
    tintColor: COLORS.white,
  },
  detailText: {
    fontSize: normalize(18),
    fontFamily: Fonts.FONTS.PoppinsMedium,
    color: COLORS.white,
  },
  detailText1: {
    fontSize: normalize(16),
    fontFamily: Fonts.FONTS.PoppinsMedium,
    color: COLORS.greyColor,
  },
  optionView: {
    width: '100%',
    height: hp(6),
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  optionView1: {
    width: '100%',
    height: hp(12),
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  logoutButton: {
    width: '100%',
    paddingVertical: hp(1),
    backgroundColor: COLORS.subPrimary,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: hp(3),
  },
  logoutText: {
    fontSize: normalize(18),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    color: COLORS.white,
  },
  detailView: {
    width: '100%',
    paddingVertical: hp(1),
    paddingHorizontal: wp(3),
    backgroundColor: COLORS.primary,
    borderRadius: 8,
  }
});

export const landscapeStyles = StyleSheet.create({
  safeAreaStyle: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: COLORS.backColor,
  },
  editTextInputView: {
    width: '94%',
    alignSelf: 'center',
    marginTop: hp(2),
  },
  textInputView: {
    width: '100%',
    borderWidth: 0.3,
    borderColor: COLORS.black,
    borderRadius: 6,
    height: hp(9),
    justifyContent: 'center',
    marginTop: hp(1),
    backgroundColor: COLORS.primary,
    paddingHorizontal: wp(3),
  },
  textInput: {
    fontFamily: Fonts.FONTS.PoppinsMedium,
    color: COLORS.greyColor,
    fontSize: hp(1.9),
    paddingVertical: hp(0.5)
  },
  titleText: {
    fontFamily: Fonts.FONTS.PoppinsMedium,
    color: COLORS.white,
    fontSize: hp(2),
  },
  editImage: {
    width: wp(5),
    height: hp(2.5),
    resizeMode: 'contain',
    tintColor: COLORS.white,
  },
  logoutButton: {
    width: '100%',
    paddingVertical: hp(1),
    backgroundColor: COLORS.subPrimary,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: hp(3),
  },
  logoutText: {
    fontSize: normalize(18),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    color: COLORS.white,
  }
})
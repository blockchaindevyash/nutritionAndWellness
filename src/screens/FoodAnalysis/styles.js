import {StyleSheet} from 'react-native';
import { hp, wp, normalize } from '../../components/responsive';
import { COLORS, Fonts } from '../../utils/index';

export const portraitStyles = StyleSheet.create({
  safeAreaStyle: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  headerView: {
    height: '8%', 
    width: '100%', 
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  mainView: {
    height: '90%',
    marginTop: hp(1),
    width: '90%',
  },
  callLogText: {
    fontSize: normalize(18),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    marginLeft: wp(3),
    color: COLORS.white,
  },
  titleText: {
    fontSize: normalize(18),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    color: COLORS.white,
    marginVertical: hp(1),
  },
  subtitleText: {
    fontSize: normalize(14),
    fontFamily: Fonts.FONTS.PoppinsRegular,
    color: COLORS.greyColor,
  },
  imageView: {
    height: hp(40),
    width: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    marginTop: hp(3),
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: hp(3),
  },
  scanButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: hp(1),
    paddingHorizontal: wp(7),
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanText: {
    fontSize: normalize(16),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    color: COLORS.subPrimary,
  },
  analysisButton: {
    width: '100%',
    paddingVertical: hp(1),
    backgroundColor: COLORS.subPrimary,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: hp(3),
  },
  analysisText: {
    fontSize: normalize(18),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    color: COLORS.white,
  },
  foodImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    resizeMode: 'cover',
  },
});

export const landscapeStyles = StyleSheet.create({
  safeAreaStyle: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  headerView: {
    height: '8%', 
    width: '100%', 
    backgroundColor: COLORS.primary,
  },
  container: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  mainView: {
    height: '90%',
    marginTop: hp(1)
  },
  callLogText: {
    fontSize: normalize(18),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    marginLeft: wp(3),
    color: COLORS.white,
  },
  titleText: {
    fontSize: normalize(20),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    color: COLORS.white,
    marginVertical: hp(1),
  },
  subtitleText: {
    fontSize: normalize(14),
    fontFamily: Fonts.FONTS.PoppinsRegular,
    color: COLORS.greyColor,
  },
  imageView: {
    height: hp(40),
    width: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    marginTop: hp(3),
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: hp(3),
  },
  scanButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: hp(1),
    paddingHorizontal: wp(2),
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanText: {
    fontSize: normalize(16),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    color: COLORS.subPrimary,
  },
  foodImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    resizeMode: 'cover',
  },
});
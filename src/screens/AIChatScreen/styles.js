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
  itemsDataView: {
    width: '100%',
    paddingHorizontal: wp(3),
  },
  queDataMainView: {
    maxWidth: '85%',
    alignSelf: 'flex-end',
    paddingTop: hp(6),
  },
  queDataView: {
    padding: wp(3),
    backgroundColor: COLORS.primary,
    borderRadius: hp(2),
  },
  queText: {
    color: COLORS.white,
    fontFamily: Fonts.FONTS.PoppinsMedium,
    fontSize: hp(2.2),
  },
  ansText: {
    color: COLORS.black,
    fontFamily: Fonts.FONTS.PoppinsMedium,
    fontSize: hp(2.2),
    paddingVertical: hp(1),
    lineHeight: hp(3.8),
  },
  ansTitleText: {
    color: COLORS.black,
    fontFamily: Fonts.FONTS.PoppinsMedium,
    fontSize: hp(2.4),
    marginTop: hp(2),
  },
  ansDateText: {
    color: COLORS.greyColor,
    fontFamily: Fonts.FONTS.PoppinsMedium,
    fontSize: hp(2.1),
  },
  emptyTextView: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: hp(2.6),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    color: COLORS.black,
  },
  bottomView: {
    maxHeight: hp(40),
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: COLORS.white,
    paddingVertical: hp(2)
  },
  chatInputView1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  chatInputView: {
    padding: wp(2),
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'space-between',
    width: '92%',
    borderRadius: hp(3),
    borderWidth: 0.5,
  },
  roundButtonView: {
    width: wp(9),
    height: wp(9),
    borderRadius: wp(9),
    alignItems: 'center',
    justifyContent: 'center',
  },
  roundButtonView1: {
    width: wp(9),
    height: wp(9),
    borderRadius: wp(9),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary
  },
  textInput: {
    fontSize: hp(2.2),
    fontFamily: Fonts.FONTS.PoppinsRegular,
    color: COLORS.black,
    width: '68%',
    paddingVertical: hp(0.5)
  },
  closeIcon: {
    width: wp(5),
    height: hp(3),
    resizeMode: 'contain',
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
  itemsDataView: {
    width: '100%',
    paddingHorizontal: wp(3),
  },
  queDataMainView: {
    maxWidth: '85%',
    alignSelf: 'flex-end',
    paddingTop: hp(6),
  },
  queDataView: {
    padding: wp(3),
    backgroundColor: COLORS.primary,
    borderRadius: hp(2),
  },
  queText: {
    color: COLORS.white,
    fontFamily: Fonts.FONTS.PoppinsMedium,
    fontSize: hp(2.2),
  },
  ansText: {
    color: COLORS.black,
    fontFamily: Fonts.FONTS.PoppinsMedium,
    fontSize: hp(2.2),
    paddingVertical: hp(1),
    lineHeight: hp(3.8),
  },
  ansTitleText: {
    color: COLORS.black,
    fontFamily: Fonts.FONTS.PoppinsMedium,
    fontSize: hp(2.4),
    marginTop: hp(2),
  },
  ansDateText: {
    color: COLORS.greyColor,
    fontFamily: Fonts.FONTS.PoppinsMedium,
    fontSize: hp(2.1),
  },
  emptyTextView: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: hp(2.6),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    color: COLORS.black,
  },
  bottomView: {
    maxHeight: hp(40),
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: COLORS.white,
    paddingVertical: hp(2)
  },
  chatInputView1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  chatInputView: {
    padding: wp(2),
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'space-between',
    width: '92%',
    borderRadius: hp(3),
    borderWidth: 0.5,
  },
  roundButtonView: {
    width: wp(9),
    height: wp(9),
    borderRadius: wp(9),
    alignItems: 'center',
    justifyContent: 'center',
  },
  roundButtonView1: {
    width: wp(9),
    height: wp(9),
    borderRadius: wp(9),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary
  },
  textInput: {
    fontSize: hp(2.2),
    fontFamily: Fonts.FONTS.PoppinsRegular,
    color: COLORS.black,
    width: '68%',
    paddingVertical: hp(0.5)
  },
  closeIcon: {
    width: wp(5),
    height: hp(3),
    resizeMode: 'contain',
  },
});
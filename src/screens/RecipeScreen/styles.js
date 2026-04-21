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
  titleText: {
    fontSize: normalize(16),
    fontFamily: Fonts.FONTS.PoppinsMedium,
    color: COLORS.white,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.backColor,
  },
  headerView: {
    height: '8%',
    width: '100%', 
    backgroundColor: COLORS.primary,
  },
  mainView: {
    height: '90%',
  },
  fullImageStyle: {
    width: '100%',
    height: hp(40),
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  infoView: {
    width: '90%',
    alignSelf: 'center',
    marginTop: hp(2),
  },
  dishTitle: {
    fontSize: normalize(18),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    color: COLORS.white,
  },
  descriptionText: {
    color: COLORS.greyColor,
    marginTop: hp(1),
    fontFamily: Fonts.FONTS.PoppinsMedium,
    fontSize: normalize(13),
  }
})

export const landscapeStyles = StyleSheet.create({
  safeAreaStyle: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: COLORS.backColor,
  },
  titleText: {
    fontSize: normalize(16),
    fontFamily: Fonts.FONTS.PoppinsMedium,
    color: COLORS.white,
  },
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 16,
  },
  headerView: {
    height: '8%',
    width: '100%', 
    backgroundColor: COLORS.primary,
  },
  mainView: {
    height: '90%',
  },
  fullImageStyle: {
    width: '100%',
    height: hp(40),
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  }
})
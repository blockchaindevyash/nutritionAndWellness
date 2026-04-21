import { Dimensions, StyleSheet } from 'react-native';
import { hp, wp, normalize } from '../../components/responsive';
import { COLORS, Fonts } from '../../utils/index';

export const portraitStyles = StyleSheet.create({
  safeAreaStyle: {
    flex: 1,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.backColor,
  },
  logoImage: {
    width: wp(80),
    height: hp(35),
    resizeMode: 'contain',
  }
})

export const landscapeStyles = StyleSheet.create({
  safeAreaStyle: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
})
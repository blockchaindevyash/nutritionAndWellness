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
    padding: 16,
  },
  greeting: {
    fontSize: normalize(18),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    color: COLORS.white,
  },
  subText: {
    color: COLORS.white,
    fontFamily: Fonts.FONTS.PoppinsMedium,
    fontSize: normalize(14),
    marginBottom: 16,
  },
  card: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 5,
    marginBottom: 14,
  },
  bigText: {
    fontSize: normalize(18),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    color: COLORS.white,
    marginBottom: 10,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 10,
  },
  progressFill: {
    height: 8,
    backgroundColor: COLORS.subPrimary,
    borderRadius: 10,
  },
  button: {
    marginTop: 10,
    backgroundColor: COLORS.subPrimary,
    padding: 6,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.white,
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    fontSize: normalize(16),
  },
  tipCard: {
    backgroundColor: COLORS.primary,
    padding: 12 ,
    borderRadius: 5,
  },
  tipText: {
    fontSize: normalize(12),
    color: COLORS.white,
    fontFamily: Fonts.FONTS.PoppinsMedium,
  },
  foodStyle: {
    fontSize: normalize(16),
    color: COLORS.white,
    fontFamily: Fonts.FONTS.PoppinsMedium,
    marginBottom: 4,
  },
  dishMainView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  dishImage: {
    width: '100%',
    height: hp(23),
    borderRadius: 8,
  },
  cardTitle: {
    fontSize: normalize(18),
    color: COLORS.white,
    fontFamily: Fonts.FONTS.PoppinsMedium,
    marginBottom: hp(2),
  },
  dishCard: {
    width: '47%',
    marginBottom: hp(2),
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
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
  greeting: {
    fontSize: 22,
    fontWeight: '700',
  },
  subText: {
    color: '#6B7280',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 14,
  },
  cardTitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 6,
  },
  bigText: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 10,
  },
  progressFill: {
    height: 8,
    backgroundColor: '#00BCD4',
    borderRadius: 10,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#00BCD4',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  tipCard: {
    backgroundColor: '#E0F7FA',
    padding: 16,
    borderRadius: 16,
  },
  tipText: {
    fontSize: 14,
    color: '#00796B',
  },
})
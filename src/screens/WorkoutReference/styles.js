import {StyleSheet} from 'react-native';
import { COLORS, Fonts } from '../../utils';
import { hp, normalize, wp } from '../../components/responsive';

export const portraitStyles = StyleSheet.create({
  safeAreaStyle: {
    flex: 1,
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.backColor,
  },
  headerView: {
    height: '8%', 
    width: '100%', 
    backgroundColor: COLORS.primary,
  },
  container: {
    width: '90%',
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
    fontFamily: Fonts.FONTS.PoppinsBold,
    color: COLORS.white,
    fontSize: hp(2.2),
  },
  subtitle: {
    fontSize: normalize(16),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    color: COLORS.white,
    marginBottom: 20,
  },
  card: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 5,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedCard: {
    backgroundColor: COLORS.textColor,
  },
  cardTitle: {
    fontSize: normalize(16),
    fontFamily: Fonts.FONTS.PoppinsMedium,
    color: COLORS.white,
    marginLeft: 10,
  },
  icon: {
    fontSize: normalize(18),
    color: COLORS.white,
  },
  cardDesc: {
    fontSize: normalize(14),
    fontFamily: Fonts.FONTS.PoppinsMedium,
    color: COLORS.white,
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: normalize(16),
    fontFamily: Fonts.FONTS.PoppinsMedium,
    color: COLORS.white,
    marginTop: 20,
    marginBottom: 10,
  },
  allergyContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  allergyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    padding: 8,
    borderRadius: 5,
    marginRight: 10,
    marginBottom: 10,
  },
  selectedAllergy: {
    backgroundColor: COLORS.textColor,
    borderWidth: 0,
    borderColor: '#FF9800',
  },
  checkbox: {
    fontSize: normalize(17),
    marginRight: 6,
    color: COLORS.white,
  },
  allergyText: {
    fontSize: normalize(15),
    fontFamily: Fonts.FONTS.PoppinsMedium,
    color: COLORS.white,
  },
  input: {
    fontFamily: Fonts.FONTS.PoppinsMedium,
    color: COLORS.white,
    fontSize: hp(2),
    borderWidth: 0.3,
    borderColor: COLORS.greyColor,
    marginTop: hp(0.5),
    borderRadius: 5,
    justifyContent: 'center',
    paddingHorizontal: wp(2),
    backgroundColor: COLORS.primary,
    height: hp(5.5)
  }
})

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
    fontFamily: Fonts.FONTS.PoppinsBold,
    color: COLORS.white,
    fontSize: hp(2.2),
  },
  titleText: {
    fontSize: normalize(16),
    fontFamily: Fonts.FONTS.PoppinsMedium,
    color: COLORS.white,
  }
})
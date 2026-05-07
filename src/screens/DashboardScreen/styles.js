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
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-around",
    // padding: 10,
    // backgroundColor: COLORS.primary,
    marginBottom: hp(2),
    
  },
  dayBox: {
    alignItems: "center",
    backgroundColor: COLORS.primary,
    padding: hp(1),
    borderRadius: 5,
  },
  date: {
    marginBottom: 10,
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    fontSize: normalize(15),
    color: COLORS.white,
  },
  dateFont: {
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    color: COLORS.white,
    fontSize: normalize(17),
  },
  dayFont: {
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    color: COLORS.white,
    fontSize: normalize(13),
  },
  foodText: {
    fontFamily: Fonts.FONTS.PoppinsRegular,
    fontSize: normalize(16),
    color: COLORS.white,
  },
  progremView: {
    width: '100%',
    paddingVertical: hp(1),
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    marginVertical: hp(2),
    paddingHorizontal: wp(3),
  },
  programText: {
    fontSize: normalize(16),
    color: COLORS.white,
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
  },
  optionImageStyle: {
    width: wp(5),
    height: hp(5),
    resizeMode: 'contain',
  },
  calories: {
    fontSize: normalize(16),
    fontFamily: Fonts.FONTS.PoppinsMedium,
    color: COLORS.white,
  },
  sectionTitle: {
    fontSize: normalize(20),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    color: COLORS.white,
    marginBottom: 10,
  },
  exerciseText: {
    fontSize: normalize(16),
    fontFamily: Fonts.FONTS.PoppinsRegular,
    color: COLORS.white,
  },
  workoutButton: {
    width: '100%',
    backgroundColor: COLORS.subPrimary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    borderRadius: 5,
    marginTop: hp(2),
  },
  startText: {
    fontSize: normalize(18),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    color: COLORS.white,
  },
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
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-around",
    // padding: 10,
    // backgroundColor: COLORS.primary,
    marginBottom: hp(2),
    
  },
  dayBox: {
    alignItems: "center",
    backgroundColor: COLORS.primary,
    padding: hp(1),
    borderRadius: 5,
  },
  date: {
    marginBottom: 10,
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    fontSize: normalize(15),
    color: COLORS.white,
  },
  dateFont: {
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    color: COLORS.white,
    fontSize: normalize(17),
  },
  dayFont: {
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    color: COLORS.white,
    fontSize: normalize(13),
  },
  foodText: {
    fontFamily: Fonts.FONTS.PoppinsRegular,
    fontSize: normalize(15),
    color: COLORS.white,
  },
  progremView: {
    width: '100%',
    paddingVertical: hp(2),
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    marginVertical: hp(2),
    paddingHorizontal: wp(3),
  }
})
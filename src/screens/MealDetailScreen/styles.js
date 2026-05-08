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
  headerView: {
    height: '8%', 
    width: '100%', 
    backgroundColor: COLORS.primary,
  },
  mainView: {
    height: '92%',
    width: '92%',
    alignSelf: 'center',
  },
  date: {
    color: COLORS.white,
    marginVertical: 15,
    fontSize: normalize(18),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
  },
  calorieCard: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  eaten: {
    color: COLORS.subPrimary,
    fontSize: normalize(18),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
  },
  kcal: {
    fontSize: normalize(16),
    fontFamily: Fonts.FONTS.PoppinsMedium,
    color: COLORS.white,
  },
  circle: {
    alignSelf: "center",
    marginVertical: 10,
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 6,
    borderColor: COLORS.subPrimary,
    justifyContent: "center",
    alignItems: "center",
  },
  remaining: {
    fontSize: normalize(15),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    color: COLORS.white,
  },
  macros: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  mealHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  sectionTitle: { 
    fontSize: normalize(20),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    color: COLORS.white,
  },
  mealContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width:'100%',
  },
  mealCard: {
    width: "48%",
    // paddingVertical: hp(2),
    borderRadius: 10,
    marginBottom: hp(2),
  },
  mealTitle: {
    color: COLORS.white,
    fontSize: normalize(18),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    flexShrink: 1,
  },
  mealDesc: {
    color: COLORS.white,
    fontSize: normalize(16),
    fontFamily: Fonts.FONTS.PoppinsRegular,
    marginVertical: hp(1),
  },
  kcalText: {
    color: COLORS.white,
    fontSize: normalize(16),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
  },
})

export const landscapeStyles = StyleSheet.create({
  safeAreaStyle: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
})
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
  subtitle: {
    fontSize: normalize(16),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    color: COLORS.white,
    marginBottom: 20,
  },
  card: {
    backgroundColor: COLORS.primary,
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 5,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: normalize(16),
    fontFamily: Fonts.FONTS.PoppinsMedium,
    color: COLORS.secondary,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconContainer: {
    width: 65,
    height: 65,
    borderRadius: 5,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    fontSize: 32,
    color: COLORS.white,
  },
  viewButton: {
    backgroundColor: "rgba(202, 197, 197, 0.5)",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  viewButtonText: {
    color: COLORS.secondary,
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    fontSize: normalize(14),
  },
  cardTitle: {
    color: COLORS.secondary,
    fontSize: 24,
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    marginTop: 20,
    marginBottom: 20,
  },
  tipsContainer: {
    marginTop: 5,
  },
  tipRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    marginTop: 7,
    marginRight: 10,
  },
  tipText: {
    flex: 1,
    color: COLORS.white,
    fontSize: 15,
    lineHeight: 24,
  },
})

export const landscapeStyles = StyleSheet.create({
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
  subtitle: {
    fontSize: normalize(16),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    color: COLORS.white,
    marginBottom: 20,
  },
  card: {
    backgroundColor: COLORS.primary,
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 5,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: normalize(16),
    fontFamily: Fonts.FONTS.PoppinsMedium,
    color: COLORS.secondary,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconContainer: {
    width: 65,
    height: 65,
    borderRadius: 5,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    fontSize: 32,
  },
  viewButton: {
    backgroundColor: "rgba(255,255,255,0.5)",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  viewButtonText: {
    color: COLORS.secondary,
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    fontSize: normalize(14),
  },
  cardTitle: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 20,
  },
  tipsContainer: {
    marginTop: 5,
  },
  tipRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    marginTop: 7,
    marginRight: 10,
  },
  tipText: {
    flex: 1,
    color: COLORS.white,
    fontSize: 15,
    lineHeight: 24,
  },
})
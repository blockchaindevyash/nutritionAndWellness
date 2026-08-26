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
  headerCard: {
    paddingTop: hp(1),
    paddingHorizontal: wp(1),
    paddingBottom: hp(2),
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 25,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  icon: {
    fontSize: 40,
  },
  title: {
    color: COLORS.white,
    fontSize: normalize(25),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    textAlign: "center",
    paddingVertical: 20,
  },
  description: {
    color: COLORS.white,
    textAlign: "center",
    lineHeight: 24,
    fontSize: normalize(15),
    paddingHorizontal: wp(1),
    fontFamily: Fonts.FONTS.PoppinsRegular,
  },
  goalBox: {
    backgroundColor: "rgba(255,255,255,0.2)",
    alignSelf: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 25,
  },
  goalText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
  section: {
    marginTop: 25,
  },
  sectionTitle: {
    fontSize: normalize(20),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    color: COLORS.white,
    marginBottom: 15,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 8,
  },
  listIcon: {
    fontSize: 18,
    marginRight: 12,
    color: COLORS.white,
  },
  listText: {
    flex: 1,
    color: COLORS.white,
    fontSize: normalize(16),
    fontFamily: Fonts.FONTS.PoppinsMedium,
  },
  timingCard: {
    borderRadius: 8,
    padding: 18,
    marginBottom: 15,
    backgroundColor: COLORS.primary,
  },
  timingTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  mealTitle: {
    fontSize: normalize(16),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    color: COLORS.white,
  },
  timeBadge: {
    backgroundColor: COLORS.subPrimary,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  timeText: {
    fontSize: normalize(14),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    color: COLORS.white,
  },
  tipDescription: {
    marginTop: 12,
    color: COLORS.greyColor,
    lineHeight: 22,
    fontSize: normalize(14),
    fontFamily: Fonts.FONTS.PoppinsMedium,
  },
  button: {
    backgroundColor: COLORS.subPrimary,
    marginTop: 30,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: COLORS.white,
    fontSize: normalize(17),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
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
  headerCard: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 40,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 25,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  icon: {
    fontSize: 40,
  },
  title: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 20,
  },
  description: {
    color: "#fff",
    textAlign: "center",
    lineHeight: 24,
    marginTop: 15,
    fontSize: 15,
  },
  goalBox: {
    backgroundColor: "rgba(255,255,255,0.2)",
    alignSelf: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 18,
    marginTop: 25,
  },
  goalText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
  section: {
    marginTop: 25,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111",
    marginBottom: 15,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 18,
  },
  listIcon: {
    fontSize: 18,
    marginRight: 12,
  },
  listText: {
    flex: 1,
    color: "#333",
    fontSize: 15,
    lineHeight: 22,
  },
  timingCard: {
    borderRadius: 22,
    padding: 18,
    marginBottom: 15,
  },
  timingTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  mealTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111",
  },
  timeBadge: {
    backgroundColor: "#ff6b57",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 14,
  },
  timeText: {
    color: "#fff",
    fontWeight: "700",
  },
  tipDescription: {
    marginTop: 12,
    color: "#666",
    lineHeight: 22,
  },
  button: {
    backgroundColor: "#ff6b57",
    marginHorizontal: 20,
    marginTop: 30,
    paddingVertical: 18,
    borderRadius: 18,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
})
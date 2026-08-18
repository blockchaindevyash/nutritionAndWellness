import {StyleSheet} from 'react-native';
import { COLORS, Fonts } from '../../utils';
import { hp, normalize, wp } from '../../components/responsive';

const baseStyles = {
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
    padding: wp(4),
  },
  greeting: {
    fontSize: normalize(20),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    color: COLORS.secondary,
  },
  subText: {
    color: COLORS.white,
    fontFamily: Fonts.FONTS.PoppinsMedium,
    fontSize: normalize(14),
    marginBottom: hp(2),
  },
  heroCard: {
    backgroundColor: COLORS.primary,
    borderRadius: normalize(16),
    padding: wp(4),
    marginBottom: hp(2),
  },
  heroRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heroLabel: {
    color: COLORS.greyColor,
    fontFamily: Fonts.FONTS.PoppinsMedium,
    fontSize: normalize(12),
  },
  heroValue: {
    color: COLORS.white,
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    fontSize: normalize(24),
    marginTop: hp(0.3),
  },
  heroCaption: {
    color: COLORS.textColor,
    fontFamily: Fonts.FONTS.PoppinsMedium,
    fontSize: normalize(12),
    marginTop: hp(1),
  },
  streakBadge: {
    width: normalize(44),
    height: normalize(44),
    borderRadius: normalize(22),
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  streakBadgeText: {
    fontSize: normalize(20),
  },
  calendarCard: {
    backgroundColor: COLORS.primary,
    borderRadius: normalize(16),
    padding: wp(4),
    marginBottom: hp(2),
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(1.5),
  },
  monthTitle: {
    color: COLORS.white,
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    fontSize: normalize(16),
  },
  navText: {
    color: COLORS.secondary,
    fontSize: normalize(20),
    paddingHorizontal: wp(2),
  },
  weekDaysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp(1),
  },
  weekDayText: {
    flex: 1,
    textAlign: 'center',
    color: COLORS.greyColor,
    fontFamily: Fonts.FONTS.PoppinsMedium,
    fontSize: normalize(12),
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  dayCell: {
    width: '13.5%',
    aspectRatio: 0.8,
    borderRadius: normalize(10),
    marginBottom: hp(0.8),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.backColor,
  },
  dayCellMuted: {
    opacity: 0.4,
  },
  dayCellSelected: {
    backgroundColor: COLORS.secondary,
  },
  dayCellToday: {
    backgroundColor: COLORS.lightPrimary,
  },
  dayCellStreak: {
    backgroundColor: COLORS.subPrimary,
  },
  dayCellCompleted: {
    borderWidth: 1,
    borderColor: COLORS.greenColor,
  },
  dayText: {
    color: COLORS.white,
    fontFamily: Fonts.FONTS.PoppinsMedium,
    fontSize: normalize(12),
  },
  dayTextMuted: {
    color: COLORS.textColor,
  },
  dayTextSelected: {
    color: COLORS.backColor,
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
  },
  dayTextToday: {
    color: COLORS.white,
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
  },
  dayTextStreak: {
    color: COLORS.white,
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
  },
  detailCard: {
    backgroundColor: COLORS.primary,
    borderRadius: normalize(16),
    padding: wp(4),
  },
  detailTitle: {
    color: COLORS.white,
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    fontSize: normalize(16),
  },
  detailSubtitle: {
    color: COLORS.greyColor,
    fontFamily: Fonts.FONTS.PoppinsMedium,
    fontSize: normalize(12),
    marginBottom: hp(1.2),
  },
  taskRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: hp(1.2),
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)',
  },
  taskLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskDot: {
    width: normalize(10),
    height: normalize(10),
    borderRadius: normalize(5),
    marginRight: wp(2),
  },
  taskDotDone: {
    backgroundColor: COLORS.secondary,
  },
  taskDotPending: {
    backgroundColor: COLORS.textColor,
  },
  taskLabel: {
    color: COLORS.white,
    fontFamily: Fonts.FONTS.PoppinsMedium,
    fontSize: normalize(14),
  },
  taskStatus: {
    fontFamily: Fonts.FONTS.PoppinsMedium,
    fontSize: normalize(12),
  },
  taskStatusDone: {
    color: COLORS.secondary,
  },
  taskStatusPending: {
    color: COLORS.textColor,
  },
  sectionText: {
    color: COLORS.errorColor,
    fontFamily: Fonts.FONTS.PoppinsMedium,
    fontSize: normalize(15),
    marginTop: hp(1),
  }
};

export const portraitStyles = StyleSheet.create(baseStyles);

export const landscapeStyles = StyleSheet.create(baseStyles);

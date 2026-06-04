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
    marginTop: hp(2),
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.backColor,
  },
  headerView: {
    height: '8%',
    width: '100%', 
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(4),
  },
  headerRowView: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  backIcon: {
    width: wp(5.5),
    height: hp(3.5),
    resizeMode: 'contain',
    tintColor: COLORS.white,
  },
  titleHeader: {
    fontSize: normalize(20),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    marginLeft: wp(5),
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
    fontSize: normalize(20),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    color: COLORS.white,
  },
  descriptionText: {
    color: COLORS.greyColor,
    marginTop: hp(1),
    fontFamily: Fonts.FONTS.PoppinsMedium,
    fontSize: normalize(16),
  },
  topBadge: {
    alignSelf: "flex-start",
    backgroundColor: COLORS.primary,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 5,
    marginBottom: 15,
  },
  badgeText: {
    color: COLORS.white,
    fontFamily: Fonts.FONTS.PoppinsMedium,
    fontSize: normalize(14),
  },
  infoRow: {
    flexDirection: "row",
    marginTop: 20,
  },
  infoCard: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 5,
    marginRight: 15,
  },
  infoValue: {
    color: COLORS.subPrimary,
    fontSize: normalize(16),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
  },
  infoLabel: {
    color: COLORS.white,
    fontSize: normalize(14),
    fontFamily: Fonts.FONTS.PoppinsRegular,
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
  },
  headerView: {
    height: '8%',
    width: '100%', 
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(4),
  },
  headerRowView: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  backIcon: {
    width: wp(6),
    height: hp(3.5),
    resizeMode: 'contain',
    tintColor: COLORS.white,
  },
  titleHeader: {
    fontSize: normalize(20),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    marginLeft: wp(5),
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
    marginTop: hp(0.5),
    fontFamily: Fonts.FONTS.PoppinsMedium,
    fontSize: normalize(16),
  },
  topBadge: {
    alignSelf: "flex-start",
    backgroundColor: COLORS.primary,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 5,
    marginBottom: 15,
  },
  badgeText: {
    color: COLORS.white,
    fontFamily: Fonts.FONTS.PoppinsMedium,
    fontSize: normalize(14),
  },
  infoRow: {
    flexDirection: "row",
    marginTop: 20,
  },
  infoCard: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 5,
    marginRight: 15,
  },
  infoValue: {
    color: COLORS.white,
    fontSize: normalize(16),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
  },
  infoLabel: {
    color: COLORS.white,
    fontSize: normalize(12),
    fontFamily: Fonts.FONTS.PoppinsRegular,
  },
})
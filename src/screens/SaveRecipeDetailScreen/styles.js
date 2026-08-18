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
    fontSize: normalize(18),
    fontFamily: Fonts.FONTS.PoppinsMedium,
    color: COLORS.secondary,
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
    color: COLORS.secondary,
  },
  descriptionText: {
    color: COLORS.textColor,
    marginTop: hp(1),
    fontFamily: Fonts.FONTS.PoppinsRegular,
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
    color: COLORS.secondary,
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
    color: COLORS.secondary,
    fontSize: normalize(14),
    fontFamily: Fonts.FONTS.PoppinsRegular,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(2),
    alignItems: 'center',
  },
  actionButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: hp(1.5),
    alignItems: 'center',
    marginRight: wp(2),
  },
  actionButtonActive: {
    backgroundColor: COLORS.secondary,
  },
  actionText: {
    color: COLORS.white,
    fontSize: normalize(14),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
  },
  actionTextActive: {
    color: COLORS.white,
  },
  commentCard: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: wp(4),
    marginTop: hp(1.5),
  },
  commentUserName: {
    color: COLORS.white,
    fontSize: normalize(14),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
  },
  commentText: {
    color: COLORS.greyColor,
    fontSize: normalize(14),
    fontFamily: Fonts.FONTS.PoppinsMedium,
    marginTop: hp(1),
  },
  commentDate: {
    color: COLORS.greyColor,
    fontSize: normalize(12),
    marginTop: hp(1),
  },
  emptyCommentText: {
    color: COLORS.greyColor,
    marginTop: hp(1.5),
    fontSize: normalize(14),
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    justifyContent: 'flex-end',
  },
  commentModalContent: {
    backgroundColor: COLORS.backColor,
    padding: wp(5),
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalHandle: {
    width: wp(20),
    height: hp(0.7),
    backgroundColor: COLORS.greyColor,
    borderRadius: wp(5),
    alignSelf: 'center',
    marginBottom: hp(2),
  },
  modalTitle: {
    color: COLORS.white,
    fontSize: normalize(18),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    marginBottom: hp(2),
  },
  commentInput: {
    backgroundColor: COLORS.primary,
    color: COLORS.white,
    borderRadius: 12,
    padding: wp(4),
    minHeight: hp(12),
    textAlignVertical: 'top',
    fontSize: normalize(14),
    fontFamily: Fonts.FONTS.PoppinsMedium,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(3),
  },
  modalButton: {
    flex: 1,
    paddingVertical: hp(1.5),
    borderRadius: 10,
    alignItems: 'center',
  },
  modalCancelButton: {
    backgroundColor: COLORS.secondary,
    marginRight: wp(2),
  },
  modalSubmitButton: {
    backgroundColor: COLORS.subPrimary,
  },
  modalButtonText: {
    color: COLORS.white,
    fontSize: normalize(14),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
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
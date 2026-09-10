import {StyleSheet} from 'react-native';
import {COLORS, Fonts} from '../../utils';
import {hp, normalize, wp} from '../../components/responsive';

export const portraitStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.backColor,
  },

  header: {
    height: hp(8),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(4),
    backgroundColor: COLORS.primary,
  },
  backArrow: {
    height: hp(3),
    width: wp(5),
    resizeMode: 'contain',
    tintColor: COLORS.white,
  },
  backButton: {
    width: wp(10),
    height: wp(10),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(2),
  },

  headerContent: {
    flex: 1,
    justifyContent: 'center',
  },

  headerTitle: {
    color: COLORS.white,
    fontSize: normalize(17),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
  },

  headerSubtitle: {
    color: COLORS.greyColor,
    fontSize: normalize(12),
    marginTop: hp(0.3),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
  },

  headerAction: {
    width: wp(10),
    height: wp(10),
    alignItems: 'center',
    justifyContent: 'center',
  },

  tabsContainer: {
    flexDirection: 'row',
    marginHorizontal: wp(4),
    marginTop: hp(1),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  tab: {
    flex: 1,
    height: hp(6),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: wp(1.5),
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },

  activeTab: {
    borderBottomColor: COLORS.secondary,
  },

  tabText: {
    color: COLORS.white,
    fontSize: normalize(15),
    fontFamily: Fonts.FONTS.PoppinsMedium,
  },

  activeTabText: {
    color: COLORS.secondary,
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    fontSize: normalize(15),
  },

  countContainer: {
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.5),
  },

  countText: {
    color: COLORS.white,
    fontSize: normalize(14),
    fontFamily: Fonts.FONTS.PoppinsMedium,
  },

  content: {
    flex: 1,
  },

  mediaList: {
    paddingHorizontal: wp(3),
    paddingBottom: hp(3),
  },

  mediaRow: {
    marginBottom: wp(1),
  },

  mediaItem: {
    width: wp(30.7),
    height: wp(30.7),
    marginHorizontal: wp(0.5),
    borderRadius: wp(1.5),
    overflow: 'hidden',
    backgroundColor: COLORS.card,
  },

  mediaMiddleItem: {
    marginHorizontal: wp(0.5),
  },

  mediaImage: {
    width: '100%',
    height: '100%',
  },

  videoOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },

  playCircle: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(5),
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  listContainer: {
    paddingHorizontal: wp(4),
    paddingBottom: hp(3),
  },

  linkRow: {
    minHeight: hp(10),
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(1.5),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  linkIconContainer: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(2),
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3),
  },

  linkContent: {
    flex: 1,
    marginRight: wp(2),
  },

  linkTitle: {
    color: COLORS.white,
    fontSize: normalize(14),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
  },

  linkUrl: {
    color: COLORS.white,
    fontSize: normalize(12),
    marginTop: hp(0.5),
    fontFamily: Fonts.FONTS.PoppinsRegular,
  },

  linkMeta: {
    color: COLORS.white,
    fontSize: normalize(12),
    marginTop: hp(0.5),
    fontFamily: Fonts.FONTS.PoppinsRegular,
  },

  documentRow: {
    minHeight: hp(10),
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(1.5),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.white,
  },

  documentIconContainer: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(2.5),
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3),
  },

  documentContent: {
    flex: 1,
    marginRight: wp(2),
  },

  documentName: {
    color: COLORS.white,
    fontSize: normalize(15),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
  },

  documentMeta: {
    color: COLORS.white,
    fontSize: normalize(12),
    fontFamily: Fonts.FONTS.PoppinsRegular,
    marginTop: hp(0.5),
  },

  documentSender: {
    color: COLORS.white,
    fontSize: normalize(12),
    fontFamily: Fonts.FONTS.PoppinsRegular,
    marginTop: hp(0.5),
  },
});

export const landscapeStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  header: {
    height: hp(8),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(4),
    backgroundColor: COLORS.background,
  },

  backButton: {
    width: wp(10),
    height: wp(10),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(2),
  },

  headerContent: {
    flex: 1,
    justifyContent: 'center',
  },

  headerTitle: {
    color: COLORS.white,
    fontSize: normalize(17),
    fontWeight: '700',
  },

  headerSubtitle: {
    color: COLORS.gray,
    fontSize: normalize(12),
    marginTop: hp(0.3),
  },

  headerAction: {
    width: wp(10),
    height: wp(10),
    alignItems: 'center',
    justifyContent: 'center',
  },

  tabsContainer: {
    flexDirection: 'row',
    marginHorizontal: wp(4),
    marginTop: hp(1),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  tab: {
    flex: 1,
    height: hp(6),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: wp(1.5),
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },

  activeTab: {
    borderBottomColor: COLORS.primary,
  },

  tabText: {
    color: COLORS.gray,
    fontSize: normalize(13),
    fontWeight: '500',
  },

  activeTabText: {
    color: COLORS.primary,
    fontWeight: '700',
  },

  countContainer: {
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.5),
  },

  countText: {
    color: COLORS.gray,
    fontSize: normalize(12),
  },

  content: {
    flex: 1,
  },

  mediaList: {
    paddingHorizontal: wp(3),
    paddingBottom: hp(3),
  },

  mediaRow: {
    marginBottom: wp(1),
  },

  mediaItem: {
    width: wp(30.7),
    height: wp(30.7),
    marginHorizontal: wp(0.5),
    borderRadius: wp(1.5),
    overflow: 'hidden',
    backgroundColor: COLORS.card,
  },

  mediaMiddleItem: {
    marginHorizontal: wp(0.5),
  },

  mediaImage: {
    width: '100%',
    height: '100%',
  },

  videoOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },

  playCircle: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(5),
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  listContainer: {
    paddingHorizontal: wp(4),
    paddingBottom: hp(3),
  },

  linkRow: {
    minHeight: hp(10),
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(1.5),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  linkIconContainer: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(2.5),
    backgroundColor: COLORS.card,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3),
  },

  linkContent: {
    flex: 1,
    marginRight: wp(2),
  },

  linkTitle: {
    color: COLORS.white,
    fontSize: normalize(14),
    fontWeight: '600',
  },

  linkUrl: {
    color: COLORS.primary,
    fontSize: normalize(12),
    marginTop: hp(0.5),
  },

  linkMeta: {
    color: COLORS.gray,
    fontSize: normalize(11),
    marginTop: hp(0.5),
  },

  documentRow: {
    minHeight: hp(10),
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(1.5),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  documentIconContainer: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(2.5),
    backgroundColor: COLORS.card,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3),
  },

  documentContent: {
    flex: 1,
    marginRight: wp(2),
  },

  documentName: {
    color: COLORS.white,
    fontSize: normalize(14),
    fontWeight: '600',
  },

  documentMeta: {
    color: COLORS.primary,
    fontSize: normalize(12),
    marginTop: hp(0.5),
  },

  documentSender: {
    color: COLORS.gray,
    fontSize: normalize(11),
    marginTop: hp(0.5),
  },
});
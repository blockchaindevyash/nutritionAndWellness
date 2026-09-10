import {StyleSheet} from 'react-native';
import {COLORS, Fonts} from '../../utils';
import {hp, normalize, wp} from '../../components/responsive';

export const portraitStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backColor || '#F7F9F8',
  },

  safeArea: {
    width: '100%',
    backgroundColor: COLORS.primary,
  },

  /* HEADER */
  backArrow: {
    height: hp(3),
    width: wp(5),
    resizeMode: 'contain',
    tintColor: COLORS.white,
  },
  inputIcon: {
    height: hp(3),
    width: wp(5),
    resizeMode: 'contain',
  },
  header: {
    height: 62,
    width: '100%',
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(2),
  },

  headerButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: normalize(17),
    fontFamily: Fonts?.semiBold,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  /* CONTENT */

  contentContainer: {
    paddingBottom: 20,
  },

  /* GROUP PROFILE */

  groupProfile: {
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingTop: 25,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E8ECEA',
  },

  groupImage: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: '#E8E8E8',
  },

  groupImagePlaceholder: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: '#DDF3F1',
    justifyContent: 'center',
    alignItems: 'center',
  },

  groupImageText: {
    fontSize: normalize(34),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    color: COLORS.primary,
  },

  groupName: {
    marginTop: 13,
    fontSize: normalize(20),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    color: COLORS.white,
    textAlign: 'center',
  },

  groupMembers: {
    marginTop: 4,
    fontSize: normalize(14),
    fontFamily: Fonts.FONTS.PoppinsMedium,
    color: COLORS.greyColor,
  },

  /* CARD */

  card: {
    marginTop: 10,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: normalize(15),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    color: COLORS.white,
    paddingTop: 15,
    paddingBottom: 10,
  },
  description: {
    fontSize: normalize(13),
    fontFamily: Fonts.FONTS.PoppinsMedium,
    color: COLORS.white,
    lineHeight: 20,
    paddingBottom: 16,
  },

  /* ACTION */

  actionRow: {
    minHeight: 57,
    flexDirection: 'row',
    alignItems: 'center',
  },

  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EAF8F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  actionText: {
    flex: 1,
    fontSize: normalize(14),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    color: COLORS.white,
  },
  actionCount: {
    fontSize: normalize(12),
    color: COLORS.white,
    marginRight: 8,
    fontFamily: Fonts.FONTS.PoppinsMedium,
  },

  actionArrow: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  divider: {
    height: 1,
    backgroundColor: '#EEEEEE',
    marginLeft: 52,
  },

  /* MEMBERS */

  membersHeader: {
    marginTop: 10,
    paddingHorizontal: 16,
    backgroundColor: COLORS.primary,
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
  },

  memberTotal: {
    fontSize: normalize(12),
    color: '#999999',
    fontFamily: Fonts.FONTS.PoppinsMedium,
    marginLeft: 5,
  },

  addMemberRow: {
    height: 60,
    paddingHorizontal: 16,
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
  },

  addMemberIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#DDF3F1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  addMemberText: {
    fontSize: normalize(14),
    fontFamily: Fonts.FONTS.PoppinsMedium,
    color: COLORS.white,
  },

  /* MEMBER */

  memberRow: {
    minHeight: 66,
    paddingHorizontal: 16,
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
  },

  memberAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#DDF3F1',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },

  memberAvatarText: {
    fontSize: normalize(16),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    color: COLORS.primary,
  },

  memberOnlineDot: {
    position: 'absolute',
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: COLORS.secondary,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    right: 0,
    bottom: 1,
  },

  memberInfo: {
    flex: 1,
    marginLeft: 12,
  },

  memberName: {
    fontSize: normalize(14),
    fontFamily: Fonts.FONTS.PoppinsMedium,
    color: COLORS.white,
  },

  memberRole: {
    marginTop: 2,
    fontSize: normalize(11),
    fontFamily: Fonts.FONTS.PoppinsRegular,
    color: COLORS.greyColor,
  },

  adminBadge: {
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 10,
    backgroundColor: COLORS.subPrimary,
  },
  adminBadgeText: {
    fontSize: normalize(11),
    fontFamily: Fonts.FONTS.PoppinsMedium,
    color: COLORS.primary,
  },

  seeAllButton: {
    height: 52,
    backgroundColor: COLORS.primary,
    marginTop: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  seeAllText: {
    fontSize: normalize(15),
    fontFamily: Fonts.FONTS.PoppinsMedium,
    color: COLORS.white,
    marginRight: 4,
  },

  /* LEAVE */

  dangerCard: {
    marginTop: 10,
    backgroundColor: COLORS.primary,
  },

  leaveRow: {
    minHeight: 58,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },

  leaveIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF0F1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  leaveText: {
    fontSize: normalize(15),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    color: COLORS.subPrimary,
  },

  bottomSpace: {
    height: 30,
  },
});

export const landscapeStyles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: COLORS.backColor || '#F7F9F8',
  },

  safeArea: {
    width: '100%',
    backgroundColor: COLORS.primary,
  },

  header: {
    height: 62,
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(3),
  },

  headerButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: normalize(17),
    fontFamily: Fonts?.semiBold,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  contentContainer: {
    paddingBottom: 20,
    width: '100%',
    maxWidth: 850,
    alignSelf: 'center',
  },

  groupProfile: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    paddingBottom: 20,
  },

  groupImage: {
    width: 82,
    height: 82,
    borderRadius: 41,
  },

  groupImagePlaceholder: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: '#DDF3F1',
    justifyContent: 'center',
    alignItems: 'center',
  },

  groupImageText: {
    fontSize: normalize(30),
    fontWeight: '700',
    color: COLORS.primary,
  },

  groupName: {
    marginTop: 10,
    fontSize: normalize(19),
    fontWeight: '600',
    color: '#202020',
  },

  groupMembers: {
    marginTop: 3,
    fontSize: normalize(12),
    color: '#888888',
  },

  card: {
    marginTop: 8,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 18,
  },

  sectionTitle: {
    fontSize: normalize(15),
    fontWeight: '600',
    color: '#252525',
    paddingTop: 14,
    paddingBottom: 9,
  },

  description: {
    fontSize: normalize(13),
    color: '#777777',
    lineHeight: 20,
    paddingBottom: 15,
  },

  actionRow: {
    minHeight: 55,
    flexDirection: 'row',
    alignItems: 'center',
  },

  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EAF8F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  actionText: {
    flex: 1,
    fontSize: normalize(13),
    color: '#333333',
  },

  actionCount: {
    fontSize: normalize(12),
    color: '#999999',
    marginRight: 8,
  },

  divider: {
    height: 1,
    backgroundColor: '#EEEEEE',
    marginLeft: 52,
  },

  membersHeader: {
    marginTop: 8,
    paddingHorizontal: 18,
    backgroundColor: '#FFFFFF',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },

  memberTotal: {
    fontSize: normalize(12),
    color: '#999999',
    marginLeft: 5,
  },

  addMemberRow: {
    height: 58,
    paddingHorizontal: 18,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
  },

  addMemberIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  addMemberText: {
    fontSize: normalize(14),
    fontWeight: '500',
    color: COLORS.primary,
  },

  memberRow: {
    minHeight: 62,
    paddingHorizontal: 18,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
  },

  memberAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#DDF3F1',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },

  memberAvatarText: {
    fontSize: normalize(15),
    fontWeight: '600',
    color: COLORS.primary,
  },

  memberOnlineDot: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#35C759',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    right: 0,
    bottom: 1,
  },

  memberInfo: {
    flex: 1,
    marginLeft: 12,
  },

  memberName: {
    fontSize: normalize(14),
    fontWeight: '500',
    color: '#272727',
  },

  memberRole: {
    marginTop: 2,
    fontSize: normalize(11),
    color: '#999999',
  },

  adminBadge: {
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 10,
    backgroundColor: '#EAF8F7',
  },

  adminBadgeText: {
    fontSize: normalize(9),
    color: COLORS.primary,
  },

  seeAllButton: {
    height: 50,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  seeAllText: {
    fontSize: normalize(13),
    color: COLORS.primary,
    marginRight: 4,
  },

  dangerCard: {
    marginTop: 8,
    backgroundColor: '#FFFFFF',
  },

  leaveRow: {
    minHeight: 58,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },

  leaveIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF0F1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  leaveText: {
    fontSize: normalize(14),
    fontWeight: '500',
    color: '#E04F5F',
  },

  bottomSpace: {
    height: 30,
  },
});
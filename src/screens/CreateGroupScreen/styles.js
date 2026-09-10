import {StyleSheet} from 'react-native';
import { COLORS, Fonts } from '../../utils';
import { hp, normalize, wp } from '../../components/responsive';

export const portraitStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backColor || '#F7F9F8',
  },

  headerView: {
    height: hp(8),
    width: '100%',
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
  },

  content: {
    flex: 1,
    paddingHorizontal: wp(4),
  },

  searchContainer: {
    height: hp(6),
    marginTop: hp(2),
    marginBottom: hp(1),
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingHorizontal: wp(4),
    flexDirection: 'row',
    alignItems: 'center',
  },

  searchInput: {
    flex: 1,
    marginLeft: wp(2.5),
    fontSize: normalize(14),
    color: COLORS.white,
    paddingVertical: 0,
    fontFamily: Fonts.FONTS.PoppinsMedium,
  },

  selectedSection: {
    marginTop: hp(1),
    marginBottom: hp(1),
  },

  sectionTitle: {
    fontSize: normalize(15),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    color: COLORS.white,
  },

  selectedList: {
    paddingTop: hp(1.5),
    paddingBottom: hp(1),
  },

  selectedUserContainer: {
    width: wp(18),
    alignItems: 'center',
    marginRight: wp(2),
  },

  selectedAvatarWrapper: {
    position: 'relative',
  },

  selectedAvatar: {
    width: wp(15),
    height: wp(15),
    borderRadius: wp(7.5),
  },

  selectedAvatarPlaceholder: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(6),
    backgroundColor: '#E0F4F2',
    justifyContent: 'center',
    alignItems: 'center',
  },

  selectedAvatarText: {
    fontSize: normalize(17),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    color: COLORS.primary,
  },

  removeSelectedButton: {
    position: 'absolute',
    right: -3,
    top: -3,
    width: wp(5),
    height: wp(5),
    borderRadius: wp(2.5),
    backgroundColor: '#E34B4B',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },

  selectedUserName: {
    marginTop: hp(0.6),
    fontSize: normalize(11),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    color: COLORS.white,
    textAlign: 'center',
  },

  contactHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(1),
    marginBottom: hp(0.5),
  },

  contactCount: {
    marginLeft: wp(2),
    color: COLORS.white,
    fontSize: normalize(13),
    fontFamily: Fonts.FONTS.PoppinsMedium,
  },

  contactList: {
    paddingBottom: hp(12),
  },

  contactRow: {
    minHeight: hp(8),
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(1),
    borderBottomWidth: 1,
    borderBottomColor: '#ECEFEE',
  },

  contactAvatar: {
    width: wp(13),
    height: wp(13),
    borderRadius: wp(6.5),
    overflow: 'hidden',
  },

  contactImage: {
    width: '100%',
    height: '100%',
  },

  contactPlaceholder: {
    width: '90%',
    height: '90%',
    borderRadius: wp(6.5),
    backgroundColor: '#E0F4F2',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },

  contactInitials: {
    fontSize: normalize(15),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    color: COLORS.primary,
  },

  contactInfo: {
    flex: 1,
    marginLeft: wp(3),
  },

  contactName: {
    fontSize: normalize(16),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    color: COLORS.white,
  },

  contactNumber: {
    marginTop: hp(0.4),
    fontSize: normalize(12),
    fontFamily: Fonts.FONTS.PoppinsMedium,
    color: COLORS.greyColor,
  },

  selectionCircle: {
    width: wp(6),
    height: wp(6),
    borderRadius: wp(3),
    borderWidth: 1.5,
    borderColor: '#C7CECB',
    justifyContent: 'center',
    alignItems: 'center',
  },

  selectionCircleSelected: {
    backgroundColor: COLORS.secondary,
    borderColor: COLORS.secondary,
  },

  bottomButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: wp(4),
    paddingTop: hp(1),
  },

  continueButton: {
    height: hp(6.5),
    borderRadius: 12,
    backgroundColor: COLORS.subPrimary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  continueButtonText: {
    color: COLORS.white,
    fontSize: normalize(17),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    marginRight: wp(2),
  },

  emptyView: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: hp(10),
    paddingHorizontal: wp(10),
  },

  emptyTitle: {
    marginTop: hp(2),
    fontSize: normalize(16),
    fontWeight: '700',
    color: '#444444',
  },

  emptyText: {
    marginTop: hp(1),
    fontSize: normalize(13),
    color: '#999999',
    textAlign: 'center',
    lineHeight: normalize(19),
  },

  // Create Group Info

  groupInfoContent: {
    paddingHorizontal: wp(4),
    paddingBottom: hp(12),
  },

  groupImageSection: {
    alignItems: 'center',
    marginTop: hp(3),
    marginBottom: hp(3),
  },

  groupImageWrapper: {
    position: 'relative',
  },

  groupImage: {
    width: wp(30),
    height: wp(30),
    borderRadius: wp(15),
  },

  groupImagePlaceholder: {
    width: wp(30),
    height: wp(30),
    borderRadius: wp(15),
    backgroundColor: '#E0F4F2',
    justifyContent: 'center',
    alignItems: 'center',
  },

  cameraButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: wp(10),
    height: wp(10),
    borderRadius: wp(5),
    backgroundColor: COLORS.primary,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  changePhotoText: {
    marginTop: hp(1),
    fontSize: normalize(13),
    color: COLORS.primary,
    fontWeight: '600',
  },

  inputSection: {
    marginBottom: hp(2),
  },

  inputLabel: {
    fontSize: normalize(14),
    fontWeight: '700',
    color: '#333333',
    marginBottom: hp(1),
  },

  groupNameInputWrapper: {
    height: hp(6.5),
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E1E6E4',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(4),
  },

  groupNameInput: {
    flex: 1,
    marginLeft: wp(3),
    fontSize: normalize(14),
    color: '#222222',
  },

  characterCount: {
    textAlign: 'right',
    marginTop: hp(0.5),
    fontSize: normalize(11),
    color: '#999999',
  },

  membersHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(1),
    marginBottom: hp(1),
  },

  memberCount: {
    marginLeft: wp(2),
    color: '#888888',
    fontSize: normalize(13),
  },

  memberRow: {
    minHeight: hp(8),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ECEFEE',
  },

  memberAvatar: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(6),
  },

  memberAvatarPlaceholder: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(6),
    backgroundColor: '#E0F4F2',
    justifyContent: 'center',
    alignItems: 'center',
  },

  memberInitials: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: normalize(14),
  },

  memberInfo: {
    flex: 1,
    marginLeft: wp(3),
  },

  memberName: {
    fontSize: normalize(14),
    fontWeight: '600',
    color: '#222222',
  },

  memberPhone: {
    marginTop: hp(0.3),
    fontSize: normalize(12),
    color: '#888888',
  },

  footerSpace: {
    height: hp(3),
  },

  createButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: wp(4),
    paddingTop: hp(1),
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E9E7',
  },

  createButton: {
    height: hp(6.5),
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  createButtonDisabled: {
    opacity: 0.6,
  },

  createButtonText: {
    marginLeft: wp(2),
    color: '#FFFFFF',
    fontSize: normalize(15),
    fontWeight: '700',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp(1.5),
    marginBottom: hp(0.8),
  },

  sectionSubtitle: {
    fontSize: normalize(12),
    color: COLORS.white,
    marginTop: hp(0.3),
  },
  countBadge: {
    minWidth: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E7F7F6',
    paddingHorizontal: 8,
  },

  countBadgeText: {
    fontSize: normalize(14),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    color: COLORS.primary,
  },

  inviteCountBadge: {
    minWidth: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F2F2F2',
    paddingHorizontal: 8,
  },

  inviteCountBadgeText: {
    fontSize: normalize(14),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    color: COLORS.primary,
  },

  nameWithRegistered: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  registeredBadge: {
    marginLeft: 8,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 6,
    backgroundColor: '#E8F7E8',
  },

  registeredBadgeText: {
    fontSize: normalize(12),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    color: COLORS.secondary,
  },

  inviteSection: {
    marginTop: hp(1),
    paddingTop: hp(1.5),
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },

  inviteContactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(1.2),
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },

  inviteButton: {
    minWidth: 78,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.subPrimary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },

  inviteButtonText: {
    color: '#FFFFFF',
    fontSize: normalize(12),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    marginLeft: 5,
  },

  smallEmptyView: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp(2),
  },

  emptyTitle: {
    fontSize: normalize(15),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    color: COLORS.white,
    marginTop: hp(1),
  },

  emptyText: {
    fontSize: normalize(12),
    color: COLORS.white,
    textAlign: 'center',
    marginTop: hp(0.5),
    paddingHorizontal: 30,
    fontFamily: Fonts.FONTS.PoppinsRegular,
  },
});

export const landscapeStyles = StyleSheet.create({
  ...portraitStyles,

  content: {
    flex: 1,
    paddingHorizontal: wp(8),
  },

  groupInfoContent: {
    paddingHorizontal: wp(8),
    paddingBottom: hp(12),
  },

  selectedUserContainer: {
    width: wp(10),
    alignItems: 'center',
    marginRight: wp(1.5),
  },

  selectedAvatar: {
    width: wp(8),
    height: wp(8),
    borderRadius: wp(4),
  },

  selectedAvatarPlaceholder: {
    width: wp(6),
    height: wp(6),
    borderRadius: wp(3),
    backgroundColor: '#E0F4F2',
    justifyContent: 'center',
    alignItems: 'center',
  },

  contactRow: {
    minHeight: hp(11),
    paddingVertical: hp(1),
  },

  contactAvatar: {
    width: hp(8),
    height: hp(8),
    borderRadius: hp(4),
  },

  contactPlaceholder: {
    borderRadius: hp(4),
  },

  groupImage: {
    width: hp(25),
    height: hp(25),
    borderRadius: hp(12.5),
  },

  groupImagePlaceholder: {
    width: hp(25),
    height: hp(25),
    borderRadius: hp(12.5),
  },
});
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
    backgroundColor: COLORS.secondary,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  changePhotoText: {
    marginTop: hp(1),
    fontSize: normalize(16),
    color: COLORS.white,
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
  },

  inputSection: {
    marginBottom: hp(2),
  },

  inputLabel: {
    fontSize: normalize(15),
    fontFamily: Fonts.FONTS.PoppinsMedium,
    color: COLORS.white,
    marginBottom: hp(1),
  },

  groupNameInputWrapper: {
    height: hp(6.5),
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(4),
  },

  groupNameInput: {
    flex: 1,
    marginLeft: wp(3),
    fontSize: normalize(15),
    color: COLORS.white,
    fontFamily: Fonts.FONTS.PoppinsMedium,
  },

  characterCount: {
    textAlign: 'right',
    marginTop: hp(0.5),
    fontSize: normalize(12),
    color: COLORS.white,
    fontFamily: Fonts.FONTS.PoppinsRegular,
  },

  membersHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(1),
    marginBottom: hp(1),
  },

  memberCount: {
    marginLeft: wp(2),
    color: COLORS.white,
    fontSize: normalize(14),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
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
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    fontSize: normalize(14),
  },

  memberInfo: {
    flex: 1,
    marginLeft: wp(3),
  },

  memberName: {
    fontSize: normalize(15),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    color: COLORS.white,
  },

  memberPhone: {
    marginTop: hp(0.3),
    fontSize: normalize(12),
    color: COLORS.greyColor,
    fontFamily: Fonts.FONTS.PoppinsRegular,
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
  },

  createButton: {
    height: hp(6.5),
    borderRadius: 12,
    backgroundColor: COLORS.subPrimary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  createButtonDisabled: {
    opacity: 0.6,
  },
  sectionTitle: {
    fontSize: normalize(15),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    color: COLORS.white,
  },
  createButtonText: {
    marginLeft: wp(2),
    color: COLORS.white,
    fontSize: normalize(16),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
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
    width: wp(8),
    height: wp(8),
    borderRadius: wp(4),
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
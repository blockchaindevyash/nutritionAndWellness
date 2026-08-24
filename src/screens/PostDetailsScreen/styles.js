import {StyleSheet} from 'react-native';
import { COLORS, Fonts } from '../../utils';
import { hp, normalize, wp } from '../../components/responsive';

export const portraitStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backColor,
  },
  flex: {
    flex: 1,
  },
  header: {
    height: 62,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    width: wp(6),
    height: hp(3.5),
    resizeMode: 'contain',
    tintColor: COLORS.white,
  },
  headerTitle: {
    fontSize: normalize(20),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    color: COLORS.white,
    marginLeft: wp(4)
  },
  headerMore: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  postCard: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    padding: 16,
    marginVertical: 20,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
  },
  userInfo: {
    flex: 1,
    marginLeft: 11,
  },
  userName: {
    fontSize: normalize(14),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    color: COLORS.white,
  },
  postTime: {
    fontSize: normalize(11),
    color: COLORS.textColor,
    marginTop: 3,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.secondary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    marginTop: 15,
  },
  categoryText: {
    fontSize: normalize(11),
    color: COLORS.white,
    fontFamily: Fonts.FONTS.PoppinsMedium,
  },
  postTitle: {
    fontSize: normalize(20),
    lineHeight: 27,
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    color: COLORS.white,
    marginTop: 12,
  },
  postDescription: {
    fontSize: normalize(14),
    color: COLORS.white,
    fontFamily: Fonts.FONTS.PoppinsRegular,
    lineHeight: 22,
    marginTop: 9,
  },
  postImage: {
    width: '100%',
    height: 210,
    borderRadius: 14,
    marginTop: 15,
  },
  actionsContainer: {
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    marginTop: 16,
    paddingTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 25,
  },
  actionText: {
    marginLeft: 6,
    fontSize: normalize(12),
    color: COLORS.white,
  },
  likedText: {
    color: COLORS.subPrimary,
  },
  bookmarkButton: {
    marginLeft: 'auto',
  },
  commentsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 13,
  },
  commentsTitle: {
    fontSize: normalize(18),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    color: COLORS.white,
  },
  commentsCount: {
    marginLeft: 7,
    backgroundColor: COLORS.secondary,
    color: COLORS.white,
    fontSize: normalize(12),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    overflow: 'hidden',
  },
  commentContainer: {
    flexDirection: 'row',
    marginBottom: 18,
  },
  commentAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
  },
  commentContent: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    padding: 12,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  commentUser: {
    fontSize: normalize(13),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    color: COLORS.white,
  },
  commentTime: {
    fontSize: normalize(10),
    color: COLORS.textColor,
    fontFamily: Fonts.FONTS.PoppinsMedium,
    marginTop: 2,
  },
  commentText: {
    fontSize: normalize(13),
    lineHeight: 19,
    color: COLORS.white,
    fontFamily: Fonts.FONTS.PoppinsMedium,
    marginTop: 9,
  },
  commentActions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  commentAction: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  replyAction: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  commentActionText: {
    fontSize: normalize(11),
    color: COLORS.white,
    fontFamily: Fonts.FONTS.PoppinsRegular,
    marginLeft: 5,
  },
  commentLikedText: {
    color: COLORS.subPrimary,
  },
  replyContainer: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  replyAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginBottom: 4,
  },
  replyInputContainer: {
    flex: 1,
    minHeight: 43,
    maxHeight: 110,
    marginLeft: 9,
    borderRadius: 22,
    backgroundColor: '#F5F7F5',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 5,
  },
  replyInput: {
    flex: 1,
    fontSize: normalize(13),
    color: COLORS.black,
    fontFamily: Fonts.FONTS.PoppinsMedium,
    maxHeight: 90,
    paddingVertical: 9,
  },
  sendButton: {
    width: 35,
    height: 35,
    borderRadius: 18,
    backgroundColor: COLORS.subPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
});

export const landscapeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAF8',
  },

  flex: {
    flex: 1,
  },

  header: {
    height: 62,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
  },

  headerMore: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },

  postCard: {
    backgroundColor: '#FFF',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#EDEDED',
    marginBottom: 20,
  },

  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
  },

  userInfo: {
    flex: 1,
    marginLeft: 11,
  },

  userName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#222',
  },

  postTime: {
    fontSize: 11,
    color: '#999',
    marginTop: 3,
  },

  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#EAF6EA',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    marginTop: 15,
  },

  categoryText: {
    fontSize: 11,
    color: '#4CAF50',
    fontWeight: '600',
  },

  postTitle: {
    fontSize: 20,
    lineHeight: 27,
    fontWeight: '700',
    color: '#222',
    marginTop: 12,
  },

  postDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
    marginTop: 9,
  },

  postImage: {
    width: '100%',
    height: 210,
    borderRadius: 14,
    marginTop: 15,
  },

  actionsContainer: {
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    marginTop: 16,
    paddingTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },

  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 25,
  },

  actionText: {
    marginLeft: 6,
    fontSize: 12,
    color: '#666',
  },

  likedText: {
    color: '#E53935',
  },

  bookmarkButton: {
    marginLeft: 'auto',
  },

  commentsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 13,
  },

  commentsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
  },

  commentsCount: {
    marginLeft: 7,
    backgroundColor: '#EAF6EA',
    color: '#4CAF50',
    fontSize: 11,
    fontWeight: '700',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    overflow: 'hidden',
  },

  commentContainer: {
    flexDirection: 'row',
    marginBottom: 18,
  },

  commentAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
  },

  commentContent: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 12,
  },

  commentHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },

  commentUser: {
    fontSize: 13,
    fontWeight: '700',
    color: '#333',
  },

  commentTime: {
    fontSize: 10,
    color: '#999',
    marginTop: 2,
  },

  commentText: {
    fontSize: 13,
    lineHeight: 19,
    color: '#666',
    marginTop: 9,
  },

  commentActions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },

  commentAction: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  replyAction: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },

  commentActionText: {
    fontSize: 11,
    color: '#777',
    marginLeft: 5,
  },

  commentLikedText: {
    color: '#E53935',
  },

  replyContainer: {
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#E8E8E8',
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },

  replyAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginBottom: 4,
  },

  replyInputContainer: {
    flex: 1,
    minHeight: 43,
    maxHeight: 110,
    marginLeft: 9,
    borderRadius: 22,
    backgroundColor: '#F5F7F5',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 5,
  },

  replyInput: {
    flex: 1,
    fontSize: 13,
    color: '#222',
    maxHeight: 90,
    paddingVertical: 9,
  },

  sendButton: {
    width: 35,
    height: 35,
    borderRadius: 18,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
  },

  sendButtonDisabled: {
    backgroundColor: '#B8D5B8',
  },
});
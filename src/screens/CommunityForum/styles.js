import {StyleSheet} from 'react-native';
import { COLORS, Fonts } from '../../utils';
import { hp, normalize, wp } from '../../components/responsive';

export const portraitStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backColor,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 110,
  },
  headerView: {
    height: '8%',
    width: '100%',
    backgroundColor: COLORS.primary,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerTitle: {
    fontSize: normalize(25),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    color: COLORS.secondary,
  },
  headerSubtitle: {
    marginTop: 4,
    fontSize: normalize(14),
    color: COLORS.white,
    fontFamily: Fonts.FONTS.PoppinsRegular,
  },
  notificationButton: {
    width: 43,
    height: 43,
    borderRadius: 22,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  notificationDot: {
    position: 'absolute',
    top: 9,
    right: 9,
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#E53935',
  },
  searchContainer: {
    height: 48,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginVertical: 14,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: normalize(15),
    color: COLORS.white,
    fontFamily: Fonts.FONTS.PoppinsMedium,
  },
  categoryList: {
    paddingBottom: 18,
  },
  categoryChip: {
    paddingHorizontal: 17,
    height: 36,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  activeCategoryChip: {
    backgroundColor: COLORS.subPrimary,
  },

  categoryText: {
    fontSize: normalize(14),
    color: COLORS.white,
    fontFamily: Fonts.FONTS.PoppinsMedium,
  },
  activeCategoryText: {
    color: COLORS.white,
    fontFamily: Fonts.FONTS.PoppinsMedium,
  },
  statsCard: {
    backgroundColor: '#EAF6EA',
    borderRadius: 18,
    paddingVertical: 17,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 22,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: normalize(18),
    fontFamily: Fonts.FONTS.PoppinsMedium,
    color: COLORS.secondary,
  },
  statLabel: {
    marginTop: 4,
    fontSize: normalize(11),
    color: COLORS.back,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#C8DEC8',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: normalize(18),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    color: COLORS.white,
  },
  viewAllText: {
    color: COLORS.secondary,
    fontSize: normalize(14),
    fontFamily: Fonts.FONTS.PoppinsMedium,
  },
  postCard: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    padding: 10,
    marginTop: 14,
  },
  pinnedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  pinnedText: {
    marginLeft: 5,
    fontSize: normalize(12),
    fontFamily: Fonts.FONTS.PoppinsMedium,
    color: COLORS.secondary,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 43,
    height: 43,
    borderRadius: 22,
  },
  userInfo: {
    marginLeft: 11,
    flex: 1,
  },
  userName: {
    fontSize: normalize(15),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    color: COLORS.white,
  },
  postTime: {
    fontSize: normalize(12),
    color: COLORS.textColor,
    fontFamily: Fonts.FONTS.PoppinsMedium,
    marginTop: 3,
  },
  moreButton: {
    padding: 5,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.secondary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    marginTop: 14,
  },
  categoryBadgeText: {
    color: COLORS.white,
    fontSize: normalize(12),
    fontFamily: Fonts.FONTS.PoppinsMedium,
  },
  postTitle: {
    marginTop: 11,
    fontSize: normalize(16),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    color: COLORS.white,
    lineHeight: 22,
  },
  postDescription: {
    marginTop: 7,
    fontSize: normalize(14),
    color: COLORS.white,
    lineHeight: 20,
    fontFamily: Fonts.FONTS.PoppinsRegular,
  },
  separator: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 14,
  },
  actionsRow: {
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
    fontSize: normalize(14),
    color: COLORS.white,
    fontFamily: Fonts.FONTS.PoppinsMedium,
  },
  likedText: {
    color: COLORS.subPrimary,
  },
  createPostButton: {
    position: 'absolute',
    bottom: 22,
    right: 18,
    height: 52,
    paddingHorizontal: 18,
    borderRadius: 27,
    backgroundColor: COLORS.subPrimary,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 7,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  createPostText: {
    marginLeft: 7,
    color: COLORS.white,
    fontSize: normalize(15),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 70,
  },
  emptyTitle: {
    marginTop: 15,
    fontSize: 17,
    fontWeight: '700',
    color: '#444',
  },
  emptyText: {
    marginTop: 5,
    fontSize: 13,
    color: '#999',
  },
  groupImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E8E8E8',
  },
  groupImagePlaceholder: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  groupImageText: {
    fontSize: normalize(18),
    fontFamily: Fonts?.medium,
    fontWeight: '700',
    color: COLORS.primary,
  },
});

export const landscapeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAF8',
  },

  content: {
    paddingHorizontal: 16,
    paddingBottom: 110,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 15,
    paddingBottom: 18,
  },

  headerTitle: {
    fontSize: 27,
    fontWeight: '700',
    color: '#1B1B1B',
  },

  headerSubtitle: {
    marginTop: 4,
    fontSize: 13,
    color: '#777',
  },

  notificationButton: {
    width: 43,
    height: 43,
    borderRadius: 22,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  notificationDot: {
    position: 'absolute',
    top: 9,
    right: 9,
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#E53935',
  },

  searchContainer: {
    height: 48,
    backgroundColor: '#FFF',
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },

  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: '#222',
  },

  categoryList: {
    paddingBottom: 18,
  },

  categoryChip: {
    paddingHorizontal: 17,
    height: 36,
    borderRadius: 20,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E7E7E7',
  },

  activeCategoryChip: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },

  categoryText: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },

  activeCategoryText: {
    color: '#FFF',
    fontWeight: '600',
  },

  statsCard: {
    backgroundColor: '#EAF6EA',
    borderRadius: 18,
    paddingVertical: 17,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 22,
  },

  statItem: {
    alignItems: 'center',
    flex: 1,
  },

  statNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2E7D32',
  },

  statLabel: {
    marginTop: 4,
    fontSize: 11,
    color: '#6A7A6A',
  },

  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#C8DEC8',
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
  },

  viewAllText: {
    color: '#4CAF50',
    fontSize: 13,
    fontWeight: '600',
  },

  postCard: {
    backgroundColor: '#FFF',
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },

  pinnedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  pinnedText: {
    marginLeft: 5,
    fontSize: 11,
    fontWeight: '600',
    color: '#4CAF50',
  },

  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  avatar: {
    width: 43,
    height: 43,
    borderRadius: 22,
  },

  userInfo: {
    marginLeft: 11,
    flex: 1,
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

  moreButton: {
    padding: 5,
  },

  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#F0F8F0',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    marginTop: 14,
  },

  categoryBadgeText: {
    color: '#4CAF50',
    fontSize: 11,
    fontWeight: '600',
  },

  postTitle: {
    marginTop: 11,
    fontSize: 16,
    fontWeight: '700',
    color: '#222',
    lineHeight: 22,
  },

  postDescription: {
    marginTop: 7,
    fontSize: 13,
    color: '#777',
    lineHeight: 20,
  },

  separator: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 14,
  },

  actionsRow: {
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

  createPostButton: {
    position: 'absolute',
    bottom: 22,
    right: 18,
    height: 52,
    paddingHorizontal: 18,
    borderRadius: 27,
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 7,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  createPostText: {
    marginLeft: 7,
    color: '#FFF',
    fontSize: 14,
    fontWeight: '700',
  },

  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 70,
  },

  emptyTitle: {
    marginTop: 15,
    fontSize: 17,
    fontWeight: '700',
    color: '#444',
  },

  emptyText: {
    marginTop: 5,
    fontSize: 13,
    color: '#999',
  },
});
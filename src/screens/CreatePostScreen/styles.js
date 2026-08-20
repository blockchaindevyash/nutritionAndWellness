import {StyleSheet} from 'react-native';
import { COLORS, Fonts } from '../../utils';
import { hp, normalize, wp } from '../../components/responsive';

export const portraitStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backColor,
  },
  headerView: {
    height: '8%',
    width: '100%',
    backgroundColor: COLORS.primary,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
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
  headerRight: {
    width: 42,
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  introContainer: {
    backgroundColor: '#EAF6EA',
    borderRadius: 16,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  introIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  introTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  introTitle: {
    fontSize: normalize(16),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    color: COLORS.secondary,
  },
  introDescription: {
    fontSize: normalize(13),
    color: COLORS.black,
    lineHeight: 18,
    marginTop: 3,
  },
  fieldContainer: {
    marginBottom: 22,
  },
  label: {
    fontSize: normalize(16),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    color: COLORS.white,
    marginBottom: 9,
  },
  required: {
    color: '#E53935',
  },
  inputContainer: {
    height: 52,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
  },
  titleInput: {
    flex: 1,
    marginLeft: 9,
    fontSize: normalize(14),
    color: COLORS.white,
    fontFamily: Fonts.FONTS.PoppinsMedium,
  },
  characterCount: {
    fontSize: normalize(12),
    color: COLORS.textColor,
    fontFamily: Fonts.FONTS.PoppinsRegular,
    textAlign: 'right',
    marginTop: 5,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  categoryChip: {
    minHeight: 38,
    paddingHorizontal: 13,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
    marginBottom: 8,
  },
  selectedCategoryChip: {
    backgroundColor: COLORS.subPrimary,
  },
  categoryText: {
    fontSize: normalize(14),
    color: COLORS.white,
    fontFamily: Fonts.FONTS.PoppinsMedium,
  },
  selectedCategoryText: {
    color: COLORS.white,
    fontWeight: Fonts.FONTS.PoppinsMedium,
    marginLeft: 4,
  },
  descriptionContainer: {
    backgroundColor: COLORS.primary,
    borderRadius: 13,
    minHeight: 150,
  },
  descriptionInput: {
    flex: 1,
    minHeight: 150,
    padding: 14,
    fontSize: normalize(14),
    color: COLORS.white,
    lineHeight: 21,
    fontFamily: Fonts.FONTS.PoppinsMedium,
  },
  imageUpload: {
    height: 145,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#EAF6EA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadTitle: {
    fontSize: normalize(14),
    fontFamily: Fonts.FONTS.PoppinsMedium,
    color: COLORS.white,
    marginTop: 8,
  },
  uploadDescription: {
    fontSize: normalize(12),
    color: COLORS.white,
    fontFamily: Fonts.FONTS.PoppinsRegular,
    marginTop: 4,
  },
  imagePreviewContainer: {
    height: 190,
    borderRadius: 14,
    overflow: 'hidden',
    position: 'relative',
  },
  imagePreview: {
    width: '100%',
    height: '100%',
  },
  removeImageButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  guidelineContainer: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    marginBottom: 20,
  },
  guidelineText: {
    flex: 1,
    marginLeft: 8,
    fontSize: normalize(12),
    color: COLORS.white,
    fontFamily: Fonts.FONTS.PoppinsMedium,
    lineHeight: 17,
  },
  postButton: {
    paddingVertical: hp(1),
    borderRadius: 8,
    backgroundColor: COLORS.subPrimary,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    elevation: 3,
  },
  postButtonText: {
    color: '#FFF',
    fontSize: normalize(16),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    marginLeft: 8,
  },
});

export const landscapeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAF8',
  },

  header: {
    height: 62,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: '#F8FAF8',
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

  headerRight: {
    width: 42,
  },

  content: {
    padding: 16,
    paddingBottom: 40,
  },

  introContainer: {
    backgroundColor: '#EAF6EA',
    borderRadius: 16,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },

  introIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  introTextContainer: {
    flex: 1,
    marginLeft: 12,
  },

  introTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2E7D32',
  },

  introDescription: {
    fontSize: 12,
    color: '#668066',
    lineHeight: 18,
    marginTop: 3,
  },

  fieldContainer: {
    marginBottom: 22,
  },

  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
    marginBottom: 9,
  },

  required: {
    color: '#E53935',
  },

  inputContainer: {
    height: 52,
    backgroundColor: '#FFF',
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
  },

  titleInput: {
    flex: 1,
    marginLeft: 9,
    fontSize: 14,
    color: '#222',
  },

  characterCount: {
    fontSize: 10,
    color: '#999',
    textAlign: 'right',
    marginTop: 5,
  },

  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  categoryChip: {
    minHeight: 38,
    paddingHorizontal: 13,
    borderRadius: 20,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E4E4E4',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
    marginBottom: 8,
  },

  selectedCategoryChip: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },

  categoryText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },

  selectedCategoryText: {
    color: '#FFF',
    fontWeight: '600',
    marginLeft: 4,
  },

  descriptionContainer: {
    backgroundColor: '#FFF',
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    minHeight: 150,
  },

  descriptionInput: {
    flex: 1,
    minHeight: 150,
    padding: 14,
    fontSize: 14,
    color: '#222',
    lineHeight: 21,
  },

  imageUpload: {
    height: 145,
    borderRadius: 14,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DCE8DC',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },

  uploadIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#EAF6EA',
    alignItems: 'center',
    justifyContent: 'center',
  },

  uploadTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#444',
    marginTop: 8,
  },

  uploadDescription: {
    fontSize: 11,
    color: '#999',
    marginTop: 4,
  },

  imagePreviewContainer: {
    height: 190,
    borderRadius: 14,
    overflow: 'hidden',
    position: 'relative',
  },

  imagePreview: {
    width: '100%',
    height: '100%',
  },

  removeImageButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  guidelineContainer: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#EAEAEA',
  },

  guidelineText: {
    flex: 1,
    marginLeft: 8,
    fontSize: 11,
    color: '#777',
    lineHeight: 17,
  },

  postButton: {
    height: 54,
    borderRadius: 27,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    elevation: 3,
  },

  postButtonText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '700',
    marginLeft: 8,
  },
});
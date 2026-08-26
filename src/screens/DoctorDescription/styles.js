import {StyleSheet} from 'react-native';
import { COLORS, Fonts } from '../../utils';
import { hp, normalize, wp } from '../../components/responsive';

export const portraitStyles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
  },
  headerView: {
    height: '8%', 
    width: '100%', 
    backgroundColor: COLORS.primary,
  },
  mainView: {
    width: '100%',
    height: '92%',
  },
  headerContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: COLORS.white,
  },
  subtitle: {
    marginTop: 10,
    fontSize: normalize(14),
    lineHeight: 24,
    color: COLORS.greyColor,
    fontFamily: Fonts.FONTS.PoppinsRegular,
  },
  card: {
    borderRadius: 10,
    padding: 20,
    marginBottom: 25,
    backgroundColor: COLORS.primary,
  },
  cardTitle: {
    color: COLORS.secondary,
    fontSize: normalize(18),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    marginBottom: 15,
  },
  input: {
    minHeight: hp(27),
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 8,
    padding: 15,
    color: COLORS.white,
    fontSize: normalize(15),
    lineHeight: 24,
    fontFamily: Fonts.FONTS.PoppinsRegular,
  },
  limitText: {
    alignSelf: "flex-end",
    marginTop: 8,
    color: COLORS.white,
    opacity: 0.8,
    fontFamily: Fonts.FONTS.PoppinsRegular,
  },
  uploadContainer: {
    marginTop: 20,
    marginBottom: 25,
  },
  uploadTitle: {
    fontSize: 18,
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    marginBottom: 12,
    color: COLORS.secondary,
  },
  uploadOptionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  uploadOptionBox: {
    flex: 1,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: COLORS.secondary,
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
  },
  uploadIcon: {
    fontSize: normalize(28),
    marginBottom: 10,
    color: COLORS.white,
  },
  uploadText: {
    color: COLORS.white,
    fontSize: normalize(15),
    fontFamily: Fonts.FONTS.PoppinsMedium,
    textAlign: 'center',
  },
  uploadBox: {
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: COLORS.secondary,
    borderRadius: 18,
    paddingVertical: 30,
    alignItems: "center",
    backgroundColor: COLORS.primary,
  },
  uploadIcon: {
    fontSize: normalize(40),
    marginBottom: 10,
    color: COLORS.white,
  },
  uploadText: {
    color: COLORS.white,
    fontSize: normalize(15),
    fontFamily: Fonts.FONTS.PoppinsMedium,
  },
  previewCard: {
    marginTop: 15,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 12,
  },
  fileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  fileName: {
    fontWeight: "700",
    color: "#111",
  },
  fileType: {
    color: "#777",
    marginTop: 2,
    fontSize: 12,
  },
  removeText: {
    color: "red",
    fontWeight: "600",
  },
  previewImage: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginTop: 5,
  },
  pdfBox: {
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    marginTop: 10,
  },
  pdfText: {
    fontWeight: "600",
    color: "#444",
  },
  suggestionContainer: {
    marginBottom: 30,
  },
  suggestionTitle: {
    fontSize: normalize(18),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    marginBottom: 15,
    color: COLORS.secondary,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tag: {
    backgroundColor: "#fff",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 10,
    marginBottom: 10,
    elevation: 2,
  },
  tagText: {
    color: COLORS.black,
    fontFamily: Fonts.FONTS.PoppinsMedium,
    fontSize: normalize(15),
  },
  footer: {
    padding: 10,
    backgroundColor: COLORS.backColor,
  },
  button: {
    backgroundColor: "#fc6127",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: '#fff',
    fontSize: normalize(17),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
  },
  selectedTag: {
    backgroundColor: COLORS.secondary,
  },
  selectedTagText: {
    color: "#fff",
  },
})

export const landscapeStyles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f5f5f5",
    flexGrow: 1,
  },
  headerView: {
    height: '8%', 
    width: '100%', 
    backgroundColor: COLORS.primary,
  },
  mainView: {
    width: '100%',
  },
  headerContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#111",
  },
  subtitle: {
    marginTop: 10,
    fontSize: 15,
    lineHeight: 24,
    color: "#666",
  },
  card: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 25,
  },
  cardTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 15,
  },
  input: {
    minHeight: 220,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 15,
    padding: 15,
    color: COLORS.white,
    fontSize: 15,
    lineHeight: 24,
  },
  limitText: {
    alignSelf: "flex-end",
    marginTop: 8,
    color: COLORS.white,
    opacity: 0.8,
  },
  uploadContainer: {
    marginBottom: 25,
  },
  uploadTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
    color: "#111",
  },
  uploadBox: {
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#fc6127",
    borderRadius: 18,
    paddingVertical: 30,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  uploadIcon: {
    fontSize: 45,
    marginBottom: 10,
  },
  uploadText: {
    color: "#666",
    fontSize: 15,
  },
  previewCard: {
    marginTop: 15,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 12,
  },
  fileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  fileName: {
    fontWeight: "700",
    color: "#111",
  },
  fileType: {
    color: "#777",
    marginTop: 2,
    fontSize: 12,
  },
  removeText: {
    color: "red",
    fontWeight: "600",
  },
  previewImage: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginTop: 5,
  },
  pdfBox: {
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    marginTop: 10,
  },
  pdfText: {
    fontWeight: "600",
    color: "#444",
  },
  suggestionContainer: {
    marginBottom: 30,
  },
  suggestionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 15,
    color: "#111",
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tag: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 30,
    marginRight: 10,
    marginBottom: 10,
    elevation: 2,
  },
  tagText: {
    color: "#fc6127",
    fontWeight: "600",
  },
  footer: {
    padding: 20,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#fc6127",
    paddingVertical: 16,
    borderRadius: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  selectedTag: {
    backgroundColor: "#fc6127",
  },
  selectedTagText: {
    color: "#fff",
  },
})
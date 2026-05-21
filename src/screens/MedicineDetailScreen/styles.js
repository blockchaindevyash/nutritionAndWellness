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
  formCard: {
    borderRadius: 8,
    padding: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    color: COLORS.white,
    marginBottom: 5,
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    fontSize: normalize(15),
  },
  input: {
    fontFamily: Fonts.FONTS.PoppinsMedium,
    color: COLORS.white,
    fontSize: normalize(15),
    borderWidth: 0.3,
    borderColor: COLORS.greyColor,
    marginTop: hp(0.5),
    borderRadius: 5,
    justifyContent: 'center',
    paddingHorizontal: wp(2),
    paddingVertical: 5,
    backgroundColor: COLORS.primary,
    height: hp(5)
  },
  notesInput: {
    height: 100,
  },
  addButton: {
    backgroundColor: COLORS.white,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  addButtonText: {
    color: "#fc6127",
    fontWeight: "700",
    fontSize: 16,
  },
  listContainer: {
    // paddingHorizontal: 20,
    marginTop: 25,
    marginBottom: hp(5),
  },
  listTitle: {
    fontSize: normalize(20),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    marginBottom: hp(1.5),
    color: COLORS.white,
  },
  medicineCard: {
    backgroundColor: COLORS.white,
    borderRadius: 5,
    padding: 15,
    marginBottom: 15,
    flexDirection: "row",
    elevation: 2,
  },
  medicineName: {
    fontSize: normalize(17),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    color: "#111",
    marginBottom: 8,
  },
  detailText: {
    color: COLORS.greyColor,
    marginBottom: 4,
    fontSize: normalize(15),
    fontFamily: Fonts.FONTS.PoppinsMedium,
  },
  removeText: {
    color: "red",
    fontSize: normalize(16),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
  },
  footer: {
    padding: 20,
    backgroundColor: COLORS.backColor,
  },
  button: {
    backgroundColor: COLORS.subPrimary,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: normalize(18),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
  },
});

export const landscapeStyles = StyleSheet.create({
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
  formCard: {
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    color: "#fff",
    marginBottom: 8,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.18)",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 14,
    color: "#fff",
    fontSize: 15,
  },
  notesInput: {
    height: 100,
  },
  addButton: {
    backgroundColor: "#fff",
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 10,
  },
  addButtonText: {
    color: "#fc6127",
    fontWeight: "700",
    fontSize: 16,
  },
  listContainer: {
    paddingHorizontal: 20,
    marginTop: 25,
    marginBottom: 100,
  },
  listTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 15,
    color: "#111",
  },
  medicineCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 15,
    marginBottom: 15,
    flexDirection: "row",
    elevation: 2,
  },
  medicineName: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111",
    marginBottom: 8,
  },
  detailText: {
    color: "#666",
    marginBottom: 4,
  },
  removeText: {
    color: "red",
    fontWeight: "600",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: "#fff",
  },
  continueButton: {
    backgroundColor: "#fc6127",
    paddingVertical: 16,
    borderRadius: 15,
    alignItems: "center",
  },
  continueText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
})
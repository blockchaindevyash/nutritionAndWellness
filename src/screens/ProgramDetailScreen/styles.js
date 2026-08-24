import { Dimensions, StyleSheet } from 'react-native';
import { hp, wp, normalize } from '../../components/responsive';
import { COLORS, Fonts } from '../../utils/index';

export const portraitStyles = StyleSheet.create({
  safeAreaStyle: {
    flex: 1,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.backColor,
  },
  headerView: {
    height: '8%', 
    width: '100%', 
    backgroundColor: COLORS.primary,
  },
  mainView: {
    height: '92%',
    width: '92%',
    alignSelf: 'center',
  },
  subtitle: {
    marginVertical: 10,
    color: COLORS.secondary,
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    fontSize: normalize(18),
  },
  card: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  doneCard: {
    backgroundColor: "#d4edda",
  },
  exerciseText: {
    fontSize: normalize(16),
    fontFamily: Fonts.FONTS.PoppinsMedium,
    color: COLORS.white,
    width: '80%'
  },
  doneText: {
    textDecorationLine: "line-through",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  skipBtn: {
    padding: 12,
    backgroundColor: "#ddd",
    borderRadius: 10,
  },
  completeBtn: {
    padding: 12,
    backgroundColor: COLORS.subPrimary,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center'
  },
  buttonText: {
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    color: '#fff',
    fontSize: normalize(16),
  },
exerciseContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
},
checkbox: {
    fontSize: 22,
},
timerButton: {
    minWidth: 70,
    height: 38,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: COLORS.subPrimary,
    alignItems: 'center',
    justifyContent: 'center',
},
timerButtonText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '700',
},
timerContainer: {
    marginTop: 14,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    alignItems: 'center',
},
timerText: {
    fontSize: normalize(28),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    color: COLORS.secondary,
},
completedContainer: {
    marginTop: 10,
},
completedText: {
    fontSize: normalize(14),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    color: COLORS.subPrimary,
},
})

export const landscapeStyles = StyleSheet.create({
  safeAreaStyle: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
})
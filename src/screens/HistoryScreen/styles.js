// import {Dimensions, Platform, StyleSheet} from 'react-native';
// import {wp, hp} from '../../components/responsive';
// import {COLORS, Fonts} from '../../utils/index';

// const { width, height } = Dimensions.get('window');

// export const portraitStyles = StyleSheet.create({
//   safeAreaStyle: {
//     flex: 1,
//     height: '100%',
//     width: '100%',
//   },
//   headerView: {
//     paddingTop: hp(2),
//     borderBottomWidth: 0.5, 
//     borderBottomColor: COLORS.greyColor, 
//     backgroundColor: COLORS.primary, 
//     flexDirection: 'row', 
//     justifyContent: 'space-between', 
//     alignItems: 'center',
//     height: '8%',
//   },
//   callLogText: {
//     fontSize: hp(2.2),
//     fontFamily: Fonts.FONTS.PoppinsSemiBold,
//     marginLeft: wp(3),
//     color: COLORS.white,
//     marginBottom: hp(2)
//   },
//   settingIcon: {
//     width: wp(5.5),
//     height: hp(3),
//     resizeMode: 'contain',
//     tintColor: COLORS.white,
//     marginBottom: hp(2),
//     marginRight: wp(3),
//   },
//   searchView: {
//     width: '94%',
//     paddingHorizontal: wp(3),
//     paddingVertical: Platform.OS == 'ios' ? hp(1) : hp(0.5),
//     borderWidth: 1,
//     borderColor: COLORS.greyColor,
//     fontFamily: Fonts.FONTS.PoppinsMedium,
//     fontSize: hp(2),
//     color: COLORS.black,
//     borderRadius: 5,
//     alignSelf: 'center',
//     marginVertical: hp(2),
//   },
//   alertText: {
//     fontSize: hp(2.2),
//     fontFamily: Fonts.FONTS.PoppinsMedium,
//     color: COLORS.white,
//     textAlign: 'center',
//     lineHeight: hp(3),
//   },
//   alertMainView: {
//     height: '90%',
//     alignItems: 'center', 
//     justifyContent: 'center',
//     paddingHorizontal: wp(3),
//     backgroundColor: COLORS.backColor,
//   },
//   linkButton: {
//     width: '30%',
//     height: hp(5),
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: COLORS.subPrimary,
//     borderRadius: 5,
//     marginTop: hp(3),
//   },
//   linkText: {
//     fontSize: hp(2),
//     fontFamily: Fonts.FONTS.PoppinsSemiBold,
//     color: COLORS.white,
//   },
//   chatDataView: {
//     width: '100%',
//     height: height * 0.09,
//     flexDirection: 'row',
//     paddingHorizontal: wp(2),
//     justifyContent: 'space-between',
//     borderBottomWidth: 0.5,
//     paddingVertical: hp(1),
//   },
//   chatSubView: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     width: '100%',
//   },
//   chatNameView: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '100%',
//     alignItems: 'center',
//   },
//   nameText: {
//     fontSize: hp(2),
//     fontFamily: Fonts.FONTS.PoppinsSemiBold,
//     color: COLORS.primary,
//     width: '70%',
//   },
//   lastMessageText: {
//     fontSize: hp(1.7),
//     fontFamily: Fonts.FONTS.PoppinsMedium,
//     color: COLORS.greyColor,
//   },
//   ListEmptyView: {
//     width: '100%',
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: hp(15),
//   },
//   emptyText: {
//     fontSize: hp(2.5),
//     fontFamily: Fonts.FONTS.PoppinsMedium,
//     color: COLORS.white,
//   },
//   floatingButton: {
//     position: 'absolute',
//     bottom: hp(6),
//     right: wp(4),
//     width: wp(16),
//     height: wp(16),
//     borderRadius: wp(8),
//     backgroundColor: COLORS.subPrimary,
//     alignItems: 'center',
//     justifyContent: 'center',
//     shadowColor: COLORS.black,
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   searchIcon1: {
//     width: wp(5.5),
//     height: hp(4),
//     resizeMode: 'contain',
//   },
// });

// export const landscapeStyles = StyleSheet.create({
//   safeAreaStyle: {
//     flex: 1,
//     height: '100%',
//     width: '100%',
//   },
//   headerView: {
//     paddingTop: hp(2), 
//     borderBottomWidth: 0.5, 
//     borderBottomColor: COLORS.greyColor, 
//     backgroundColor: COLORS.primary, 
//     flexDirection: 'row', 
//     justifyContent: 'space-between', 
//     alignItems: 'center'
//   },
//   callLogText: {
//     fontSize: hp(2.2),
//     fontFamily: Fonts.FONTS.PoppinsSemiBold,
//     marginLeft: wp(3),
//     color: COLORS.white,
//     marginBottom: hp(2)
//   },
//   settingIcon: {
//     width: wp(5.5),
//     height: hp(3),
//     resizeMode: 'contain',
//     tintColor: COLORS.white,
//     marginBottom: hp(2),
//     marginRight: wp(3),
//   },
//   searchView: {
//     width: '50%',
//     paddingHorizontal: wp(2),
//     paddingVertical: wp(0.7),
//     borderWidth: 1,
//     borderColor: COLORS.greyColor,
//     fontFamily: Fonts.FONTS.PoppinsRegular,
//     fontSize: wp(1.7),
//     color: COLORS.black,
//     borderRadius: 5,
//     alignSelf: 'center',
//     marginVertical: hp(2),
//   },
//   textinputMainView: {
//     flexDirection: 'row',
//     top: 0,
//     width: '100%',
//     height: 50,
//     backgroundColor: 'red'
//   },
//   alertText: {
//     fontSize: hp(2.2),
//     fontFamily: Fonts.FONTS.PoppinsMedium,
//     color: COLORS.black,
//     textAlign: 'center',
//     lineHeight: hp(3),
//   },
//   alertMainView: {
//     height: '88%', 
//     alignItems: 'center', 
//     justifyContent: 'center',
//     paddingHorizontal: wp(3),
//   },
//   linkButton: {
//     width: '30%',
//     height: hp(5),
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: COLORS.primary,
//     borderRadius: 5,
//     marginTop: hp(3),
//   },
//   linkText: {
//     fontSize: hp(2),
//     fontFamily: Fonts.FONTS.PoppinsSemiBold,
//     color: COLORS.white,
//   },
//   chatDataView: {
//     width: '100%',
//     height: height * 0.09,
//     flexDirection: 'row',
//     paddingHorizontal: wp(2),
//     justifyContent: 'space-between',
//     borderBottomWidth: 0.5,
//     paddingVertical: hp(1),
//   },
//   chatSubView: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     width: '100%',
//   },
//   chatNameView: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '100%',
//     alignItems: 'center',
//   },
//   nameText: {
//     fontSize: hp(2),
//     fontFamily: Fonts.FONTS.PoppinsSemiBold,
//     color: COLORS.primary,
//     width: '70%',
//   },
//   lastMessageText: {
//     fontSize: hp(1.7),
//     fontFamily: Fonts.FONTS.PoppinsMedium,
//     color: COLORS.greyColor,
//   },
//   ListEmptyView: {
//     width: '100%',
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: hp(15),
//   },
//   emptyText: {
//     fontSize: hp(2.5),
//     fontFamily: Fonts.FONTS.PoppinsMedium,
//     color: COLORS.black,
//   },
//   floatingButton: {
//     position: 'absolute',
//     bottom: hp(4),
//     right: hp(4),
//     width: hp(8),
//     height: hp(8),
//     borderRadius: hp(8),
//     backgroundColor: COLORS.primary,
//     alignItems: 'center',
//     justifyContent: 'center',
//     shadowColor: COLORS.black,
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   searchIcon1: {
//     width: wp(5.5),
//     height: hp(4),
//     resizeMode: 'contain',
//   },
// });


import {StyleSheet} from 'react-native';
import { hp, wp, normalize } from '../../components/responsive';
import { COLORS, Fonts } from '../../utils/index';

export const portraitStyles = StyleSheet.create({
  safeAreaStyle: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  callLogText: {
    fontSize: normalize(20),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    marginLeft: wp(3),
    color: COLORS.white,
  },
  headerView: {
    height: '8%', 
    width: '100%', 
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  mainView: {
    height: '90%',
    marginTop: hp(1)
  },
  itemsDataView: {
    width: '100%',
    paddingHorizontal: wp(3),
  },
  queDataMainView: {
    maxWidth: '85%',
    alignSelf: 'flex-end',
    paddingTop: hp(6),
  },
  queDataView: {
    padding: wp(3),
    backgroundColor: COLORS.primary,
    borderRadius: hp(2),
  },
  queText: {
    color: COLORS.white,
    fontFamily: Fonts.FONTS.PoppinsMedium,
    fontSize: normalize(22),
  },
  ansText: {
    color: COLORS.black,
    fontFamily: Fonts.FONTS.PoppinsMedium,
    fontSize: normalize(22),
    paddingVertical: hp(1),
    lineHeight: hp(3.8),
  },
  ansTitleText: {
    color: COLORS.black,
    fontFamily: Fonts.FONTS.PoppinsMedium,
    fontSize: normalize(22),
    marginTop: hp(2),
  },
  ansDateText: {
    color: COLORS.greyColor,
    fontFamily: Fonts.FONTS.PoppinsMedium,
    fontSize: normalize(20),
  },
  emptyTextView: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: normalize(20),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    color: COLORS.white,
  },
  bottomView: {
    maxHeight: hp(40),
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    position: 'absolute',
    bottom: hp(1),
    backgroundColor: COLORS.primary,
    paddingVertical: hp(2)
  },
  chatInputView1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  chatInputView: {
    padding: wp(2),
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'space-between',
    width: '92%',
    borderRadius: hp(3),
    borderWidth: 0.5,
    borderColor: COLORS.greyColor,
  },
  roundButtonView: {
    width: wp(9),
    height: wp(9),
    borderRadius: wp(9),
    alignItems: 'center',
    justifyContent: 'center',
  },
  roundButtonView1: {
    width: wp(9),
    height: wp(9),
    borderRadius: wp(9),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.subPrimary
  },
  textInput: {
    fontSize: normalize(17),
    fontFamily: Fonts.FONTS.PoppinsRegular,
    color: COLORS.black,
    width: '68%',
    paddingVertical: hp(0.5)
  },
  closeIcon: {
    width: wp(5),
    height: hp(3),
    resizeMode: 'contain',
    tintColor: COLORS.white,
  },
});

export const landscapeStyles = StyleSheet.create({
  safeAreaStyle: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  headerView: {
    height: '8%', 
    width: '100%', 
    backgroundColor: COLORS.primary,
  },
  container: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  mainView: {
    height: '90%',
    marginTop: hp(1)
  },
  itemsDataView: {
    width: '100%',
    paddingHorizontal: wp(3),
  },
  queDataMainView: {
    maxWidth: '85%',
    alignSelf: 'flex-end',
    paddingTop: hp(6),
  },
  queDataView: {
    padding: wp(3),
    backgroundColor: COLORS.primary,
    borderRadius: hp(2),
  },
  queText: {
    color: COLORS.white,
    fontFamily: Fonts.FONTS.PoppinsMedium,
    fontSize: hp(2.2),
  },
  ansText: {
    color: COLORS.black,
    fontFamily: Fonts.FONTS.PoppinsMedium,
    fontSize: hp(2.2),
    paddingVertical: hp(1),
    lineHeight: hp(3.8),
  },
  ansTitleText: {
    color: COLORS.black,
    fontFamily: Fonts.FONTS.PoppinsMedium,
    fontSize: hp(2.4),
    marginTop: hp(2),
  },
  ansDateText: {
    color: COLORS.greyColor,
    fontFamily: Fonts.FONTS.PoppinsMedium,
    fontSize: hp(2.1),
  },
  emptyTextView: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: hp(2.6),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    color: COLORS.black,
  },
  bottomView: {
    maxHeight: hp(40),
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: COLORS.white,
    paddingVertical: hp(2)
  },
  chatInputView1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  chatInputView: {
    padding: wp(2),
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'space-between',
    width: '92%',
    borderRadius: hp(3),
    borderWidth: 0.5,
    borderColor: COLORS.greyColor,
  },
  roundButtonView: {
    width: wp(9),
    height: wp(9),
    borderRadius: wp(9),
    alignItems: 'center',
    justifyContent: 'center',
  },
  roundButtonView1: {
    width: wp(9),
    height: wp(9),
    borderRadius: wp(9),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary
  },
  textInput: {
    fontSize: hp(2),
    fontFamily: Fonts.FONTS.PoppinsRegular,
    color: COLORS.black,
    width: '68%',
    paddingVertical: hp(0.5)
  },
  closeIcon: {
    width: wp(5),
    height: hp(3),
    resizeMode: 'contain',
  },
});
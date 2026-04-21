import {
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    Image,
    StyleSheet,
    Alert,
    Platform,
} from 'react-native';
import {wp, hp, normalize} from './responsive';
import { COLORS, Fonts } from '../utils';
import useOrientation from './OrientationComponent';
import backArrow from '../images/backArrow.png';

const Header = ({title, onPress}) => {
    const orientation = useOrientation(); // Get current orientation
    const isPortrait = orientation === 'portrait';
    const styles = isPortrait ? portraitStyles : landscapeStyles;

    return (
        <SafeAreaView style={[styles.safeAreaStyle]}>
            <View style={styles.container}>
                <TouchableOpacity onPress={onPress}>
                    <Image style={styles.backIcon} source={backArrow} />
                </TouchableOpacity>
                <Text style={[styles.titleHeader, { color: COLORS.white }]}>
                    {title}
                </Text>
            </View>
        </SafeAreaView>
    );
};

export default Header;

const portraitStyles = StyleSheet.create({
    safeAreaStyle: {
        flex: 1,
        justifyContent: 'center',
        marginLeft: wp(3),
    },
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
    },
    moreIcon: {
        width: wp(6),
        height: hp(5),
        resizeMode: 'contain',
    },
    titleHeader: {
        fontSize: hp(2.5),
        fontFamily: Fonts.FONTS.PoppinsSemiBold,
        marginLeft: wp(5),
    },
    bellIcon: {
        width: wp(5),
        height: hp(4),
        resizeMode: 'contain',
    },
    titleView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    backIcon: {
        width: wp(6),
        height: hp(4),
        resizeMode: 'contain',
        tintColor: COLORS.white,
    },
    bellButtonView: {
        width: wp(13),
        alignItems: 'center',
        justifyContent: 'center',
        height: hp(5),
    },
});

const landscapeStyles = StyleSheet.create({
    safeAreaStyle: {
        flex: 1,
        justifyContent: 'center',
    },
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        padding: hp(1),
        justifyContent: 'space-between',
        width: '100%',
    },
    moreIcon: {
        width: wp(5),
        height: hp(4),
        resizeMode: 'contain',
    },
    titleHeader: {
        fontSize: wp(2.3),
        fontFamily: Fonts.FONTS.PoppinsSemiBold,
        marginLeft: hp(2),
    },
    bellIcon: {
        width: wp(4),
        height: hp(2.5),
        resizeMode: 'contain',
    },
    titleView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    backIcon: {
        width: wp(10),
    },
    bellButtonView: {
        width: wp(8),
        alignItems: 'center',
        justifyContent: 'center',
        height: hp(5),
    },
});

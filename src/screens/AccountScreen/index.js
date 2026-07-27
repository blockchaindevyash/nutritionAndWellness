import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image,
    ScrollView,
    ActivityIndicator,
    Platform,
    PermissionsAndroid,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { portraitStyles, landscapeStyles } from './styles';
import useOrientation from '../../components/OrientationComponent';
import { COLORS } from '../../utils';
import pencil from '../../images/pencil.png';
import user from '../../images/user.png';
import rightArrow from '../../images/rightArrow.png';
import { hp, wp } from '../../components/responsive';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useAuthStore from '../../store/authStore';
import moment from 'moment';

const AccountScreen = ({ navigation }) => {
    const {profileData} = useAuthStore();
    const orientation = useOrientation(); // Get current orientation
    const isPortrait = orientation === 'portrait';
    const insets = useSafeAreaInsets();
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [email, setEmail] = useState('');
    const [nameError, setNameError] = useState(false);
    const [numberError, setNumberError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const styles = isPortrait ? portraitStyles : landscapeStyles;

    const calculateAge = (dob) => {
        return moment().diff(
            moment(dob, "DD/MM/YYYY"),
            "years"
        );
    };

    return (
        <View style={styles.safeAreaStyle}>
            <View
                style={{
                    width: '100%',
                    paddingTop: insets.top,
                    backgroundColor: COLORS.primary,
                }}
            />
            <ScrollView contentContainerStyle={{paddingBottom: hp(5)}}>
            <View style={styles.editTextInputView}>
                <View style={styles.optionView1}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image style={{width: wp(10), height: hp(6), resizeMode: 'contain', tintColor: COLORS.white}} source={user} />
                    <View style={{marginLeft: wp(3)}}>
                        <Text style={styles.detailText}>{profileData?.name}</Text>
                        <Text style={[styles.detailText1, {color: COLORS.greyColor}]}>Edit Profile</Text>
                    </View>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('EditScreen')}>
                        <Image style={[styles.editImage, {tintColor: COLORS.secondary}]} source={pencil} />
                    </TouchableOpacity>
                </View>
                <View style={styles.detailView}>
                    <View style={styles.optionView}>
                        <Text style={[styles.detailText,{color: COLORS.secondary}]}>Age</Text>
                        <Text style={styles.detailText1}>{calculateAge(profileData?.dob)}</Text>
                    </View>
                    <View style={styles.optionView}>
                        <Text style={[styles.detailText,{color: COLORS.secondary}]}>Height</Text>
                        <Text style={styles.detailText1}>{profileData?.height} cm</Text>
                    </View>
                    <View style={styles.optionView}>
                        <Text style={[styles.detailText,{color: COLORS.secondary}]}>Weight</Text>
                        <Text style={styles.detailText1}>{profileData?.weight}</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.optionView} onPress={() => navigation.navigate('DietPreferenceScreen', {item: profileData})}>
                    <Text style={styles.detailText}>Diet</Text>
                    <Image style={styles.editImage} source={rightArrow} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionView} onPress={() => navigation.navigate('GoalSelection', {item: profileData})}>
                    <Text style={styles.detailText}>Goals</Text>
                    <Image style={styles.editImage} source={rightArrow} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionView} onPress={() => navigation.navigate('ActivityLevelScreen', {item: profileData})}>
                    <Text style={styles.detailText}>Activity Level</Text>
                    <Image style={styles.editImage} source={rightArrow} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionView} onPress={() => navigation.navigate('MedicalScreen', {item: profileData})}>
                    <Text style={styles.detailText}>Medical Conditions</Text>
                    <Image style={styles.editImage} source={rightArrow} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionView} onPress={() => navigation.navigate('DoctorDescription', {item: profileData})}>
                    <Text style={styles.detailText}>Doctor Description</Text>
                    <Image style={styles.editImage} source={rightArrow} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionView} onPress={() => navigation.navigate('ChangePassword')}>
                    <Text style={styles.detailText}>Change Password</Text>
                    <Image style={styles.editImage} source={rightArrow} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionView} onPress={() => navigation.navigate('AdviserScreen')}>
                    <Text style={styles.detailText}>Wellness Adviser</Text>
                    <Image style={styles.editImage} source={rightArrow} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionView} onPress={() => navigation.navigate('NotificationScreen')}>
                    <Text style={styles.detailText}>Notifications</Text>
                    <Image style={styles.editImage} source={rightArrow} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionView}>
                    <Text style={styles.detailText}>Term & Conditions</Text>
                    <Image style={styles.editImage} source={rightArrow} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionView}>
                    <Text style={styles.detailText}>Privacy Policy</Text>
                    <Image style={styles.editImage} source={rightArrow} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate('LoginScreen')}>
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
        </View>
    );
};

export default AccountScreen;
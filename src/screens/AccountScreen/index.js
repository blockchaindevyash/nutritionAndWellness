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

const AccountScreen = ({ navigation }) => {
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

    return (
        <View style={styles.safeAreaStyle}>
            <View
                style={{
                    width: '100%',
                    paddingTop: insets.top,
                    backgroundColor: COLORS.primary,
                }}
            />
            <View style={styles.editTextInputView}>
                {/* <View style={styles.textInputView}>
                    <Text style={styles.titleText}>Name</Text>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                        <TextInput
                            value={name}
                            onChangeText={text => {
                                setName(text);
                            }}
                            placeholder="Enter Name"
                            placeholderTextColor={COLORS.greyColor}
                            style={[styles.textInput, { color: COLORS.greyColor }]}
                            keyboardType={'email-address'}
                            textContentType={'none'}
                            autoCapitalize={'none'}
                        />
                        <TouchableOpacity>
                            <Image style={styles.editImage} source={pencil} />
                        </TouchableOpacity>
                    </View>
                </View> */}
                <View style={styles.optionView1}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image style={{width: wp(10), height: hp(6), resizeMode: 'contain', tintColor: COLORS.white}} source={user} />
                    <View style={{marginLeft: wp(3)}}>
                        <Text style={styles.detailText}>John Doe</Text>
                        <Text style={styles.detailText1}>Edit Profile</Text>
                    </View>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('EditScreen')}>
                        <Image style={styles.editImage} source={pencil} />
                    </TouchableOpacity>
                </View>
                <View style={styles.detailView}>
                    <View style={styles.optionView}>
                        <Text style={styles.detailText}>Age</Text>
                        <Text style={styles.detailText1}>25</Text>
                    </View>
                    <View style={styles.optionView}>
                        <Text style={styles.detailText}>Height</Text>
                        <Text style={styles.detailText1}>170 cm</Text>
                    </View>
                    <View style={styles.optionView}>
                        <Text style={styles.detailText}>Weight</Text>
                        <Text style={styles.detailText1}>60 kg</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.optionView} onPress={() => navigation.navigate('DietPreferenceScreen')}>
                    <Text style={styles.detailText}>Diet</Text>
                    <Image style={styles.editImage} source={rightArrow} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionView} onPress={() => navigation.navigate('GoalSelection')}>
                    <Text style={styles.detailText}>Goals</Text>
                    <Image style={styles.editImage} source={rightArrow} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionView} onPress={() => navigation.navigate('ChangePassword')}>
                    <Text style={styles.detailText}>Change Password</Text>
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
        </View>
    );
};

export default AccountScreen;
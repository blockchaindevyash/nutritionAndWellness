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
    Modal,
    TouchableWithoutFeedback,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { portraitStyles, landscapeStyles } from './styles';
import useOrientation from '../../components/OrientationComponent';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { COLORS, Fonts } from '../../utils/index';
import Header from '../../components/HeaderComponent';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { hp, wp } from '../../components/responsive';
import SelectDropdown from 'react-native-select-dropdown';
import down from '../../images/down.png';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const genderArray = [
    { id: 1, value: 'Male' },
    { id: 2, value: 'Female' },
];

const BasicInfoScreen = ({ navigation }) => {
    const orientation = useOrientation(); // Get current orientation
    const isPortrait = orientation === 'portrait';
    const insets = useSafeAreaInsets();
    const [dob, setDob] = useState(null);
    const [dobError, setDobError] = useState(false);
    const [gender, setGender] = useState('');
    const [genderError, setGenderError] = useState(false);
    const [height, setHeight] = useState('');
    const [heightError, setHeightError] = useState(false);
    const [weight, setWeight] = useState('');
    const [weightError, setWeightError] = useState(false);
    const [apiError, setApiError] = useState(false);
    const [apiErrorMessage, setApiErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [dateModalVisible, setDateModalVisible] = useState(false);
    const styles = isPortrait ? portraitStyles : landscapeStyles;

    return (
        <KeyboardAwareScrollView contentContainerStyle={styles.safeAreaStyle}>
            <View
                style={{
                    width: '100%',
                    paddingTop: insets.top,
                    backgroundColor: COLORS.primary,
                }}
            />
            <View style={[styles.container, { backgroundColor: COLORS.backColor }]}>
                <View style={styles.headerView}>
                    <Header title={'Basic Information'} onPress={() => navigation.goBack()} />
                </View>
                <View style={styles.mainView}>
                    <Text style={styles.titleText}>Date of Birth</Text>
                    <Text
                        style={[
                            styles.textInput,
                            { width: '100%', paddingVertical: hp(0.5) },
                        ]}
                        onPress={() => setDateModalVisible(!dateModalVisible)}>
                        {dob != null ? moment(dob).format('DD/MM/YYYY') : 'DD/MM/YYYY'}
                    </Text>
                    {Platform.OS == 'android' ? (
                        dateModalVisible && (
                            <DateTimePicker
                                value={dob != null ? dob : new Date()}
                                mode="date"
                                display="spinner"
                                onChange={(event, selectedDate) => {
                                    if (selectedDate) {
                                        setDob(selectedDate);
                                    }
                                    setDateModalVisible(false);
                                }}
                            />
                        )
                    ) : (
                        <Modal
                            animationType="fade"
                            transparent={true}
                            visible={dateModalVisible}
                            onRequestClose={() => setDateModalVisible(false)}>
                            <View style={styles.maneModalView}>
                                <TouchableWithoutFeedback
                                    onPress={() => {
                                        setDateModalVisible(false);
                                    }}>
                                    <View style={styles.modalOverlay} />
                                </TouchableWithoutFeedback>
                                <View style={styles.container1}>
                                    <DateTimePicker
                                        value={dob != null ? dob : new Date()}
                                        mode="date"
                                        display="spinner"
                                        onChange={(event, selectedDate) => {
                                            if (selectedDate) {
                                                setDob(selectedDate);
                                            }
                                        }}
                                    />
                                </View>
                            </View>
                        </Modal>
                    )}
                    {dobError && (
                        <Text style={styles.errorText}>
                            {'Date of birth is required.'}
                        </Text>
                    )}
                    <Text style={styles.titleText}>Gender</Text>
                    {/* <TextInput
                        value={gender}
                        onChangeText={text => {
                            setGender(text);
                            setGenderError(false);
                            setApiError(false);
                        }}
                        placeholder="Enter Gender"
                        placeholderTextColor={COLORS.greyColor}
                        style={[styles.textInput, { color: COLORS.greyColor }]}
                    /> */}
                    <SelectDropdown
                        data={genderArray}
                        dropdownOverlayColor='transparent'
                        onSelect={(selectedItem, index) => {
                            setGender(selectedItem?.value);
                            console.log('gert Value:::', selectedItem?.value);
                        }}
                        renderButton={(selectedItem, isOpen) => {
                            console.log('Get Response>>>', selectedItem?.value);
                            return (
                                <View style={[styles.dropdown2BtnStyle2, {marginTop: hp(0.5)}]}>
                                    {gender != '' ? (
                                        <Text style={styles.dropdownItemTxtStyle}>
                                            {gender == selectedItem?.value
                                                ? selectedItem?.value
                                                : gender}
                                        </Text>
                                    ) : (
                                        <Text style={styles.dropdownItemTxtStyle}>
                                            {selectedItem?.value || 'Select Gender'}
                                        </Text>
                                    )}
                                    <View style={{ width: wp(7) }}>
                                        <Image style={styles.filterImage} source={down} />
                                    </View>
                                </View>
                            );
                        }}
                        showsVerticalScrollIndicator={false}
                        renderItem={(item, index, isSelected) => {
                            return (
                                <TouchableOpacity style={styles.dropdownView}>
                                    <Text style={styles.dropdownItemTxtStyle}>
                                        {item?.value}
                                    </Text>
                                </TouchableOpacity>
                            );
                        }}
                        dropdownIconPosition={'left'}
                        dropdownStyle={styles.dropdown2DropdownStyle}
                    />
                    {genderError && (
                        <Text style={styles.errorText}>
                            {'Gender is required.'}
                        </Text>
                    )}
                    <Text style={styles.titleText}>Height</Text>
                    <TextInput
                        value={height}
                        onChangeText={text => {
                            setHeight(text);
                            setHeightError(false);
                            setApiError(false);
                        }}
                        placeholder="Enter Height"
                        placeholderTextColor={COLORS.greyColor}
                        style={[styles.textInput, { color: COLORS.greyColor }]}
                    />
                    {heightError && (
                        <Text style={styles.errorText}>
                            {'Height is required.'}
                        </Text>
                    )}
                    <Text style={styles.titleText}>Weight</Text>
                    <TextInput
                        value={weight}
                        onChangeText={text => {
                            setWeight(text);
                            setWeightError(false);
                            setApiError(false);
                        }}
                        placeholder="Enter Weight"
                        placeholderTextColor={COLORS.greyColor}
                        style={[styles.textInput, { color: COLORS.greyColor }]}
                    />
                    {weightError && (
                        <Text style={styles.errorText}>
                            {'Weight is required.'}
                        </Text>
                    )}
                    {apiError && (
                        <Text style={styles.errorText}>
                            {apiErrorMessage}
                        </Text>
                    )}
                    <TouchableOpacity
                        style={[styles.buttonView, { opacity: isLoading ? 0.75 : 1 }]}
                        disabled={isLoading}
                        onPress={() => navigation.navigate('GoalSelection')}>
                        {isLoading ? (
                            <ActivityIndicator size={'large'} color={COLORS.white} />
                        ) : (
                            <Text style={styles.signinText}>Next</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAwareScrollView>
    );
};

export default BasicInfoScreen;
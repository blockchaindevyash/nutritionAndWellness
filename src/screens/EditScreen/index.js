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
import { COLORS } from '../../utils';
import pencil from '../../images/pencil.png';
import user from '../../images/user.png';
import rightArrow from '../../images/rightArrow.png';
import { hp, wp } from '../../components/responsive';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import SelectDropdown from 'react-native-select-dropdown';
import down from '../../images/down.png';
import Header from '../../components/HeaderComponent';

const genderArray = [
    { id: 1, value: 'Male' },
    { id: 2, value: 'Female' },
];

const EditScreen = ({ navigation }) => {
    const orientation = useOrientation(); // Get current orientation
    const isPortrait = orientation === 'portrait';
    const [name, setName] = useState('');
    const [dob, setDob] = useState(null);
    const [dobError, setDobError] = useState(false);
    const [gender, setGender] = useState('');
    const [genderError, setGenderError] = useState(false);
    const [height, setHeight] = useState('');
    const [heightError, setHeightError] = useState(false);
    const [weight, setWeight] = useState('');
    const [weightError, setWeightError] = useState(false);
    const [dateModalVisible, setDateModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const styles = isPortrait ? portraitStyles : landscapeStyles;

    return (
        <View style={styles.safeAreaStyle}>
            <View style={styles.headerView}>
                <Header title={'Edit Profile'} onPress={() => navigation.goBack()} />
            </View>
            <View style={styles.editTextInputView}>
                <View style={styles.textInputView}>
                    <Text style={styles.titleText}>Name</Text>
                    <TextInput
                        value={name}
                        onChangeText={text => {
                            setName(text);
                        }}
                        placeholder="Enter Name"
                        placeholderTextColor={COLORS.greyColor}
                        style={[styles.textInput, { color: COLORS.greyColor, width: '100%' }]}
                        keyboardType={'email-address'}
                        textContentType={'none'}
                        autoCapitalize={'none'}
                    />
                </View>
                <View style={styles.textInputView}>
                    <Text style={styles.titleText}>Date of Birth</Text>
                    <Text
                        style={[
                            styles.textInput,
                            { width: '100%', color: COLORS.greyColor },
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
                </View>
                <View style={styles.textInputView}>
                    <Text style={styles.titleText}>Gender</Text>
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
                                <View style={[styles.dropdown2BtnStyle2, { marginTop: hp(0.5) }]}>
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
                </View>
                <View style={styles.textInputView}>
                    <Text style={styles.titleText}>Height</Text>
                    <TextInput
                        value={height}
                        onChangeText={text => {
                            setHeight(text);
                        }}
                        placeholder="Enter Height"
                        placeholderTextColor={COLORS.greyColor}
                        style={[styles.textInput, { color: COLORS.greyColor, width: '100%' }]}
                    />
                </View>
                <View style={styles.textInputView}>
                    <Text style={styles.titleText}>Weight</Text>
                    <TextInput
                        value={weight}
                        onChangeText={text => {
                            setWeight(text);
                        }}
                        placeholder="Enter Weight"
                        placeholderTextColor={COLORS.greyColor}
                        style={[styles.textInput, { color: COLORS.greyColor, width: '100%' }]}
                    />
                </View>
                <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate('LoginScreen')}>
                    <Text style={styles.logoutText}>Save</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default EditScreen;
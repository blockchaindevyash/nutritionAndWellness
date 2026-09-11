import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Image,
    Alert,
    Modal,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { pick } from '@react-native-documents/picker'
import { portraitStyles, landscapeStyles } from './styles';
import useOrientation from '../../components/OrientationComponent';
import Header from '../../components/HeaderComponent';
import { COLORS } from '../../utils';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { showMessage } from "react-native-flash-message";
import useAuthStore from "../../store/authStore";
import { hp, wp } from "../../components/responsive";
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import SelectDropdown from 'react-native-select-dropdown';
import down from '../../images/down.png';

const genderArray = [
    { id: 1, value: '1 Day' },
    { id: 2, value: '2 Days' },
    { id: 3, value: '3 Days' },
    { id: 4, value: '4 Days' },
    { id: 5, value: '5 Days' },
    { id: 6, value: '6 Days' },
    { id: 7, value: '7 Days' },
];

const doseArray = [
    { id: 1, value: '1' },
    { id: 2, value: '2' },
    { id: 3, value: '3' },
];

const unitArray = [
    { id: 1, value: 'mg' },
    { id: 2, value: 'mcg' },
    { id: 3, value: 'g' },
    { id: 4, value: 'mL' },
    { id: 5, value: 'L' },
];

const doseScheduleArray = [
    { id: 1, value: 'Morning' },
    { id: 2, value: 'Afternoon' },
    { id: 3, value: 'Evening' },
    { id: 4, value: 'Night' },
];

const MedicineDetailScreen = ({ navigation }) => {
    const { updateSignupData } = useAuthStore();
    const orientation = useOrientation();
    const isPortrait = orientation === 'portrait';
    const styles = isPortrait ? portraitStyles : landscapeStyles;
    const insets = useSafeAreaInsets();
    const [medicineName, setMedicineName] = useState("");
    const [dosage, setDosage] = useState("");
    const [timing, setTiming] = useState("");
    const [notes, setNotes] = useState("");
    const [medicineList, setMedicineList] = useState([]);
    const [dob, setDob] = useState(null);
    const [dateModalVisible, setDateModalVisible] = useState(false);
    const [dobError, setDobError] = useState(false);
    const [unitInput, setUnitInput] = useState('');
    const [unit, setUnit] = useState('');
    const [totalDose, setTotalDose] = useState('');
    const [duration, setDuration] = useState('');
    const [doseSchedule, setDoseSchedule] = useState([{
        dose: 1,
        schedule: '',
    }]);
    const { t } = useTranslation();

    const addMedicine = () => {
        if (!medicineName.trim()) {
            Alert.alert("Required", "Please enter medicine name");
            return;
        }

        if (!totalDose) {
            Alert.alert("Required", "Please select total daily dose");
            return;
        }

        const hasEmptySchedule = doseSchedule.some(
            item => !item.schedule
        );

        if (hasEmptySchedule) {
            Alert.alert(
                "Required",
                "Please select schedule for every dose"
            );
            return;
        }

        const newMedicine = {
            id: Date.now(),
            medicine_name: medicineName,
            dosage,
            total_daily_dose: totalDose,
            dose_schedule: doseSchedule,
            additional_notes: notes,
        };

        setMedicineList(prev => [...prev, newMedicine]);

        // Reset form
        setMedicineName("");
        setDosage("");
        setTotalDose("");
        setDoseSchedule([]);
        setNotes("");
    };

    const removeMedicine = (id) => {
        const updated = medicineList.filter(
            item => item.id !== id
        );
        setMedicineList(updated);
    };

    const handleContinue = () => {
        if (medicineList.length == 0) {
            updateSignupData({
                current_medicine: [{
                    medicine_name: '',
                    dosage: '',
                    timing: '',
                    additional_notes: '',
                }]
            });
            navigation.navigate('WorkoutReference');
        } else {
            updateSignupData({
                current_medicine: medicineList.map(
                    ({ id, ...rest }) => rest
                ),
            });
            console.log("Medicine List:", medicineList);
            navigation.navigate('WorkoutReference');
        }
        // Alert.alert(
        // "Success",
        // "Medicine details saved successfully"
        // );
        // navigation.navigate("NextScreen", { medicineList });
    };

    const handleDoseChange = (selectedItem) => {
        const doseCount = parseInt(selectedItem?.value || '0', 10);

        setTotalDose(selectedItem?.value || '');

        setDoseSchedule(
            Array.from({ length: doseCount }, (_, index) => ({
                dose: index + 1,
                schedule: '',
            }))
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
            <View style={styles.headerView}>
                <Header title={t('current_medicines')} onPress={() => navigation.goBack()} />
            </View>
            <View style={[styles.mainView, { backgroundColor: COLORS.backColor }]}>
                <ScrollView
                    contentContainerStyle={{ paddingBottom: hp(20), padding: 15 }}
                    showsVerticalScrollIndicator={false}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.subtitle}>
                            {t('medicine_subtitle')}
                        </Text>
                    </View>
                    {/* Form Card */}
                    <LinearGradient
                        colors={["#2e3948", "#38414e"]}
                        style={styles.formCard}>
                        {/* Medicine Name */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>
                                {t('medicine_name')}
                            </Text>
                            <TextInput
                                placeholder={t('enter_medicine_name')}
                                placeholderTextColor="#eee"
                                value={medicineName}
                                onChangeText={setMedicineName}
                                style={styles.input}
                            />
                        </View>
                        {/* Medicine Name */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>
                                {t('start_date')}
                            </Text>
                            <Text
                                style={[
                                    styles.input,
                                    { width: '100%', color: COLORS.white },
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
                        {/* Dosage */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>
                                {t('unit')}
                            </Text>
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                            <TextInput
                                placeholder={'500'}
                                placeholderTextColor="#eee"
                                value={dosage}
                                onChangeText={setDosage}
                                style={[styles.input, {width: '60%'}]}
                            />
                            <SelectDropdown
                                data={unitArray}
                                dropdownOverlayColor='transparent'
                                defaultValueByIndex={0}
                                onSelect={(selectedItem, index) => {
                                    setUnit(selectedItem?.value);
                                    // console.log('gert Value:::', selectedItem?.value);
                                }}
                                renderButton={(selectedItem, isOpen) => {
                                    return (
                                        <View style={[styles.dropdown2BtnStyle2, { marginTop: hp(0.5), width: '35%' }]}>
                                            {unit != '' ? (
                                                <Text style={styles.dropdownItemTxtStyle}>
                                                    {unit == selectedItem?.value
                                                        ? selectedItem?.value
                                                        : unit}
                                                </Text>
                                            ) : (
                                                <Text style={styles.dropdownItemTxtStyle}>
                                                    {selectedItem?.value || 'Select Dose'}
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
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>
                                {t('total_daily_dose')}
                            </Text>
                            <SelectDropdown
                                data={doseArray}
                                dropdownOverlayColor='transparent'
                                defaultValueByIndex={0}
                                onSelect={(selectedItem, index) => {
                                    handleDoseChange(selectedItem);
                                    // setTotalDose(selectedItem?.value);
                                    // console.log('gert Value:::', selectedItem?.value);
                                }}
                                renderButton={(selectedItem, isOpen) => {
                                    return (
                                        <View style={[styles.dropdown2BtnStyle2, { marginTop: hp(0.5) }]}>
                                            {totalDose != '' ? (
                                                <Text style={styles.dropdownItemTxtStyle}>
                                                    {totalDose == selectedItem?.value
                                                        ? selectedItem?.value
                                                        : totalDose}
                                                </Text>
                                            ) : (
                                                <Text style={styles.dropdownItemTxtStyle}>
                                                    {selectedItem?.value || 'Select Dose'}
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
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>
                                {t('duration')}
                            </Text>
                            <SelectDropdown
                                data={genderArray}
                                dropdownOverlayColor='transparent'
                                defaultValueByIndex={0}
                                onSelect={(selectedItem, index) => {
                                    setDuration(selectedItem?.value);
                                    console.log('gert Value:::', selectedItem?.value);
                                }}
                                renderButton={(selectedItem, isOpen) => {
                                    return (
                                        <View style={[styles.dropdown2BtnStyle2, { marginTop: hp(0.5) }]}>
                                            {duration != '' ? (
                                                <Text style={styles.dropdownItemTxtStyle}>
                                                    {duration == selectedItem?.value
                                                        ? selectedItem?.value
                                                        : duration}
                                                </Text>
                                            ) : (
                                                <Text style={styles.dropdownItemTxtStyle}>
                                                    {selectedItem?.value || 'Select Duration'}
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
                        {/* Timing */}
                        {doseSchedule.length > 0 && (
                            <View style={{ width: '100%' }}>
                                {doseSchedule.map((item, index) => (
                                    <View
                                        key={`dose-schedule-${index}`}
                                        style={styles.inputContainer}
                                    >
                                        <Text style={styles.label}>
                                            {`Dose ${item.dose} Schedule`}
                                        </Text>

                                        <SelectDropdown
                                            data={doseScheduleArray}
                                            dropdownOverlayColor="transparent"
                                            defaultValueByIndex={0}
                                            onSelect={(selectedItem) => {
                                                setDoseSchedule(prev =>
                                                    prev.map((doseItem, doseIndex) =>
                                                        doseIndex === index
                                                            ? {
                                                                ...doseItem,
                                                                schedule: selectedItem?.value || '',
                                                            }
                                                            : doseItem
                                                    )
                                                );
                                            }}
                                            renderButton={(selectedItem, isOpen) => {
                                                const selectedSchedule =
                                                    doseSchedule[index]?.schedule || '';

                                                return (
                                                    <View
                                                        style={[
                                                            styles.dropdown2BtnStyle2,
                                                            { marginTop: hp(0.5) },
                                                        ]}
                                                    >
                                                        <Text style={styles.dropdownItemTxtStyle}>
                                                            {selectedSchedule ||
                                                                selectedItem?.value ||
                                                                'Select Schedule'}
                                                        </Text>

                                                        <View style={{ width: wp(7) }}>
                                                            <Image
                                                                style={styles.filterImage}
                                                                source={down}
                                                            />
                                                        </View>
                                                    </View>
                                                );
                                            }}
                                            showsVerticalScrollIndicator={false}
                                            renderItem={(item) => {
                                                return (
                                                    <TouchableOpacity
                                                        style={styles.dropdownView}
                                                    >
                                                        <Text style={styles.dropdownItemTxtStyle}>
                                                            {item?.value}
                                                        </Text>
                                                    </TouchableOpacity>
                                                );
                                            }}
                                            dropdownIconPosition="left"
                                            dropdownStyle={styles.dropdown2DropdownStyle}
                                        />
                                    </View>
                                ))}
                            </View>
                        )}
                        {/* Notes */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>
                                {t('additional_notes')}
                            </Text>
                            <TextInput
                                placeholder={t('optional_notes')}
                                placeholderTextColor="#eee"
                                value={notes}
                                onChangeText={setNotes}
                                multiline
                                style={[styles.input, styles.notesInput]}
                                textAlignVertical="top"
                            />
                        </View>
                        {/* Add Button */}
                        <TouchableOpacity style={styles.addButton} onPress={addMedicine}>
                            <Text style={styles.addButtonText}>
                                {`+ ${t('add_medicine')}`}
                            </Text>
                        </TouchableOpacity>
                    </LinearGradient>
                    {/* Added Medicines */}
                    {medicineList.length > 0 && (
                        <View style={styles.listContainer}>
                            <Text style={styles.listTitle}>
                                {t('added_medicines')}
                            </Text>
                            {medicineList.map((item) => (
                                <View key={item.id} style={styles.medicineCard}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.medicineName}>
                                            💊 {item.medicine_name}
                                        </Text>
                                        {!!item.dosage && (
                                            <Text style={styles.detailText}>
                                                Dosage: {item.dosage}
                                            </Text>
                                        )}
                                        {!!item.dose_schedule?.length && (
                                            <View style={{ marginTop: hp(0.5) }}>
                                                <Text style={styles.detailText}>
                                                    Dose Schedule:
                                                </Text>

                                                {item.dose_schedule.map((doseItem, index) => (
                                                    <Text
                                                        key={`medicine-dose-${item.id}-${index}`}
                                                        style={[
                                                            styles.detailText,
                                                            { marginLeft: wp(2) },
                                                        ]}
                                                    >
                                                        {`Dose ${doseItem.dose}: ${doseItem.schedule}`}
                                                    </Text>
                                                ))}
                                            </View>
                                        )}
                                        {!!item.notes && (
                                            <Text style={styles.detailText}>
                                                Notes: {item.notes}
                                            </Text>
                                        )}
                                    </View>
                                    <TouchableOpacity onPress={() => removeMedicine(item.id)}>
                                        <Text style={styles.removeText}>
                                            {t('remove')}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                    )}
                    {/* Bottom Button */}
                    <View style={styles.footer}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleContinue}>
                            <Text style={styles.buttonText}>
                                {t('next')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};

export default MedicineDetailScreen;

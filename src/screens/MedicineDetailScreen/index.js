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
import { hp } from "../../components/responsive";

const MedicineDetailScreen = ({ navigation }) => {
    const {updateSignupData} = useAuthStore();
    const orientation = useOrientation();
    const isPortrait = orientation === 'portrait';
    const styles = isPortrait ? portraitStyles : landscapeStyles;
    const insets = useSafeAreaInsets();
    const [medicineName, setMedicineName] = useState("");
    const [dosage, setDosage] = useState("");
    const [timing, setTiming] = useState("");
    const [notes, setNotes] = useState("");
    const [medicineList, setMedicineList] = useState([]);
    const { t } = useTranslation();

    const addMedicine = () => {
        if (!medicineName.trim()) {
            Alert.alert("Required", "Please enter medicine name");
            return;
        }
        const newMedicine = {
            id: Date.now(),
            medicine_name: medicineName,
            dosage,
            timing,
            additional_notes: notes,
        };
        setMedicineList(prev => [...prev, newMedicine]);
        setMedicineName("");
        setDosage("");
        setTiming("");
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
                    contentContainerStyle={{paddingBottom: hp(20), padding: 15}}
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
                        {/* Dosage */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>
                                {t('dosage')}
                            </Text>
                            <TextInput
                                placeholder={t('dosage_example')}
                                placeholderTextColor="#eee"
                                value={dosage}
                                onChangeText={setDosage}
                                style={styles.input}
                            />
                        </View>
                        {/* Timing */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>
                                {t('timing')}
                            </Text>
                            <TextInput
                                placeholder={t('timing_placeholder')}
                                placeholderTextColor="#eee"
                                value={timing}
                                onChangeText={setTiming}
                                style={styles.input}
                            />
                        </View>
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
                                        {!!item.timing && (
                                            <Text style={styles.detailText}>
                                                Timing: {item.timing}
                                            </Text>
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

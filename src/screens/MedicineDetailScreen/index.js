import React, { useState } from "react";
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

const MedicineDetailScreen = ({ navigation }) => {
    const orientation = useOrientation();
    const isPortrait = orientation === 'portrait';
    const styles = isPortrait ? portraitStyles : landscapeStyles;
    const insets = useSafeAreaInsets();
    const [medicineName, setMedicineName] = useState("");
    const [dosage, setDosage] = useState("");
    const [timing, setTiming] = useState("");
    const [notes, setNotes] = useState("");

    const [medicineList, setMedicineList] = useState([]);

    const addMedicine = () => {

        if (!medicineName.trim()) {
            Alert.alert("Required", "Please enter medicine name");
            return;
        }

        const newMedicine = {
            id: Date.now(),
            medicineName,
            dosage,
            timing,
            notes,
        };

        setMedicineList(prev => [...prev, newMedicine]);

        // Clear fields
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

        console.log("Medicine List:", medicineList);
        navigation.navigate('WorkoutReference');
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
                <Header title={'Current Medicines'} onPress={() => navigation.goBack()} />
            </View>
            <View style={[styles.mainView, { backgroundColor: COLORS.backColor }]}>
                <ScrollView
                    contentContainerStyle={styles.container}
                    showsVerticalScrollIndicator={false}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.subtitle}>
                            Add your current medicines so we can
                            personalize your meal plan and workout safely.
                        </Text>
                    </View>

                    {/* Form Card */}
                    <LinearGradient
                        colors={["#2e3948", "#38414e"]}
                        style={styles.formCard}
                    >

                        {/* Medicine Name */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>
                                Medicine Name
                            </Text>
                            <TextInput
                                placeholder="Enter medicine name"
                                placeholderTextColor="#eee"
                                value={medicineName}
                                onChangeText={setMedicineName}
                                style={styles.input}
                            />
                        </View>

                        {/* Dosage */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>
                                Dosage
                            </Text>
                            <TextInput
                                placeholder="Example: 500mg"
                                placeholderTextColor="#eee"
                                value={dosage}
                                onChangeText={setDosage}
                                style={styles.input}
                            />
                        </View>

                        {/* Timing */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>
                                Timing
                            </Text>
                            <TextInput
                                placeholder="Morning / After Lunch"
                                placeholderTextColor="#eee"
                                value={timing}
                                onChangeText={setTiming}
                                style={styles.input}
                            />
                        </View>

                        {/* Notes */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>
                                Additional Notes
                            </Text>
                            <TextInput
                                placeholder="Optional notes"
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
                                + Add Medicine
                            </Text>
                        </TouchableOpacity>
                    </LinearGradient>

                    {/* Added Medicines */}
                    {medicineList.length > 0 && (
                        <View style={styles.listContainer}>
                            <Text style={styles.listTitle}>
                                Added Medicines
                            </Text>
                            {medicineList.map((item) => (
                                <View key={item.id} style={styles.medicineCard}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.medicineName}>
                                            💊 {item.medicineName}
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
                                            Remove
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                    )}
                </ScrollView>

                {/* Bottom Button */}
                <View style={styles.footer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleContinue}>
                        <Text style={styles.buttonText}>
                            Next
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default MedicineDetailScreen;

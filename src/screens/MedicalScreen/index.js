import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image,
    ScrollView,
    FlatList,
    Platform,
    PermissionsAndroid,
} from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { portraitStyles, landscapeStyles } from './styles';
import useOrientation from '../../components/OrientationComponent';
import Header from '../../components/HeaderComponent';
import { COLORS } from '../../utils';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { hp } from '../../components/responsive';
import { showMessage } from 'react-native-flash-message';
import useAuthStore from '../../store/authStore';

const medicalOptions = [
    { id: 1, title: "None" },
    { id: 2, title: "Diabetes" },
    { id: 3, title: "Thyroid" },
    { id: 4, title: "PCOS" },
    { id: 5, title: "High BP" },
    { id: 6, title: "Other" },
];

const MedicalScreen = ({ navigation }) => {
    const {updateSignupData, medicalList} = useAuthStore();
    const orientation = useOrientation(); // Get current orientation
    const isPortrait = orientation === 'portrait';
    const styles = isPortrait ? portraitStyles : landscapeStyles;
    const insets = useSafeAreaInsets();
    const [selected, setSelected] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [otherText, setOtherText] = useState("");

    // 🔹 Toggle logic
    const toggleSelect = (item) => {
        let updated = [...selected];
        // -----------------------------------------
        // NONE SELECTED
        // -----------------------------------------
        if (item.name === "None") {

        updated = [item.id];

        } else {

        // Remove NONE if any other selected
        const noneItem = medicalList.find(
            (v) => v.name === "None"
        );

        updated = updated.filter(
            (id) => id !== noneItem?.id
        );

        // Already Selected
        if (updated.includes(item.id)) {

            updated = updated.filter(
            (id) => id !== item.id
            );

        } else {

            updated.push(item.id);

        }
        }

        setSelected(updated);
    };

    const medicalDataList = useMemo(() => {

        const uniqueList = medicalList.filter(
        (item, index, self) =>
            index ===
            self.findIndex(
            (obj) => obj.name === item.name
            )
        );

        return [
        ...uniqueList,
        {
            id: 999,
            name: "Other",
        },
        ];

    }, []);

    // 🔹 Next button
    const handleNext = () => {
        if (selected.length === 0) {
            showMessage({
                message: 'Please select at least one option',
                type: 'danger',
                duration: 4000,
                icon: 'danger',
            });
            return;
        } else {
            console.log("Medical Data:", selected);

            const isSelected = selected.includes(999);
            updateSignupData({
                medical_condition: selected,
                medical_condition_text: isSelected ? otherText : '',
            });
            navigation.navigate('DoctorDescription');
        }
        // const formData = {
        //     medical: selected,
        // };


        // navigation.navigate("NextScreen", formData);
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
                <Header title={'Medical Conditions'} onPress={() => navigation.goBack()} />
            </View>
            <View style={[styles.container, { backgroundColor: COLORS.backColor }]}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: hp(10)}}>
                    <Text style={styles.subtitle}>This helps us personalize your diet plan</Text>
                    {medicalDataList.map((item) => {
                        const isSelected = selected.includes(item.id);
                        return (
                            <View>
                                <TouchableOpacity
                                    key={item.id}
                                    style={[
                                        styles.card,
                                        isSelected && styles.selectedCard,
                                    ]}
                                    onPress={() => toggleSelect(item)}>
                                    <Text style={styles.cardTitle}>
                                        {item.name}
                                    </Text>
                                </TouchableOpacity>
                                {item.name === "Other" && isSelected && (
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Enter your condition..."
                                        value={otherText}
                                        onChangeText={setOtherText}
                                        placeholderTextColor={COLORS.white}
                                    />
                                )}
                            </View>
                        )
                    })}
                </ScrollView>
                <TouchableOpacity
                    style={[styles.buttonView, { opacity: isLoading ? 0.75 : 1 }]}
                    disabled={isLoading}
                    onPress={handleNext}>
                    {isLoading ? (
                        <ActivityIndicator size={'large'} color={COLORS.white} />
                    ) : (
                        <Text style={styles.signinText}>Next</Text>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default MedicalScreen;
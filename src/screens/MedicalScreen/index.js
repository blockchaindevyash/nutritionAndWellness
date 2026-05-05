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
import React, { useEffect, useState } from 'react';
import { portraitStyles, landscapeStyles } from './styles';
import useOrientation from '../../components/OrientationComponent';
import Header from '../../components/HeaderComponent';
import { COLORS } from '../../utils';

const medicalOptions = [
    { id: 1, title: "None" },
    { id: 2, title: "Diabetes" },
    { id: 3, title: "Thyroid" },
    { id: 4, title: "PCOS" },
    { id: 5, title: "High BP" },
    { id: 6, title: "Other" },
];

const MedicalScreen = ({ navigation }) => {
    const orientation = useOrientation(); // Get current orientation
    const isPortrait = orientation === 'portrait';
    const styles = isPortrait ? portraitStyles : landscapeStyles;
    const [selected, setSelected] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [otherText, setOtherText] = useState("");

    // 🔹 Toggle logic
    const toggleSelect = (item) => {
        let updated = [...selected];

        if (item.title === "None") {
            // If "None" selected → clear all others
            updated = ["None"];
        } else {
            // Remove "None" if selecting others
            updated = updated.filter(v => v !== "None");

            if (updated.includes(item.title)) {
                updated = updated.filter(v => v !== item.title);
            } else {
                updated.push(item.title);
            }
        }

        setSelected(updated);
    };

    // 🔹 Next button
    const handleNext = () => {
        if (selected.length === 0) {
            alert("Please select at least one option");
            return;
        }
        navigation.navigate('WorkoutReference');
        // const formData = {
        //     medical: selected,
        // };

        // console.log("Medical Data:", formData);

        // navigation.navigate("NextScreen", formData);
    };

    // 🔹 Render Item
    const renderItem = ({ item }) => {
        const isSelected = selected.includes(item.title);
        return (
            <TouchableOpacity
                style={[styles.card, isSelected && styles.selectedCard]}
                onPress={() => toggleSelect(item)}>
                <Text style={[styles.selectedText]}>
                    {item.title}
                </Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.safeAreaStyle}>

            <View style={styles.headerView}>
                <Header title={'Medical Conditions'} onPress={() => navigation.goBack()} />
            </View>
            <View style={[styles.container, { backgroundColor: COLORS.backColor }]}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={styles.subtitle}>This helps us personalize your diet plan</Text>
                    {medicalOptions.map((item) => {
                        const isSelected = selected.includes(item.title);
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
                                        {item.title}
                                    </Text>
                                </TouchableOpacity>
                                {item.title === "Other" && isSelected && (
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
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

const workoutOptions = [
  { id: 1, title: "Home Workout", icon: "🏠" },
  { id: 2, title: "Gym", icon: "🏋️" },
  { id: 3, title: "No Equipment", icon: "🚫" },
  { id: 4, title: "Other", icon: "✍️" }, // ✅ NEW
];

const WorkoutReference = ({ navigation }) => {
    const orientation = useOrientation(); // Get current orientation
    const isPortrait = orientation === 'portrait';
    const styles = isPortrait ? portraitStyles : landscapeStyles;
    const [selected, setSelected] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [otherText, setOtherText] = useState("");

    // 🔹 Toggle logic
    const toggleSelect = (item) => {
        setSelected(item.title);

        // Reset other text if not "Other"
        if (item.title !== "Other") {
        setOtherText("");
        }
    };

    // 🔹 Next button
    const handleNext = () => {
        if (selected.length === 0) {
            alert("Please select at least one option");
            return;
        }
        navigation.navigate('TabStack');
        // const formData = {
        //     medical: selected,
        // };

        // console.log("Medical Data:", formData);

        // navigation.navigate("NextScreen", formData);
    };

    return (
        <View style={styles.safeAreaStyle}>

            <View style={styles.headerView}>
                <Header title={'Workout Reference'} onPress={() => navigation.goBack()} />
            </View>
            <View style={[styles.container, { backgroundColor: COLORS.backColor }]}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={styles.subtitle}>This helps us personalize your workout plan</Text>
                    {workoutOptions.map((item) => {
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
                                    <Text style={styles.icon}>{item.icon}</Text>
                                    <Text style={[styles.cardTitle]}>
                                        {item.title}
                                    </Text>
                                </TouchableOpacity>
                                {item.title === "Other" && isSelected && (
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Enter your workout type..."
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
                        <Text style={styles.signinText}>Submit</Text>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default WorkoutReference;
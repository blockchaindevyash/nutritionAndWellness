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
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { hp } from '../../components/responsive';
import { showMessage } from 'react-native-flash-message';
import useAuthStore from '../../store/authStore';

const workoutOptions = [
  { id: 1, title: "Home Workout", icon: "🏠" },
  { id: 2, title: "Gym", icon: "🏋️" },
  { id: 3, title: "No Equipment", icon: "🚫" },
  { id: 4, title: "Other", icon: "✍️" }, // ✅ NEW
];

const WorkoutReference = ({ navigation }) => {
    const {updateSignupData, workoutList, signupData} = useAuthStore();
    const orientation = useOrientation(); // Get current orientation
    const isPortrait = orientation === 'portrait';
    const styles = isPortrait ? portraitStyles : landscapeStyles;
    const insets = useSafeAreaInsets();
    const [selected, setSelected] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [otherText, setOtherText] = useState("");

    // 🔹 Toggle logic
    const toggleSelect = (item) => {
        setSelected(item.id);
    };

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
            updateSignupData({
                workout_reference: selected,
            });

            console.log("Medical Data:", signupData);
            // navigation.navigate('TabStack');
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
                <Header title={'Workout Reference'} onPress={() => navigation.goBack()} />
            </View>
            <View style={[styles.container, { backgroundColor: COLORS.backColor }]}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: hp(10)}}>
                    <Text style={styles.subtitle}>This helps us personalize your workout plan</Text>
                    {workoutList.map((item) => {
                        return (
                            <View>
                                <TouchableOpacity
                                    key={item.id}
                                    style={[
                                        styles.card,
                                        selected === item.id && styles.selectedCard,
                                    ]}
                                    onPress={() => toggleSelect(item)}>
                                    <Text style={[styles.cardTitle]}>
                                        {item.name}
                                    </Text>
                                </TouchableOpacity>
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
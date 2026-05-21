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
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ImagePicker from "react-native-image-crop-picker";

const CreateRecipeScreen = ({ navigation }) => {
    const orientation = useOrientation(); // Get current orientation
    const isPortrait = orientation === 'portrait';
    const insets = useSafeAreaInsets();
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
    const [recipeImage, setRecipeImage] = useState(null);
    const [recipeName, setRecipeName] = useState("");
    const [recipeType, setRecipeType] = useState("");
    const [prepTime, setPrepTime] = useState("");
    const [calories, setCalories] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [steps, setSteps] = useState("");
    const styles = isPortrait ? portraitStyles : landscapeStyles;

    const onGalleryPress = () => {
        try {
        ImagePicker.openPicker({
            cropping: false,
            mediaType: 'any',
        }).then((image) => {
            console.log(image)
            setRecipeImage({
            uri: image.path,
            type: image.mime,
            name: image.filename,
            });
        });
        console.log('onGalleryPress');
        } catch (err) {
        console.log('onGalleryPress Error:', err);
        }
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
                <Header title={'Create Recipe'} onPress={() => navigation.goBack()} />
            </View>
            <ScrollView
                contentContainerStyle={{paddingBottom: hp(5)}}
                showsVerticalScrollIndicator={false}>
            <View style={styles.editTextInputView}>
                <TouchableOpacity
                style={styles.imageUploadBox}
                onPress={onGalleryPress}>
                {recipeImage ? (
                    <Image
                    source={{ uri: recipeImage.uri }}
                    style={styles.recipeImage}
                    resizeMode="cover"
                    />
                ) : (
                    <>
                    <Text style={styles.imageIcon}>
                        🍲
                    </Text>

                    <Text style={styles.uploadText}>
                        Upload Recipe Image
                    </Text>
                    </>
                )}
                </TouchableOpacity>
                <View style={styles.textInputView}>
                    <Text style={styles.titleText}>Recipe Name *</Text>
                    <TextInput
                        value={recipeName}
                        onChangeText={text => {
                            setRecipeName(text);
                        }}
                        placeholder="Example: Oats Vegetable Bowl"
                        placeholderTextColor={COLORS.greyColor}
                        style={[styles.textInput]}
                    />
                </View>
                <View style={styles.textInputView}>
                    <Text style={styles.titleText}>Recipe Type *</Text>
                    <TextInput
                        value={recipeType}
                        onChangeText={text => {
                            setRecipeType(text);
                        }}
                        placeholder="Breakfast / Lunch / Dinner"
                        placeholderTextColor={COLORS.greyColor}
                        style={[styles.textInput]}
                    />
                </View>
                <View style={styles.textInputView}>
                    <Text style={styles.titleText}>Prep Time</Text>
                    <TextInput
                        value={prepTime}
                        onChangeText={text => {
                            setPrepTime(text);
                        }}
                        placeholder="20 min"
                        placeholderTextColor={COLORS.greyColor}
                        style={[styles.textInput]}
                    />
                </View>
                <View style={styles.textInputView}>
                    <Text style={styles.titleText}>Calories</Text>
                    <TextInput
                        value={calories}
                        onChangeText={text => {
                            setCalories(text);
                        }}
                        placeholder="350 kcal"
                        placeholderTextColor={COLORS.greyColor}
                        keyboardType="numeric"
                        style={[styles.textInput]}
                    />
                </View>
                <View style={styles.textInputView}>
                    <Text style={styles.titleText}>Ingredients *</Text>
                    <TextInput
                        value={ingredients}
                        onChangeText={text => {
                            setIngredients(text);
                        }}
                        placeholder={`Example:\n• Oats\n• Milk\n• Almonds`}
                        placeholderTextColor={COLORS.greyColor}
                        style={[styles.textInput, {minHeight: hp(15), maxHeight: hp(20)}]}
                        multiline
                        textAlignVertical="top"
                    />
                </View>
                <View style={styles.textInputView}>
                    <Text style={styles.titleText}>Cooking Steps *</Text>
                    <TextInput
                        value={steps}
                        onChangeText={text => {
                            setSteps(text);
                        }}
                        placeholder={`Example:\n1. Boil oats\n2. Add milk\n3. Mix almonds`}
                        placeholderTextColor={COLORS.greyColor}
                        style={[styles.textInput, {minHeight: hp(15), maxHeight: hp(20)}]}
                        multiline
                        textAlignVertical="top"
                    />
                </View>
                <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.logoutText}>Create Recipe</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
        </View>
    );
};

export default CreateRecipeScreen;
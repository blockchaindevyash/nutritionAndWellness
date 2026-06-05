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
import React, { useCallback, useEffect, useState } from 'react';
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
import { onAddCommonFormApi } from '../../services/Api';
import { useFocusEffect } from '@react-navigation/native';
import { showMessage } from 'react-native-flash-message';

const CreateRecipeScreen = ({ navigation, route }) => {
    const orientation = useOrientation(); // Get current orientation
    const isPortrait = orientation === 'portrait';
    const insets = useSafeAreaInsets();
    const [isLoading, setIsLoading] = useState(false);
    const [recipeImage, setRecipeImage] = useState(null);
    const [recipeName, setRecipeName] = useState("");
    const [recipeType, setRecipeType] = useState("");
    const [prepTime, setPrepTime] = useState("");
    const [calories, setCalories] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [steps, setSteps] = useState("");
    const [errorVisible, setErrorVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [recipeId, setRecipeId] = useState('');
    const styles = isPortrait ? portraitStyles : landscapeStyles;

      useFocusEffect(
        useCallback(() => {
        if (route?.params?.item) {
            const { item } = route.params;
            const imageUrl = item.recipe_image_url;
            const extension = imageUrl.split(".").pop().toLowerCase();
            let mimeType = "image/png";
            switch (extension) {
            case "jpg":
            case "jpeg":
                mimeType = "image/jpeg";
                break;
            case "png":
                mimeType = "image/png";
                break;
            case "webp":
                mimeType = "image/webp";
                break;
            }
            setRecipeImage({
                uri: imageUrl,
                type: mimeType,
                name: imageUrl.split('/').pop(),
            });
            setRecipeId(item?.id || '');
            setRecipeName(item?.recipe_name || '');
            setRecipeType(item?.recipe_type || '');
            setPrepTime(item?.prep_time || '');
            setCalories(item?.calories || '');
            setIngredients(item?.ingredients || '');
            setSteps(item?.cooking_steps || '');
        } else {
            setRecipeImage(null);
            setRecipeId('');
            setRecipeName('');
            setRecipeType('');
            setPrepTime('');
            setCalories('');
            setIngredients('');
            setSteps('');
        }
    }, [])
    );

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

    const onCreateRecipeData = async () => {
        if (recipeImage === null) {
            setErrorVisible(true);
            setErrorMessage('Please upload recipe image.');
        } else if (recipeName === '') {
            setErrorVisible(true);
            setErrorMessage('Please enter recipe name.');
        } else if (recipeType === '') {
            setErrorVisible(true);
            setErrorMessage('Please enter recipe type.');
        } else if (ingredients === '') {
            setErrorVisible(true);
            setErrorMessage('Please enter ingredients.');
        } else if (steps === '') {
            setErrorVisible(true);
            setErrorMessage('Please enter cooking steps.');
        } else {
            try {
                console.log('onRegistrationApi Error:', ingredients);
                setIsLoading(true);
                var formdata = new FormData();
                formdata.append("recipe_image", recipeImage);
                formdata.append("recipe_name", recipeName);
                formdata.append("recipe_type", recipeType);
                formdata.append("prep_time", prepTime);
                formdata.append("calories", calories);
                formdata.append("ingredients", ingredients);
                formdata.append("cooking_steps", steps);

                const responseData = await onAddCommonFormApi(recipeId == '' ? 'recipes' : `recipes/${recipeId}`,formdata);
                if (responseData.data.status) {
                    setIsLoading(false);
                    showMessage({
                        message: responseData.data.message,
                        type: 'success',
                        duration: 6000,
                        icon: 'success',
                    });
                    navigation.goBack();
                } else {
                    setErrorVisible(true);
                    setErrorMessage('Invalid Credentials');
                    setIsLoading(false);
                    console.log('onRegistrationApi response else', responseData.data);
                }
            } catch (err) {
                setErrorVisible(true);
                setErrorMessage(err?.response?.data?.message ||
                    'Something went wrong. Please try again.');
                setIsLoading(false);
                console.log('onRegistrationApi Error:', err);
            }
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
                contentContainerStyle={{ paddingBottom: hp(5) }}
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
                            style={[styles.textInput, { minHeight: hp(15), maxHeight: hp(20) }]}
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
                            style={[styles.textInput, { minHeight: hp(15), maxHeight: hp(20) }]}
                            multiline
                            textAlignVertical="top"
                        />
                    </View>
                    {errorVisible && (
                        <Text style={styles.errorText}>
                            {errorMessage}
                        </Text>
                    )}
                    <TouchableOpacity style={styles.logoutButton} onPress={() => onCreateRecipeData()}>
                        {isLoading ? (
                            <ActivityIndicator size={'large'} color={COLORS.white} />
                        ) : (
                            <Text style={styles.logoutText}>Create Recipe</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

export default CreateRecipeScreen;
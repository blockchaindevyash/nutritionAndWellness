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

const DoctorDescriptionScreen = ({ navigation }) => {
    const orientation = useOrientation();
    const isPortrait = orientation === 'portrait';
    const styles = isPortrait ? portraitStyles : landscapeStyles;
    const insets = useSafeAreaInsets();
    const [doctorNotes, setDoctorNotes] = useState("");
    const [documentFile, setDocumentFile] = useState(null);
    const [selectedTags, setSelectedTags] = useState([]);

    // ----------------------------
    // Pick Document
    // ----------------------------
    const pickDocument = async () => {
        try {
            const [result] = await pick({
                mode: 'open'
            });
            console.log("Selected File:", result);
            setDocumentFile(result);
        } catch (error) {
            console.log("Document Error:", error);
        }
    };

    const removeFile = () => {
        setDocumentFile(null);
    };

    const handleContinue = () => {
        if (!doctorNotes.trim() && !documentFile) {
            Alert.alert(
                "Required",
                "Please add doctor notes or upload report"
            );
            return;
        }
        navigation.navigate('MedicineDetailScreen');
    };

    const handleTagPress = (item) => {
        let updatedTags = [];
        // Remove if already selected
        if (selectedTags.includes(item)) {
            updatedTags = selectedTags.filter(tag => tag !== item);
        } else {
            // Add item
            updatedTags = [...selectedTags, item];
        }
        setSelectedTags(updatedTags);
        // Update Notes
        const notesText = updatedTags
            .map(tag => `• ${tag}`)
            .join("\n");
        setDoctorNotes(notesText);
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
                <Header title={'Doctor Recommendations'} onPress={() => navigation.goBack()} />
            </View>
            <View style={[styles.mainView, { backgroundColor: COLORS.backColor }]}>
            <ScrollView
                contentContainerStyle={styles.container}
                showsVerticalScrollIndicator={false}>
                {/* Header */}
                <Text style={styles.subtitle}>
                    Add doctor advice, dietary restrictions,
                    medical instructions, or upload prescriptions
                    to generate a personalized fitness & meal plan.
                </Text>

                {/* Upload Section */}
                <View style={styles.uploadContainer}>
                    <Text style={styles.uploadTitle}>
                        Upload Prescription / Report
                    </Text>
                    <TouchableOpacity
                        style={styles.uploadBox}
                        onPress={() => pickDocument()}>
                        <Text style={styles.uploadIcon}>
                            📄
                        </Text>
                        <Text style={styles.uploadText}>
                            Tap to upload image or PDF
                        </Text>
                    </TouchableOpacity>
                    
                    {/* Preview */}
                    {documentFile && (
                        <View style={styles.previewCard}>
                            <View style={styles.fileHeader}>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.fileName} numberOfLines={1}>
                                        {documentFile.name}
                                    </Text>
                                    <Text style={styles.fileType}>
                                        {documentFile.type}
                                    </Text>
                                </View>
                                <TouchableOpacity onPress={removeFile}>
                                    <Text style={styles.removeText}>
                                        Remove
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            {/* Image Preview */}
                            {documentFile.type?.includes("image") && (
                                <Image
                                    source={{ uri: documentFile.uri }}
                                    style={styles.previewImage}
                                    resizeMode="cover"
                                />
                            )}

                            {/* PDF Preview */}
                            {documentFile.type?.includes("pdf") && (
                                <View style={styles.pdfBox}>
                                    <Text style={styles.pdfText}>
                                        PDF Document Selected
                                    </Text>
                                </View>
                            )}
                        </View>
                    )}
                </View>

                {/* Doctor Notes Card */}
                <LinearGradient
                    colors={["#2e3948", "#323740"]}
                    style={styles.card}>
                    <Text style={styles.cardTitle}>
                        Health Notes
                    </Text>
                    <TextInput
                        placeholder={`Example:\n• Avoid sugar\n• Low sodium diet\n• Daily walking recommended\n• Thyroid-friendly foods`}
                        placeholderTextColor="#eee"
                        multiline
                        value={doctorNotes}
                        onChangeText={setDoctorNotes}
                        style={styles.input}
                        textAlignVertical="top"
                        maxLength={500}
                    />
                    <Text style={styles.limitText}>
                        {doctorNotes.length}/500
                    </Text>
                </LinearGradient>

                {/* Suggestions */}
                <View style={styles.suggestionContainer}>
                    <Text style={styles.suggestionTitle}>
                        Common Instructions
                    </Text>
                    <View style={styles.tagsContainer}>
                        {[
                            "Low Sugar",
                            "High Protein",
                            "Low Carb",
                            "Low Sodium",
                            "Daily Walking",
                            "Avoid Junk Food",
                            "More Water",
                            "Thyroid Diet",
                        ].map((item, index) => {
                        const isSelected = selectedTags.includes(item);
                        return (
                            <TouchableOpacity
                                key={index}
                                style={[styles.tag,
                                    isSelected && styles.selectedTag,
                                ]}
                                onPress={() => handleTagPress(item)}>
                                <Text style={[styles.tagText,
                                    isSelected && styles.selectedTagText,
                                ]}>
                                    {item}
                                </Text>
                            </TouchableOpacity>
                        )})}
                    </View>
                </View>
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

export default DoctorDescriptionScreen;

import {
    View,
    TextInput,
    TouchableOpacity,
    Image,
    Text,
    StatusBar,
    FlatList,
    ActivityIndicator,
    Platform,
    ScrollView,
    Keyboard,
} from 'react-native';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { portraitStyles, landscapeStyles } from './styles';
import useOrientation from '../../components/OrientationComponent';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import plus from '../../images/plus.png';
import { COLORS, Fonts } from '../../utils';
import { useFocusEffect } from '@react-navigation/native';
import { hp } from '../../components/responsive';
import ProfilePhoto from '../../components/ProfilePhoto';
import moment from 'moment';
import plane from '../../images/plane.png';
import { pick } from '@react-native-documents/picker'
import { onAddChatFormApi, onAddCommonFormApi } from '../../services/Api';
import ImagePicker from "react-native-image-crop-picker";

const HistoryScreen = ({ navigation }) => {
    const orientation = useOrientation();
    const isPortrait = orientation === 'portrait';
    const styles = isPortrait ? portraitStyles : landscapeStyles;
    const insets = useSafeAreaInsets();
    const [getProfileData, setGetProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(false);
    const [loadingCount, setLoadingCount] = useState(1);
    const [chatUserList, setChatUserList] = useState([]);
    const [filteredList, setFilteredList] = useState([]);
    const [search, setSearch] = useState('');
    const [enterText, setEnterText] = useState('');
    const [answerLoading, setAnswerLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [MessageListData, setMessageListData] = useState([]);
    const [imageAttachment, setImageAttachment] = useState(null);

    useFocusEffect(
        useCallback(() => {
            StatusBar.setBarStyle('light-content');
        }, [])
    );

    useEffect(() => {
    if (!answerLoading) {
        setLoadingCount(1);
        return;
    }

    const interval = setInterval(() => {
        setLoadingCount(prev => (prev >= 3 ? 1 : prev + 1));
    }, 500);

    return () => clearInterval(interval);
}, [answerLoading]);

    // useFocusEffect(
    //     useCallback(() => {
    //         onGetChatList();
    //     }, [])
    // );

    const onGetChatList = async () => {
        try {
            const response = await onGetCommonApi('chat-list');
            if (response.data.status) {
                console.log('Get Value');
                setChatUserList(response.data.data);
                setFilteredList(response.data.data);
                setLoading(false);
                setRefresh(!refresh);
            }
        } catch (err) {
            setLoading(false);
            console.log('onGetChatList Error::', err);
        }
    };

    const onDocumentPress = async () => {
        try {
            ImagePicker.openPicker({
                cropping: false,
                mediaType: 'photo',
            }).then((image) => {
                console.log('Get Document Data:::', image);
                console.log('Get Document Data:::', image.path);
                setImageAttachment({
                    uri: image.path,
                    type: image.mime,
                    name: image.filename,
                });
            });
            // const [result] = await pick({
            //     mode: 'open',
            // });

            // setAttachmentVisible({
            //     uri: result.uri,
            //     type: result.nativeType,
            //     name: result.name,
            // });
            // let doc = 'https://w3.pppl.gov/communications/web/tgrant.pdf';
            
        } catch (err) {
            console.log('onDocumentPress Error:', err);
        }
    };

    // const onSendMessage = async () => {
    //     try {
    //         setIsLoading(true);
    //         var formdata = new FormData();
    //         formdata.append("prompt", enterText);
    //         if (imageAttachment != null) {
    //         formdata.append("image", imageAttachment)
    //         }
    //         console.log('Message Request:', formdata);
    //         const response = await onAddChatFormApi('ai/assistant', formdata);
    //         console.log('onPostImageData Response:', response);
    //         // if (response.data.status) {
    //         // setMessageListData(response.data.data);
    //         // setIsLoading(false);
    //         // }
    //     } catch (err) {
    //         setIsLoading(false);
    //         console.log('onSendMessage Error:', err);
    //         console.log('onSendMessage Error:', err.response);
    //     }
    // }
    const onSendMessage = async () => {
        Keyboard.dismiss();
        if (!enterText.trim()) return;
        const userMessage = {
            id: Date.now().toString(),
            type: "user",
            text: enterText,
        };
        setMessageListData(prev => [...prev, userMessage]);
        const botId = (Date.now() + 1).toString();
        setMessageListData(prev => [
            ...prev,
            {
            id: botId,
            type: "bot",
            text: "",
            },
        ]);
        var formData = new FormData();
        formData.append("prompt", enterText);
        if (imageAttachment) {
            formData.append("image", imageAttachment);
        }
        setEnterText("");

        try {
            setAnswerLoading(true);
            const response = await onAddChatFormApi(
            "ai/assistant",
            formData
            );
            let finalText = "";
            response.split("\n").forEach(line => {
            line = line.trim();
            if (!line.startsWith("data:")) return;
            const data = line.replace("data:", "").trim();
            if (data === "[DONE]") return;

            try {
                const json = JSON.parse(data);
                finalText += json.text;
            } catch (e) {
                console.log("Invalid JSON:", data);
            }
            });
            setAnswerLoading(false);
            console.log("onSendMessage Response:", finalText);
            if (finalText != "") {
                setMessageListData(prev =>
                    prev.map(item =>
                        item.id === botId
                        ? {
                            ...item,
                            text: finalText,
                          }
                        : item
                    )
                );
            }
        } catch (e) {
            setAnswerLoading(false);
            console.log(e);
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
                <Text style={styles.callLogText}>
                    AI Assistant
                </Text>
            </View>
            <View style={{height: '94%', backgroundColor: COLORS.backColor}}>
                <View style={styles.mainView}>
                    {MessageListData.length > 0 ? (
                        <ScrollView contentContainerStyle={{paddingBottom: hp(15)}}>
                            {MessageListData.map((item, index) => {
                                return (
                                    <View style={styles.itemsDataView}>
                                        {item.type == 'user' ? (
                                            <View style={[styles.queDataMainView, { paddingTop: index == 0 ? hp(1) : hp(4) }]}>
                                                <View style={styles.queDataView}>
                                                    {/* {item.attachments.length > 0 && (
                                                        <View style={{ alignItems: 'flex-end' }}>
                                                            <Image source={{ uri: item.attachments[0].file }} style={styles.urlImage} />
                                                        </View>
                                                    )} */}
                                                    <Text style={styles.queText}>{item.text}</Text>
                                                </View>
                                            </View>
                                        ) : (
                                            (answerLoading && index == MessageListData.length - 1) ? (
                                            <>
                                                <Text style={styles.ansTitleText}>{'Nutrition & Wellness '}</Text>
                                                <Text style={[styles.ansText, { color: COLORS.greyColor }]}>
                                                    {/* {loadingCount == 1 ? 'Loading.' : loadingCount == 2 ? 'Loading. .' : 'Loading. . .'} */}
                                                    {"Loading" + ".".repeat(loadingCount)}
                                                </Text>
                                            </>
                                        ) : (
                                            <>
                                                <Text style={styles.ansTitleText}>{'Nutrition & Wellness'}</Text>
                                                <Text style={styles.ansText}>{item.text}</Text>
                                            </>)
                                        )}
                                        {/* {(answerLoading && index == MessageListData.length - 1) && (
                                            <>
                                                <Text style={styles.ansTitleText}>{'Nutrition & Wellness '}</Text>
                                                <Text style={[styles.ansText, { color: COLORS.greyColor }]}>{loadingCount == 1 ? 'Loading.' : loadingCount == 2 ? 'Loading. .' : 'Loading. . .'}</Text>
                                            </>
                                        )} */}
                                    </View>
                                );
                            })}
                        </ScrollView>
                    ) : (
                        <View style={styles.emptyTextView}>
                            <Text style={styles.emptyText}>Welcome to Nutrition & Wellness</Text>
                            {/* <Text style={styles.chatText}>{selectTemplate?.description}</Text> */}
                        </View>
                    )}
                </View>
                <View style={[styles.bottomView, {bottom: Platform.OS === 'ios' ? insets.bottom + 40 : insets.bottom}]}>
                    <View style={styles.chatInputView}>
                        <View style={styles.chatInputView1}>
                            <TouchableOpacity style={styles.roundButtonView} onPress={() => onDocumentPress()}>
                                <Image source={plus} style={styles.closeIcon} />
                            </TouchableOpacity>
                            <TextInput
                                value={enterText}
                                onChangeText={text => {
                                    setEnterText(text);
                                }}
                                placeholder="Ask anything"
                                placeholderTextColor={COLORS.greyColor}
                                style={[styles.textInput, { width: '78%' }]}
                                multiline
                            />
                            <TouchableOpacity
                                onPress={() => onSendMessage()}
                                disabled={enterText == '' ? true : false}
                                style={[styles.roundButtonView1, { backgroundColor: enterText != '' ? COLORS.subPrimary : COLORS.lightPrimary }]}>
                                <Image source={plane} style={[styles.closeIcon, { tintColor: '#fff' }]} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default HistoryScreen;

import {
    View,
    TextInput,
    TouchableOpacity,
    Image,
    Text,
    StatusBar,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { portraitStyles, landscapeStyles } from './styles';
import useOrientation from '../../components/OrientationComponent';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import plus from '../../images/plus.png';
import { COLORS } from '../../utils';
import { useFocusEffect } from '@react-navigation/native';
import { hp } from '../../components/responsive';
import ProfilePhoto from '../../components/ProfilePhoto';
import moment from 'moment';
import plane from '../../images/plane.png';
import { pick } from '@react-native-documents/picker'

const HistoryScreen = ({ navigation }) => {
    const orientation = useOrientation();
    const isPortrait = orientation === 'portrait';
    const styles = isPortrait ? portraitStyles : landscapeStyles;
    const insets = useSafeAreaInsets();
    const [getProfileData, setGetProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(false);
    const [phoneVerified, setPhoneVerified] = useState(null);
    const [chatUserList, setChatUserList] = useState([]);
    const [filteredList, setFilteredList] = useState([]);
    const [search, setSearch] = useState('');
    const [enterText, setEnterText] = useState('');
    const [searchList, setSearchList] = useState([]);
    const [answerLoading, setAnswerLoading] = useState(false);

    useFocusEffect(
        useCallback(() => {
            StatusBar.setBarStyle('light-content');
        }, [])
    );

    useFocusEffect(
        useCallback(() => {
            onGetChatList();
        }, [])
    );

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
            const [result] = await pick({
                mode: 'open',
            });

            setAttachmentVisible({
                uri: result.uri,
                type: result.nativeType,
                name: result.name,
            });
            let doc = 'https://w3.pppl.gov/communications/web/tgrant.pdf';
            console.log('Get Document Data:::', result);
            console.log('Get Document Data:::', result.uri);
            console.log('onDocumentPress');
        } catch (err) {
            console.log('onDocumentPress Error:', err);
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
                    {searchList.length > 0 ? (
                        <ScrollView contentContainerStyle={{paddingBottom: hp(15)}}>
                            {searchList.map((item, index) => {
                                return (
                                    <View style={styles.itemsDataView}>
                                        {item.role == 'user' ? (
                                            <View style={[styles.queDataMainView, { paddingTop: index == 0 ? hp(1) : hp(4) }]}>
                                                <View style={styles.queDataView}>
                                                    {item.attachments.length > 0 && (
                                                        <View style={{ alignItems: 'flex-end' }}>
                                                            <Image source={{ uri: 'https://aiapi.medendx.com' + item.attachments[0].file }} style={styles.urlImage} />
                                                        </View>
                                                    )}
                                                    <Text style={styles.queText}>{item.content}</Text>
                                                </View>
                                            </View>
                                        ) : (
                                            <>
                                                <Text style={styles.ansTitleText}>{'AIHealthCare  '}
                                                    <Text style={styles.ansDateText}>{moment(item.created_at, "MM/DD/YY hh:mm:ss A").format('MMM DD, hh:mm a')}</Text>
                                                </Text>
                                                <Text style={styles.ansText}>{renderContent(item.content)}</Text>
                                                {/* <Markdown style={{
                                                    body: styles.ansText,
                                                    heading1: [styles.ansText, {fontFamily: Fonts.FONTS.PoppinsSemiBold}],
                                                    code_block: styles.ansText
                                                }}>
                                                    {item.content}
                                                </Markdown> */}
                                            </>
                                        )}
                                        {(answerLoading && index == searchList.length - 1) && (
                                            <>
                                                <Text style={styles.ansTitleText}>{'AIHealthCare '}</Text>
                                                <Text style={[styles.ansText, { color: COLORS.greyColor }]}>{loadingCount == 1 ? 'Loading.' : loadingCount == 2 ? 'Loading. .' : 'Loading. . .'}</Text>
                                            </>
                                        )}
                                    </View>
                                );
                            })}
                        </ScrollView>
                    ) : (
                        <View style={styles.emptyTextView}>
                            <Text style={styles.emptyText}>selectTemplate dummy_name</Text>
                            {/* <Text style={styles.chatText}>{selectTemplate?.description}</Text> */}
                        </View>
                    )}
                </View>
                <View style={[styles.bottomView, {bottom: insets.bottom+40}]}>
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
                                onPress={() => { }}
                                disabled={enterText == '' ? true : textInputVisible}
                                style={[styles.roundButtonView1, { backgroundColor: enterText != '' ? COLORS.subPrimary : COLORS.lightPrimary }]}>
                                <Image source={plane} style={[styles.closeIcon, { tintColor: COLORS.white }]} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default HistoryScreen;

import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import backArrow from '../../images/backArrow.png';
import plus from '../../images/plus.png';
import Icon from '../../components/Icon';
import {
  portraitStyles,
  landscapeStyles,
} from './styles';

import useOrientation from '../../components/OrientationComponent';
import {COLORS, Fonts} from '../../utils';
import {normalize, wp} from '../../components/responsive';
import {useTranslation} from 'react-i18next';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const MessageScreen = ({navigation, route}) => {
  const orientation = useOrientation();
  const isPortrait = orientation === 'portrait';
  const styles = isPortrait
    ? portraitStyles
    : landscapeStyles;

  const insets = useSafeAreaInsets();
  const {t} = useTranslation();
  const flatListRef = useRef(null);

  const group = route?.params || {};
  const groupName = group.groupName || 'Nutrition Support Group';
  const memberCount = group.memberCount || 24;
  const groupImage = group.groupImage;
  const currentUserId = '1';
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState([
    {
      id: '1',
      senderId: '2',
      senderName: 'Sarah',
      message: 'Hello everyone 👋',
      time: '10:01 AM',
      date: 'Today',
    },
    {
      id: '2',
      senderId: '3',
      senderName: 'Michael',
      message:
        'Good morning! Has anyone tried the new healthy breakfast recipe?',
      time: '10:02 AM',
      date: 'Today',
    },
    {
      id: '3',
      senderId: '1',
      senderName: 'You',
      message: 'Yes! I tried it this morning. It was really good.',
      time: '10:04 AM',
      date: 'Today',
    },
    {
      id: '4',
      senderId: '4',
      senderName: 'Emily',
      message: 'Can you share the recipe?',
      time: '10:05 AM',
      date: 'Today',
    },
    {
      id: '5',
      senderId: '1',
      senderName: 'You',
      message: 'Sure, I will share it here 👍',
      time: '10:06 AM',
      date: 'Today',
    },
  ]);

  const handleSendMessage = () => {
    const text = messageText.trim();
    if (!text) {
      return;
    }
    const newMessage = {
      id: Date.now().toString(),
      senderId: currentUserId,
      senderName: 'You',
      message: text,
      time: formatTime(new Date()),
      date: 'Today',
    };
    setMessages(prevMessages => [
      ...prevMessages,
      newMessage,
    ]);
    setMessageText('');
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({
        animated: true,
      });
    }, 100);
  };

  const formatTime = date => {
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderMessage = ({item, index}) => {
    const isMine = item.senderId === currentUserId;
    const previousMessage = messages[index - 1];
    const showDate =
      !previousMessage ||
      previousMessage.date !== item.date;
    return (
      <View>
        {showDate && (
          <View style={styles.dateContainer}>
            <View style={styles.dateLine} />
            <Text style={styles.dateText}>
              {item.date}
            </Text>
            <View style={styles.dateLine} />
          </View>
        )}
        <View
          style={[
            styles.messageRow,
            isMine && styles.myMessageRow,
          ]}>
          {!isMine && (
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {item.senderName
                  ?.charAt(0)
                  ?.toUpperCase()}
              </Text>
            </View>
          )}
          <View
            style={[
              styles.messageContent,
              isMine
                ? styles.myMessageContent
                : styles.otherMessageContent,
            ]}>
            {!isMine && (
              <Text style={styles.senderName}>
                {item.senderName}
              </Text>
            )}
            <View
              style={[
                styles.messageBubble,
                isMine
                  ? styles.myBubble
                  : styles.otherBubble,
              ]}>
              <Text
                style={[
                  styles.messageText,
                  isMine
                    ? styles.myMessageText
                    : styles.otherMessageText,
                ]}>
                {item.message}
              </Text>
              <View style={styles.messageBottomRow}>
                <Text
                  style={[
                    styles.messageTime,
                    isMine &&
                      styles.myMessageTime,
                  ]}>
                  {item.time}
                </Text>
                {isMine && (
                  <Text style={styles.readStatus}>
                    ✓✓
                  </Text>
                )}
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container, {paddingBottom: 0}]}>
      <View
        style={{
          width: '100%',
          height: insets.top,
          backgroundColor: COLORS.primary,
        }}
      />
      <View style={styles.chatHeader}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Image
            source={backArrow}
            style={styles.backArrow}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.groupInfo}
          activeOpacity={0.8}
          onPress={() => {
            navigation.navigate('GroupDetailsScreen', {
              groupId: group.groupId,
            });
          }}>
          {groupImage ? (
            <Image
              source={{uri: groupImage}}
              style={styles.groupImage}
            />
          ) : (
            <View style={styles.groupImagePlaceholder}>
              <Text style={styles.groupImageText}>
                {groupName
                  ?.charAt(0)
                  ?.toUpperCase()}
              </Text>
            </View>
          )}
          <View style={styles.groupTextContainer}>
            <Text
              numberOfLines={1}
              style={styles.groupName}>
              {groupName}
            </Text>
            <View style={styles.onlineRow}>
              <View style={styles.onlineDot} />
              <Text style={styles.memberCount}>
                {memberCount} members
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.headerAction}
          onPress={() => {
            navigation.navigate('GroupDetailsScreen', {
              groupId: group.groupId,
            });
          }}>
          <Icon
            name="ellipsis-vertical"
            size={24}
            color={COLORS.white || '#FFFFFF'}
          />
        </TouchableOpacity>
      </View>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={
          Platform.OS === 'ios'
            ? 'padding'
            : undefined
        }>
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={item => item.id}
          renderItem={renderMessage}
          contentContainerStyle={
            styles.chatContent
          }
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({
              animated: false,
            })
          }
        />
        <View style={styles.inputContainer}>
          <TouchableOpacity
            style={styles.inputIconButton}
            onPress={() => {
              console.log('Attachment clicked');
            }}>
            <Image
              source={plus}
              style={styles.inputIcon}
            />
          </TouchableOpacity>
          <View style={styles.inputWrapper}>
            <TextInput
              value={messageText}
              onChangeText={setMessageText}
              placeholder={t('type_message') || 'Type a message...'}
              placeholderTextColor="#9A9A9A"
              style={styles.textInput}
              multiline
              maxLength={1000}
            />
            {/* <TouchableOpacity
              style={styles.emojiButton}
              onPress={() => {
                console.log('Emoji clicked');
              }}>
              <Text style={styles.emojiText}>
                ☺
              </Text>
            </TouchableOpacity> */}
          </View>
          <TouchableOpacity
            style={[
              styles.sendButton,
              !messageText.trim() &&
                styles.sendButtonDisabled,
            ]}
            onPress={handleSendMessage}
            disabled={!messageText.trim()}>
            <Icon
              name="send"
              size={19}
              color="#FFFFFF"
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default MessageScreen;

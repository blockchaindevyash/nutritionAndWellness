import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';
import Icon from '../../components/Icon';
import { portraitStyles, landscapeStyles } from './styles';
import useOrientation from '../../components/OrientationComponent';
import { COLORS } from '../../utils';
import Header from '../../components/HeaderComponent';
import { useTranslation } from 'react-i18next';
import down from '../../images/down.png';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import backArrow from '../../images/backArrow.png';

const defaultPost = {
  id: '1',
  user: 'Sarah Johnson',
  time: '15 min ago',
  avatar: 'https://i.pravatar.cc/150?img=47',
  category: 'Nutrition',
  title: 'What are some healthy breakfast ideas?',
  description:
    'I am trying to improve my breakfast routine. What healthy and easy breakfast options do you recommend?',
  likes: 24,
  comments: 3,
  liked: false,
};

const initialComments = [
  {
    id: '1',
    user: 'Emily Davis',
    avatar: 'https://i.pravatar.cc/150?img=32',
    time: '10 min ago',
    comment:
      'Overnight oats with fruits and nuts are really easy to prepare and very filling!',
    likes: 5,
    liked: false,
  },
  {
    id: '2',
    user: 'Michael Brown',
    avatar: 'https://i.pravatar.cc/150?img=12',
    time: '7 min ago',
    comment:
      'I usually have eggs, whole grain toast and some fruit. It keeps me full for a long time.',
    likes: 3,
    liked: false,
  },
  {
    id: '3',
    user: 'David Wilson',
    avatar: 'https://i.pravatar.cc/150?img=13',
    time: '3 min ago',
    comment:
      'Greek yogurt with berries and almonds is another great option.',
    likes: 7,
    liked: true,
  },
];

const PostDetailsScreen = ({route, navigation}) => {
  const orientation = useOrientation();
  const isPortrait = orientation === 'portrait';
  const styles = isPortrait ? portraitStyles : landscapeStyles;
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const post = route?.params?.post || defaultPost;

  const [liked, setLiked] = useState(post.liked || false);
  const [likes, setLikes] = useState(post.likes || 0);
  const [reply, setReply] = useState('');
  const [comments, setComments] = useState(initialComments);

  const handleLike = () => {
    setLiked(!liked);

    setLikes(prev =>
      liked ? prev - 1 : prev + 1,
    );
  };

  const handleCommentLike = id => {
    setComments(prev =>
      prev.map(item =>
        item.id === id
          ? {
              ...item,
              liked: !item.liked,
              likes: item.liked
                ? item.likes - 1
                : item.likes + 1,
            }
          : item,
      ),
    );
  };

  const handleReply = () => {
    if (!reply.trim()) {
      return;
    }

    const newComment = {
      id: Date.now().toString(),
      user: 'You',
      avatar:
        'https://i.pravatar.cc/150?img=11',
      time: 'Just now',
      comment: reply.trim(),
      likes: 0,
      liked: false,
    };

    setComments(prev => [
      newComment,
      ...prev,
    ]);

    setReply('');
  };

  const renderComment = ({item}) => (
    <View style={styles.commentContainer}>
      <Image
        source={{uri: item.avatar}}
        style={styles.commentAvatar}
      />

      <View style={styles.commentContent}>
        <View style={styles.commentHeader}>
          <View>
            <Text style={styles.commentUser}>
              {item.user}
            </Text>

            <Text style={styles.commentTime}>
              {item.time}
            </Text>
          </View>

          <TouchableOpacity>
            <Icon
              name="more"
              size={18}
              color={COLORS.white}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.commentText}>
          {item.comment}
        </Text>

        <View style={styles.commentActions}>
          <TouchableOpacity
            style={styles.commentAction}
            onPress={() =>
              handleCommentLike(item.id)
            }>

            <Icon
              name={
                item.liked
                  ? 'heart'
                  : 'heartOutline'
              }
              size={17}
              color={
                item.liked
                  ? COLORS.subPrimary
                  : COLORS.white
              }
            />

            <Text
              style={[
                styles.commentActionText,
                item.liked &&
                  styles.commentLikedText,
              ]}>
              {item.likes}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.replyAction}>

            <Icon
              name="reply"
              size={16}
              color={COLORS.white}
            />

            <Text
              style={styles.commentActionText}>
              Reply
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const Header = () => (
    <View>

      {/* Post Card */}
      <View style={styles.postCard}>

        {/* User */}
        <View style={styles.userRow}>
          <Image
            source={{uri: post.avatar}}
            style={styles.avatar}
          />

          <View style={styles.userInfo}>
            <Text style={styles.userName}>
              {post.user}
            </Text>

            <Text style={styles.postTime}>
              {post.time}
            </Text>
          </View>

          <TouchableOpacity>
            <Icon
              name="more"
              size={21}
              color={COLORS.white}
            />
          </TouchableOpacity>
        </View>

        {/* Category */}
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>
            {post.category}
          </Text>
        </View>

        {/* Title */}
        <Text style={styles.postTitle}>
          {post.title}
        </Text>

        {/* Description */}
        <Text style={styles.postDescription}>
          {post.description}
        </Text>

        {/* Optional Image */}
        {post.image && (
          <Image
            source={{uri: post.image}}
            style={styles.postImage}
          />
        )}

        {/* Actions */}
        <View style={styles.actionsContainer}>

          {/* Like */}
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleLike}>

            <Icon
              name={
                liked
                  ? 'heart'
                  : 'heartOutline'
              }
              size={22}
              color={
                liked
                  ? COLORS.subPrimary
                  : COLORS.white
              }
            />

            <Text
              style={[
                styles.actionText,
                liked &&
                  styles.likedText,
              ]}>
              {likes}
            </Text>
          </TouchableOpacity>

          {/* Comments */}
          <TouchableOpacity
            style={styles.actionButton}>

            <Icon
              name="comment"
              size={20}
              color={COLORS.white}
            />

            <Text
              style={styles.actionText}>
              {comments.length}
            </Text>
          </TouchableOpacity>

          {/* Share */}
          <TouchableOpacity
            style={styles.actionButton}>

            <Icon
              name="share"
              size={21}
              color={COLORS.white}
            />

            <Text
              style={styles.actionText}>
              {t('share')}
            </Text>
          </TouchableOpacity>

          {/* Bookmark */}
          <TouchableOpacity
            style={styles.bookmarkButton}>

            <Icon
              name="bookmark"
              size={21}
              color={COLORS.white}
            />
          </TouchableOpacity>

        </View>
      </View>

      {/* Comments Header */}
      <View style={styles.commentsHeader}>
        <Text style={styles.commentsTitle}>
          {t('comments')}
        </Text>

        <Text style={styles.commentsCount}>
          {comments.length}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* <Header title={'Discussion'} onPress={() => navigation.goBack()} /> */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image style={styles.backIcon} source={backArrow} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('discussion')}</Text>
      </View>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={
          Platform.OS === 'ios'
            ? 'padding'
            : undefined
        }
        keyboardVerticalOffset={
          Platform.OS === 'ios'
            ? 90
            : 0
        }>

        <FlatList
          data={comments}
          keyExtractor={item => item.id}
          renderItem={renderComment}
          ListHeaderComponent={Header}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            styles.listContent
          }
        />

        {/* Reply Box */}
        <View style={styles.replyContainer}>

          <Image
            source={{
              uri: 'https://i.pravatar.cc/150?img=11',
            }}
            style={styles.replyAvatar}
          />

          <View
            style={styles.replyInputContainer}>

            <TextInput
              value={reply}
              onChangeText={setReply}
              placeholder="Write a reply..."
              placeholderTextColor="#999"
              style={styles.replyInput}
              multiline
            />

            <TouchableOpacity
              style={[
                styles.sendButton,
                !reply.trim() &&
                  styles.sendButtonDisabled,
              ]}
              disabled={!reply.trim()}
              onPress={handleReply}>

              <Icon
                name="send"
                size={18}
                color="#FFF"
              />

            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default PostDetailsScreen;


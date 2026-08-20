// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   SafeAreaView,
//   TouchableOpacity,
//   TextInput,
//   Image,
//   FlatList,
//   KeyboardAvoidingView,
//   Platform,
//   StatusBar,
// } from 'react-native';

// import Icon from '../../components/Icon';

// const defaultPost = {
//   id: '1',
//   user: 'Sarah Johnson',
//   time: '15 min ago',
//   avatar: 'https://i.pravatar.cc/150?img=47',
//   category: 'Nutrition',
//   title: 'What are some healthy breakfast ideas?',
//   description:
//     'I am trying to improve my breakfast routine. What healthy and easy breakfast options do you recommend?',
//   likes: 24,
//   comments: 3,
//   liked: false,
// };

// const initialComments = [
//   {
//     id: '1',
//     user: 'Emily Davis',
//     avatar: 'https://i.pravatar.cc/150?img=32',
//     time: '10 min ago',
//     comment:
//       'Overnight oats with fruits and nuts are really easy to prepare and very filling!',
//     likes: 5,
//     liked: false,
//   },
//   {
//     id: '2',
//     user: 'Michael Brown',
//     avatar: 'https://i.pravatar.cc/150?img=12',
//     time: '7 min ago',
//     comment:
//       'I usually have eggs, whole grain toast and some fruit. It keeps me full for a long time.',
//     likes: 3,
//     liked: false,
//   },
//   {
//     id: '3',
//     user: 'David Wilson',
//     avatar: 'https://i.pravatar.cc/150?img=13',
//     time: '3 min ago',
//     comment:
//       'Greek yogurt with berries and almonds is another great option.',
//     likes: 7,
//     liked: true,
//   },
// ];

// const PostDetailsScreen = ({route, navigation}) => {
//   const post = route?.params?.post || defaultPost;

//   const [liked, setLiked] = useState(
//     post.liked || false,
//   );

//   const [likes, setLikes] = useState(
//     post.likes || 0,
//   );

//   const [reply, setReply] = useState('');

//   const [comments, setComments] =
//     useState(initialComments);

//   const handleLike = () => {
//     setLiked(!liked);

//     setLikes(prev =>
//       liked ? prev - 1 : prev + 1,
//     );
//   };

//   const handleCommentLike = id => {
//     setComments(prev =>
//       prev.map(item =>
//         item.id === id
//           ? {
//               ...item,
//               liked: !item.liked,
//               likes: item.liked
//                 ? item.likes - 1
//                 : item.likes + 1,
//             }
//           : item,
//       ),
//     );
//   };

//   const handleReply = () => {
//     if (!reply.trim()) {
//       return;
//     }

//     const newComment = {
//       id: Date.now().toString(),
//       user: 'You',
//       avatar:
//         'https://i.pravatar.cc/150?img=11',
//       time: 'Just now',
//       comment: reply.trim(),
//       likes: 0,
//       liked: false,
//     };

//     setComments(prev => [
//       newComment,
//       ...prev,
//     ]);

//     setReply('');
//   };

//   const renderComment = ({item}) => (
//     <View style={styles.commentContainer}>
//       <Image
//         source={{uri: item.avatar}}
//         style={styles.commentAvatar}
//       />

//       <View style={styles.commentContent}>
//         <View style={styles.commentHeader}>
//           <View>
//             <Text style={styles.commentUser}>
//               {item.user}
//             </Text>

//             <Text style={styles.commentTime}>
//               {item.time}
//             </Text>
//           </View>

//           <TouchableOpacity>
//             <Icon
//               name="more"
//               size={18}
//               color="#999"
//             />
//           </TouchableOpacity>
//         </View>

//         <Text style={styles.commentText}>
//           {item.comment}
//         </Text>

//         <View style={styles.commentActions}>
//           <TouchableOpacity
//             style={styles.commentAction}
//             onPress={() =>
//               handleCommentLike(item.id)
//             }>

//             <Icon
//               name={
//                 item.liked
//                   ? 'heart'
//                   : 'heartOutline'
//               }
//               size={17}
//               color={
//                 item.liked
//                   ? '#E53935'
//                   : '#777'
//               }
//             />

//             <Text
//               style={[
//                 styles.commentActionText,
//                 item.liked &&
//                   styles.commentLikedText,
//               ]}>
//               {item.likes}
//             </Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={styles.replyAction}>

//             <Icon
//               name="reply"
//               size={16}
//               color="#777"
//             />

//             <Text
//               style={styles.commentActionText}>
//               Reply
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );

//   const Header = () => (
//     <View>

//       {/* Post Card */}
//       <View style={styles.postCard}>

//         {/* User */}
//         <View style={styles.userRow}>
//           <Image
//             source={{uri: post.avatar}}
//             style={styles.avatar}
//           />

//           <View style={styles.userInfo}>
//             <Text style={styles.userName}>
//               {post.user}
//             </Text>

//             <Text style={styles.postTime}>
//               {post.time}
//             </Text>
//           </View>

//           <TouchableOpacity>
//             <Icon
//               name="more"
//               size={21}
//               color="#777"
//             />
//           </TouchableOpacity>
//         </View>

//         {/* Category */}
//         <View style={styles.categoryBadge}>
//           <Text style={styles.categoryText}>
//             {post.category}
//           </Text>
//         </View>

//         {/* Title */}
//         <Text style={styles.postTitle}>
//           {post.title}
//         </Text>

//         {/* Description */}
//         <Text style={styles.postDescription}>
//           {post.description}
//         </Text>

//         {/* Optional Image */}
//         {post.image && (
//           <Image
//             source={{uri: post.image}}
//             style={styles.postImage}
//           />
//         )}

//         {/* Actions */}
//         <View style={styles.actionsContainer}>

//           {/* Like */}
//           <TouchableOpacity
//             style={styles.actionButton}
//             onPress={handleLike}>

//             <Icon
//               name={
//                 liked
//                   ? 'heart'
//                   : 'heartOutline'
//               }
//               size={22}
//               color={
//                 liked
//                   ? '#E53935'
//                   : '#666'
//               }
//             />

//             <Text
//               style={[
//                 styles.actionText,
//                 liked &&
//                   styles.likedText,
//               ]}>
//               {likes}
//             </Text>
//           </TouchableOpacity>

//           {/* Comments */}
//           <TouchableOpacity
//             style={styles.actionButton}>

//             <Icon
//               name="comment"
//               size={20}
//               color="#666"
//             />

//             <Text
//               style={styles.actionText}>
//               {comments.length}
//             </Text>
//           </TouchableOpacity>

//           {/* Share */}
//           <TouchableOpacity
//             style={styles.actionButton}>

//             <Icon
//               name="share"
//               size={21}
//               color="#666"
//             />

//             <Text
//               style={styles.actionText}>
//               Share
//             </Text>
//           </TouchableOpacity>

//           {/* Bookmark */}
//           <TouchableOpacity
//             style={styles.bookmarkButton}>

//             <Icon
//               name="bookmark"
//               size={21}
//               color="#666"
//             />
//           </TouchableOpacity>

//         </View>
//       </View>

//       {/* Comments Header */}
//       <View style={styles.commentsHeader}>
//         <Text style={styles.commentsTitle}>
//           Comments
//         </Text>

//         <Text style={styles.commentsCount}>
//           {comments.length}
//         </Text>
//       </View>
//     </View>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar
//         barStyle="dark-content"
//         backgroundColor="#F8FAF8"
//       />

//       {/* Header */}
//       <View style={styles.header}>

//         <TouchableOpacity
//           style={styles.backButton}
//           onPress={() =>
//             navigation?.goBack?.()
//           }>

//           <Icon
//             name="back"
//             size={30}
//             color="#222"
//           />
//         </TouchableOpacity>

//         <Text style={styles.headerTitle}>
//           Discussion
//         </Text>

//         <TouchableOpacity
//           style={styles.headerMore}>

//           <Icon
//             name="more"
//             size={21}
//             color="#555"
//           />
//         </TouchableOpacity>
//       </View>

//       <KeyboardAvoidingView
//         style={styles.flex}
//         behavior={
//           Platform.OS === 'ios'
//             ? 'padding'
//             : undefined
//         }
//         keyboardVerticalOffset={
//           Platform.OS === 'ios'
//             ? 90
//             : 0
//         }>

//         <FlatList
//           data={comments}
//           keyExtractor={item => item.id}
//           renderItem={renderComment}
//           ListHeaderComponent={Header}
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={
//             styles.listContent
//           }
//         />

//         {/* Reply Box */}
//         <View style={styles.replyContainer}>

//           <Image
//             source={{
//               uri: 'https://i.pravatar.cc/150?img=11',
//             }}
//             style={styles.replyAvatar}
//           />

//           <View
//             style={styles.replyInputContainer}>

//             <TextInput
//               value={reply}
//               onChangeText={setReply}
//               placeholder="Write a reply..."
//               placeholderTextColor="#999"
//               style={styles.replyInput}
//               multiline
//             />

//             <TouchableOpacity
//               style={[
//                 styles.sendButton,
//                 !reply.trim() &&
//                   styles.sendButtonDisabled,
//               ]}
//               disabled={!reply.trim()}
//               onPress={handleReply}>

//               <Icon
//                 name="send"
//                 size={18}
//                 color="#FFF"
//               />

//             </TouchableOpacity>
//           </View>
//         </View>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// export default PostDetailsScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F8FAF8',
//   },

//   flex: {
//     flex: 1,
//   },

//   header: {
//     height: 62,
//     paddingHorizontal: 16,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },

//   backButton: {
//     width: 42,
//     height: 42,
//     borderRadius: 21,
//     backgroundColor: '#FFF',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },

//   headerTitle: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: '#222',
//   },

//   headerMore: {
//     width: 42,
//     height: 42,
//     borderRadius: 21,
//     backgroundColor: '#FFF',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },

//   listContent: {
//     paddingHorizontal: 16,
//     paddingBottom: 20,
//   },

//   postCard: {
//     backgroundColor: '#FFF',
//     borderRadius: 18,
//     padding: 16,
//     borderWidth: 1,
//     borderColor: '#EDEDED',
//     marginBottom: 20,
//   },

//   userRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },

//   avatar: {
//     width: 46,
//     height: 46,
//     borderRadius: 23,
//   },

//   userInfo: {
//     flex: 1,
//     marginLeft: 11,
//   },

//   userName: {
//     fontSize: 14,
//     fontWeight: '700',
//     color: '#222',
//   },

//   postTime: {
//     fontSize: 11,
//     color: '#999',
//     marginTop: 3,
//   },

//   categoryBadge: {
//     alignSelf: 'flex-start',
//     backgroundColor: '#EAF6EA',
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     borderRadius: 8,
//     marginTop: 15,
//   },

//   categoryText: {
//     fontSize: 11,
//     color: '#4CAF50',
//     fontWeight: '600',
//   },

//   postTitle: {
//     fontSize: 20,
//     lineHeight: 27,
//     fontWeight: '700',
//     color: '#222',
//     marginTop: 12,
//   },

//   postDescription: {
//     fontSize: 14,
//     color: '#666',
//     lineHeight: 22,
//     marginTop: 9,
//   },

//   postImage: {
//     width: '100%',
//     height: 210,
//     borderRadius: 14,
//     marginTop: 15,
//   },

//   actionsContainer: {
//     borderTopWidth: 1,
//     borderTopColor: '#F0F0F0',
//     marginTop: 16,
//     paddingTop: 14,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },

//   actionButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginRight: 25,
//   },

//   actionText: {
//     marginLeft: 6,
//     fontSize: 12,
//     color: '#666',
//   },

//   likedText: {
//     color: '#E53935',
//   },

//   bookmarkButton: {
//     marginLeft: 'auto',
//   },

//   commentsHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 13,
//   },

//   commentsTitle: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: '#222',
//   },

//   commentsCount: {
//     marginLeft: 7,
//     backgroundColor: '#EAF6EA',
//     color: '#4CAF50',
//     fontSize: 11,
//     fontWeight: '700',
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 10,
//     overflow: 'hidden',
//   },

//   commentContainer: {
//     flexDirection: 'row',
//     marginBottom: 18,
//   },

//   commentAvatar: {
//     width: 38,
//     height: 38,
//     borderRadius: 19,
//   },

//   commentContent: {
//     flex: 1,
//     marginLeft: 10,
//     backgroundColor: '#FFF',
//     borderRadius: 14,
//     padding: 12,
//   },

//   commentHeader: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//     justifyContent: 'space-between',
//   },

//   commentUser: {
//     fontSize: 13,
//     fontWeight: '700',
//     color: '#333',
//   },

//   commentTime: {
//     fontSize: 10,
//     color: '#999',
//     marginTop: 2,
//   },

//   commentText: {
//     fontSize: 13,
//     lineHeight: 19,
//     color: '#666',
//     marginTop: 9,
//   },

//   commentActions: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 10,
//   },

//   commentAction: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },

//   replyAction: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginLeft: 20,
//   },

//   commentActionText: {
//     fontSize: 11,
//     color: '#777',
//     marginLeft: 5,
//   },

//   commentLikedText: {
//     color: '#E53935',
//   },

//   replyContainer: {
//     backgroundColor: '#FFF',
//     borderTopWidth: 1,
//     borderTopColor: '#E8E8E8',
//     paddingHorizontal: 12,
//     paddingVertical: 10,
//     flexDirection: 'row',
//     alignItems: 'flex-end',
//   },

//   replyAvatar: {
//     width: 36,
//     height: 36,
//     borderRadius: 18,
//     marginBottom: 4,
//   },

//   replyInputContainer: {
//     flex: 1,
//     minHeight: 43,
//     maxHeight: 110,
//     marginLeft: 9,
//     borderRadius: 22,
//     backgroundColor: '#F5F7F5',
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingLeft: 15,
//     paddingRight: 5,
//   },

//   replyInput: {
//     flex: 1,
//     fontSize: 13,
//     color: '#222',
//     maxHeight: 90,
//     paddingVertical: 9,
//   },

//   sendButton: {
//     width: 35,
//     height: 35,
//     borderRadius: 18,
//     backgroundColor: '#4CAF50',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },

//   sendButtonDisabled: {
//     backgroundColor: '#B8D5B8',
//   },
// });


import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
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

const PostDetailsScreen = ({route, navigation}) => {
  const orientation = useOrientation();
  const isPortrait = orientation === 'portrait';
  const styles = isPortrait ? portraitStyles : landscapeStyles;
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerView}>
        <Header title={'Community Post Details'} onPress={() => navigation.goBack()} />
      </View>
    </SafeAreaView>
  );
};

export default PostDetailsScreen;

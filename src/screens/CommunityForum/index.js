// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   SafeAreaView,
//   FlatList,
//   TouchableOpacity,
//   TextInput,
//   Image,
//   StatusBar,
// } from 'react-native';
// import Icon from '../../components/Icon';
// import { portraitStyles, landscapeStyles } from './styles';
// import useOrientation from '../../components/OrientationComponent';
// import { COLORS } from '../../utils';
// import Header from '../../components/HeaderComponent';
// import { useTranslation } from 'react-i18next';
// import down from '../../images/down.png';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';

// const categories = [
//   'All',
//   'Nutrition',
//   'Fitness',
//   'Mental Health',
//   'Weight Loss',
//   'Sleep',
// ];

// const posts = [
//   {
//     id: '1',
//     user: 'Sarah Johnson',
//     time: '15 min ago',
//     avatar: 'https://i.pravatar.cc/150?img=47',
//     category: 'Nutrition',
//     title: 'What are some healthy breakfast ideas?',
//     description:
//       'I am trying to improve my breakfast routine. What healthy and easy breakfast options do you recommend?',
//     likes: 24,
//     comments: 8,
//     liked: false,
//     pinned: true,
//   },
//   {
//     id: '2',
//     user: 'Michael Brown',
//     time: '1 hour ago',
//     avatar: 'https://i.pravatar.cc/150?img=12',
//     category: 'Fitness',
//     title: 'Best exercises for beginners?',
//     description:
//       'I am just starting my fitness journey. Which exercises would you recommend for someone who is completely new?',
//     likes: 42,
//     comments: 15,
//     liked: true,
//     pinned: false,
//   },
//   {
//     id: '3',
//     user: 'Emily Davis',
//     time: '3 hours ago',
//     avatar: 'https://i.pravatar.cc/150?img=32',
//     category: 'Mental Health',
//     title: 'How do you manage stress during work?',
//     description:
//       'Work has been quite stressful lately. Would love to hear what everyone does to relax and manage stress.',
//     likes: 36,
//     comments: 19,
//     liked: false,
//     pinned: false,
//   },
//   {
//     id: '4',
//     user: 'David Wilson',
//     time: '5 hours ago',
//     avatar: 'https://i.pravatar.cc/150?img=13',
//     category: 'Weight Loss',
//     title: 'My 30-day weight loss progress',
//     description:
//       'Sharing my progress after following a consistent diet and workout routine for the past month.',
//     likes: 67,
//     comments: 21,
//     liked: false,
//     pinned: false,
//   },
// ];

// const CommunityForum = ({navigation}) => {
//   const orientation = useOrientation();
//   const isPortrait = orientation === 'portrait';
//   const styles = isPortrait ? portraitStyles : landscapeStyles;
//   const insets = useSafeAreaInsets();
//   const { t } = useTranslation();
//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [search, setSearch] = useState('');
//   const [postList, setPostList] = useState(posts);

//   const filteredPosts = postList.filter(item => {
//     const categoryMatch =
//       selectedCategory === 'All' ||
//       item.category === selectedCategory;

//     const searchMatch =
//       item.title.toLowerCase().includes(search.toLowerCase()) ||
//       item.description.toLowerCase().includes(search.toLowerCase());

//     return categoryMatch && searchMatch;
//   });

//   const toggleLike = id => {
//     setPostList(prev =>
//       prev.map(item =>
//         item.id === id
//           ? {
//               ...item,
//               liked: !item.liked,
//               likes: item.liked ? item.likes - 1 : item.likes + 1,
//             }
//           : item,
//       ),
//     );
//   };

//   const renderPost = ({item}) => {
//     return (
//       <TouchableOpacity
//         activeOpacity={0.9}
//         style={styles.postCard}
//         onPress={() => navigation.navigate('PostDetailsScreen', {post: item})}>

//         {/* {item.pinned && (
//           <View style={styles.pinnedContainer}>
//             <Text style={styles.pinnedText}>Pinned Post</Text>
//           </View>
//         )} */}

//         <View style={styles.userRow}>
//           <Image
//             source={{uri: item.avatar}}
//             style={styles.avatar}
//           />

//           <View style={styles.userInfo}>
//             <Text style={styles.userName}>{item.user}</Text>
//             <Text style={styles.postTime}>{item.time}</Text>
//           </View>

//           <TouchableOpacity style={styles.moreButton}>
//             <Icon
//               name="ellipsis-horizontal"
//               size={21}
//               color={COLORS.white}
//             />
//           </TouchableOpacity>
//         </View>

//         <View style={styles.categoryBadge}>
//           <Text style={styles.categoryBadgeText}>
//             {item.category}
//           </Text>
//         </View>

//         <Text style={styles.postTitle}>{item.title}</Text>

//         <Text
//           style={styles.postDescription}
//           numberOfLines={3}>
//           {item.description}
//         </Text>

//         <View style={styles.separator} />

//         <View style={styles.actionsRow}>
//           <TouchableOpacity
//             style={styles.actionButton}
//             onPress={() => toggleLike(item.id)}>
//             <Icon
//               name={item.liked ? 'heart' : 'heart-outline'}
//               size={21}
//               color={item.liked ? COLORS.subPrimary : COLORS.white}
//             />
//             <Text
//               style={[
//                 styles.actionText,
//                 item.liked && styles.likedText,
//               ]}>
//               {item.likes}
//             </Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.actionButton}>
//             <Icon
//               name="chatbubble-outline"
//               size={20}
//               color={COLORS.white}
//             />
//             <Text style={styles.actionText}>
//               {item.comments}
//             </Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.actionButton}>
//             <Icon
//               name="share-social-outline"
//               size={21}
//               color={COLORS.white}
//             />
//             <Text style={styles.actionText}>{t('share')}</Text>
//           </TouchableOpacity>
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   const ListHeader = () => (
//     <View>
//       {/* Header */}
//       {/* <View style={styles.header}>
//         <View>
//           <Text style={styles.headerTitle}>Community</Text>
//           <Text style={styles.headerSubtitle}>
//             Connect, share & grow together
//           </Text>
//         </View>

//         <TouchableOpacity style={styles.notificationButton}>
//           <Icon
//             name="notifications"
//             size={23}
//             color={COLORS.white}
//           />
//           <View style={styles.notificationDot} />
//         </TouchableOpacity>
//       </View> */}
      

//       {/* Search */}
//       <View style={styles.searchContainer}>
//         <Icon
//           name="search"
//           size={21}
//           color={COLORS.white}
//         />

//         <TextInput
//           value={search}
//           onChangeText={setSearch}
//           placeholder="Search discussions..."
//           placeholderTextColor="#999"
//           style={styles.searchInput}
//         />

//         {search.length > 0 && (
//           <TouchableOpacity onPress={() => setSearch('')}>
//             <Icon
//               name="close"
//               size={20}
//               color={COLORS.white}
//             />
//           </TouchableOpacity>
//         )}
//       </View>

//       {/* Categories */}
//       <FlatList
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         data={categories}
//         keyExtractor={item => item}
//         contentContainerStyle={styles.categoryList}
//         renderItem={({item}) => (
//           <TouchableOpacity
//             onPress={() => setSelectedCategory(item)}
//             style={[
//               styles.categoryChip,
//               selectedCategory === item &&
//                 styles.activeCategoryChip,
//             ]}>
//             <Text
//               style={[
//                 styles.categoryText,
//                 selectedCategory === item &&
//                   styles.activeCategoryText,
//               ]}>
//               {item}
//             </Text>
//           </TouchableOpacity>
//         )}
//       />

//       {/* Community Stats */}
//       {/* <View style={styles.statsCard}>
//         <View style={styles.statItem}>
//           <Text style={styles.statNumber}>12.5K</Text>
//           <Text style={styles.statLabel}>Members</Text>
//         </View>

//         <View style={styles.statDivider} />

//         <View style={styles.statItem}>
//           <Text style={styles.statNumber}>2.8K</Text>
//           <Text style={styles.statLabel}>Discussions</Text>
//         </View>

//         <View style={styles.statDivider} />

//         <View style={styles.statItem}>
//           <Text style={styles.statNumber}>856</Text>
//           <Text style={styles.statLabel}>Today</Text>
//         </View>
//       </View> */}

//       {/* Section Header */}
//       <View style={styles.sectionHeader}>
//         <Text style={styles.sectionTitle}>
//           Community Discussions
//         </Text>

//         <TouchableOpacity>
//           <Text style={styles.viewAllText}>View All</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <View
//         style={{
//           width: '100%',
//           paddingTop: insets.top,
//           backgroundColor: COLORS.primary,
//         }}
//       />
//       <View style={styles.headerView}>
//         <Header title={t('community_forum')} onPress={() => navigation.goBack()} />
//       </View>
//       <FlatList
//         data={filteredPosts}
//         keyExtractor={item => item.id}
//         renderItem={renderPost}
//         ListHeaderComponent={ListHeader}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.content}
//         ListEmptyComponent={
//           <View style={styles.emptyContainer}>
//             <Icon
//               name="chatbubbles-outline"
//               size={55}
//               color={COLORS.white}
//             />

//             <Text style={styles.emptyTitle}>
//               {t('no_discussion_found')}
//             </Text>

//             <Text style={styles.emptyText}>
//               {t('try_another_search')}
//             </Text>
//           </View>
//         }
//       />

//       {/* Floating Create Post Button */}
//       <TouchableOpacity
//         style={styles.createPostButton}
//         activeOpacity={0.85}
//         onPress={() =>
//           navigation.navigate('CreatePostScreen')
//         }>
//         <Icon
//           name="add"
//           size={27}
//           color={COLORS.white}
//         />
//         <Text style={styles.createPostText}>
//           {t('create_post')}
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default CommunityForum;



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

const categories = [
  'All',
  'Nutrition',
  'Fitness',
  'Mental Health',
  'Weight Loss',
  'Sleep',
];

// const posts = [
//   {
//     id: '1',
//     user: 'Sarah Johnson',
//     time: '15 min ago',
//     avatar: 'https://i.pravatar.cc/150?img=47',
//     category: 'Nutrition',
//     title: 'What are some healthy breakfast ideas?',
//     description:
//       'I am trying to improve my breakfast routine. What healthy and easy breakfast options do you recommend?',
//     likes: 24,
//     comments: 8,
//     liked: false,
//     pinned: true,
//   },
//   {
//     id: '2',
//     user: 'Michael Brown',
//     time: '1 hour ago',
//     avatar: 'https://i.pravatar.cc/150?img=12',
//     category: 'Fitness',
//     title: 'Best exercises for beginners?',
//     description:
//       'I am just starting my fitness journey. Which exercises would you recommend for someone who is completely new?',
//     likes: 42,
//     comments: 15,
//     liked: true,
//     pinned: false,
//   },
//   {
//     id: '3',
//     user: 'Emily Davis',
//     time: '3 hours ago',
//     avatar: 'https://i.pravatar.cc/150?img=32',
//     category: 'Mental Health',
//     title: 'How do you manage stress during work?',
//     description:
//       'Work has been quite stressful lately. Would love to hear what everyone does to relax and manage stress.',
//     likes: 36,
//     comments: 19,
//     liked: false,
//     pinned: false,
//   },
//   {
//     id: '4',
//     user: 'David Wilson',
//     time: '5 hours ago',
//     avatar: 'https://i.pravatar.cc/150?img=13',
//     category: 'Weight Loss',
//     title: 'My 30-day weight loss progress',
//     description:
//       'Sharing my progress after following a consistent diet and workout routine for the past month.',
//     likes: 67,
//     comments: 21,
//     liked: false,
//     pinned: false,
//   },
// ];

const posts = [
  {
    id: '1',
    user: 'Nutrition Support Group',
    time: '12:45 AM',
    avatar: 'https://i.pravatar.cc/150?img=47',
    category: 'Nutrition',
    title: 'What are some healthy breakfast ideas?',
    description:
      'I am trying to improve my breakfast routine. What healthy and easy breakfast options do you recommend?',
    likes: 24,
    comments: 8,
    liked: false,
    pinned: true,
  },
];

const CommunityForum = ({navigation}) => {
  const orientation = useOrientation();
  const isPortrait = orientation === 'portrait';
  const styles = isPortrait ? portraitStyles : landscapeStyles;
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [postList, setPostList] = useState(posts);

  const filteredPosts = postList.filter(item => {
    const categoryMatch =
      selectedCategory === 'All' ||
      item.category === selectedCategory;

    const searchMatch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase());

    return categoryMatch && searchMatch;
  });

  const renderPost = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.postCard}
        onPress={() => navigation.navigate('MessageScreen')}>
        <View style={styles.userRow}>
          {/* <Image
            source={{uri: item.avatar}}
            style={styles.avatar}
          /> */}
          {item?.groupImage ? (
            <Image
              source={{uri: item?.groupImage}}
              style={styles.groupImage}
            />
          ) : (
            <View style={styles.groupImagePlaceholder}>
              <Text style={styles.groupImageText}>
                {item.user
                  ?.charAt(0)
                  ?.toUpperCase()}
              </Text>
            </View>
          )}
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{item.user}</Text>
            <Text style={styles.postTime}>user1 - i have one question.</Text>
          </View>
          <Text style={styles.postTime}>{item.time}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          width: '100%',
          paddingTop: insets.top,
          backgroundColor: COLORS.primary,
        }}
      />
      <View style={styles.headerView}>
        <Header title={t('community_forum')} onPress={() => navigation.goBack()} />
      </View>
      <FlatList
        data={filteredPosts}
        keyExtractor={item => item.id}
        renderItem={renderPost}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon
              name="chatbubbles-outline"
              size={55}
              color={COLORS.white}
            />
            <Text style={styles.emptyTitle}>
              {t('no_discussion_found')}
            </Text>
            <Text style={styles.emptyText}>
              {t('try_another_search')}
            </Text>
          </View>
        }
      />
      <TouchableOpacity
        style={styles.createPostButton}
        activeOpacity={0.85}
        onPress={() =>
          navigation.navigate('CreateGroupScreen')
        }>
        <Icon
          name="add"
          size={27}
          color={COLORS.white}
        />
        <Text style={styles.createPostText}>
          {t('create_post')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CommunityForum;
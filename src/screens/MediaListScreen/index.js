import React, {useMemo, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
  Linking,
  Alert,
} from 'react-native';
import {
  portraitStyles,
  landscapeStyles,
} from './styles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import useOrientation from '../../components/OrientationComponent';
import Icon from '../../components/Icon';
import {useTranslation} from 'react-i18next';
import {COLORS} from '../../utils/index';
import {hp, wp, normalize} from '../../components/responsive';
import backArrow from '../../images/backArrow.png';

const TABS = {
  MEDIA: 'Media',
  LINKS: 'Links',
  DOCUMENTS: 'Documents',
};

const MEDIA_DATA = [
  {
    id: '1',
    type: 'image',
    uri: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
  },
  {
    id: '2',
    type: 'image',
    uri: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
  },
  {
    id: '3',
    type: 'image',
    uri: 'https://images.unsplash.com/photo-1556761175-b413da4baf72',
  },
  {
    id: '4',
    type: 'image',
    uri: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902',
  },
  {
    id: '5',
    type: 'image',
    uri: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4',
  },
  {
    id: '6',
    type: 'image',
    uri: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f',
  },
  {
    id: '7',
    type: 'image',
    uri: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0',
  },
  {
    id: '8',
    type: 'video',
    uri: 'https://images.unsplash.com/photo-1492724441997-5dc865305da7',
  },
  {
    id: '9',
    type: 'image',
    uri: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c',
  },
  {
    id: '10',
    type: 'image',
    uri: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36',
  },
  {
    id: '11',
    type: 'image',
    uri: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72',
  },
  {
    id: '12',
    type: 'image',
    uri: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7',
  },
];

const LINKS_DATA = [
  {
    id: '1',
    title: 'React Native Documentation',
    url: 'https://reactnative.dev/',
    sender: 'Yash',
    date: 'Today, 10:25 AM',
  },
  {
    id: '2',
    title: 'Community Health & Wellness',
    url: 'https://example.com/wellness',
    sender: 'John',
    date: 'Yesterday, 4:15 PM',
  },
  {
    id: '3',
    title: 'Nutrition Guide',
    url: 'https://example.com/nutrition',
    sender: 'Sarah',
    date: 'Aug 28, 2026',
  },
  {
    id: '4',
    title: 'Weekly Exercise Plan',
    url: 'https://example.com/exercise',
    sender: 'Mike',
    date: 'Aug 25, 2026',
  },
];

const DOCUMENTS_DATA = [
  {
    id: '1',
    name: 'Community Guidelines.pdf',
    size: '2.4 MB',
    sender: 'Yash',
    date: 'Today, 11:30 AM',
    extension: 'PDF',
  },
  {
    id: '2',
    name: 'Weekly Health Plan.docx',
    size: '1.8 MB',
    sender: 'Sarah',
    date: 'Yesterday, 2:20 PM',
    extension: 'DOC',
  },
  {
    id: '3',
    name: 'Nutrition Guide.pdf',
    size: '4.2 MB',
    sender: 'John',
    date: 'Aug 28, 2026',
    extension: 'PDF',
  },
  {
    id: '4',
    name: 'Exercise Schedule.xlsx',
    size: '856 KB',
    sender: 'Mike',
    date: 'Aug 25, 2026',
    extension: 'XLS',
  },
];

const MediaListScreen = ({navigation, route}) => {
  const insets = useSafeAreaInsets();
  const orientation = useOrientation();
  const isPortrait = orientation === 'portrait';
  const styles = isPortrait ? portraitStyles : landscapeStyles;
  const {t} = useTranslation();
  const [activeTab, setActiveTab] = useState(TABS.MEDIA);

  const groupName = route?.params?.groupName || 'Community Group';

  const renderMediaItem = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={[
          styles.mediaItem,
          index % 3 === 1 && styles.mediaMiddleItem,
        ]}
        onPress={() => {
          Alert.alert('Media', `Open ${item.type}`);
        }}>
        <Image
          source={{uri: item.uri}}
          style={styles.mediaImage}
          resizeMode="cover"
        />

        {item.type === 'video' && (
          <View style={styles.videoOverlay}>
            <View style={styles.playCircle}>
              <Icon
                name="play"
                size={16}
                color={COLORS.white}
              />
            </View>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const renderLinkItem = ({item}) => {
    const openLink = async () => {
      try {
        await Linking.openURL(item.url);
      } catch (error) {
        Alert.alert('Error', 'Unable to open this link.');
      }
    };

    return (
      <TouchableOpacity
        activeOpacity={0.75}
        style={styles.linkRow}
        onPress={openLink}>

        <View style={styles.linkIconContainer}>
          <Icon
            name="link"
            size={22}
            color={COLORS.white}
          />
        </View>

        <View style={styles.linkContent}>
          <Text
            style={styles.linkTitle}
            numberOfLines={1}>
            {item.title}
          </Text>

          <Text
            style={styles.linkUrl}
            numberOfLines={1}>
            {item.url}
          </Text>

          <Text style={styles.linkMeta}>
            {item.sender} • {item.date}
          </Text>
        </View>

        <Icon
          name="externalLink"
          size={20}
          color={COLORS.white}
        />
      </TouchableOpacity>
    );
  };

  const renderDocumentItem = ({item}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.75}
        style={styles.documentRow}
        onPress={() => {
          Alert.alert(
            'Document',
            `Open ${item.name}`,
          );
        }}>

        <View style={styles.documentIconContainer}>
          <Icon
            name="document"
            size={24}
            color={COLORS.white}
          />
        </View>

        <View style={styles.documentContent}>
          <Text
            style={styles.documentName}
            numberOfLines={1}>
            {item.name}
          </Text>

          <Text style={styles.documentMeta}>
            {item.extension} • {item.size}
          </Text>

          <Text style={styles.documentSender}>
            {item.sender} • {item.date}
          </Text>
        </View>

        <Icon
          name="download"
          size={22}
          color={COLORS.white}
        />
      </TouchableOpacity>
    );
  };

  const renderContent = () => {
    if (activeTab === TABS.MEDIA) {
      return (
        <FlatList
          key="media-list"
          data={MEDIA_DATA}
          keyExtractor={item => item.id}
          renderItem={renderMediaItem}
          numColumns={3}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.mediaList}
          columnWrapperStyle={styles.mediaRow}
        />
      );
    }

    if (activeTab === TABS.LINKS) {
      return (
        <FlatList
          key="links-list"
          data={LINKS_DATA}
          keyExtractor={item => item.id}
          renderItem={renderLinkItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      );
    }

    return (
      <FlatList
        key="documents-list"
        data={DOCUMENTS_DATA}
        keyExtractor={item => item.id}
        renderItem={renderDocumentItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    );
  };

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        {
          paddingTop: insets.top,
        },
      ]}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Image
            source={backArrow}
            style={styles.backArrow}
          />
        </TouchableOpacity>

        <View style={styles.headerContent}>
          <Text
            style={styles.headerTitle}
            numberOfLines={1}>
            Media, Links & Documents
          </Text>

          <Text style={styles.headerSubtitle}>
            {groupName}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.headerAction}
          onPress={() => {
            Alert.alert('Search', 'Search media');
          }}>
          <Icon
            name="search"
            size={28}
            color={COLORS.white}
          />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[
            styles.tab,
            activeTab === TABS.MEDIA && styles.activeTab,
          ]}
          onPress={() => setActiveTab(TABS.MEDIA)}>

          <Icon
            name="image"
            size={19}
            color={
              activeTab === TABS.MEDIA
                ? COLORS.secondary
                : COLORS.white
            }
          />

          <Text
            style={[
              styles.tabText,
              activeTab === TABS.MEDIA &&
                styles.activeTabText,
            ]}>
            Media
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          style={[
            styles.tab,
            activeTab === TABS.LINKS && styles.activeTab,
          ]}
          onPress={() => setActiveTab(TABS.LINKS)}>

          <Icon
            name="link"
            size={19}
            color={
              activeTab === TABS.LINKS
                ? COLORS.secondary
                : COLORS.white
            }
          />

          <Text
            style={[
              styles.tabText,
              activeTab === TABS.LINKS &&
                styles.activeTabText,
            ]}>
            Links
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          style={[
            styles.tab,
            activeTab === TABS.DOCUMENTS &&
              styles.activeTab,
          ]}
          onPress={() =>
            setActiveTab(TABS.DOCUMENTS)
          }>

          <Icon
            name="document"
            size={19}
            color={
              activeTab === TABS.DOCUMENTS
                ? COLORS.secondary
                : COLORS.white
            }
          />

          <Text
            style={[
              styles.tabText,
              activeTab === TABS.DOCUMENTS &&
                styles.activeTabText,
            ]}>
            Documents
          </Text>
        </TouchableOpacity>
      </View>

      {/* Count */}
      <View style={styles.countContainer}>
        <Text style={styles.countText}>
          {activeTab === TABS.MEDIA &&
            `${MEDIA_DATA.length} items`}

          {activeTab === TABS.LINKS &&
            `${LINKS_DATA.length} links`}

          {activeTab === TABS.DOCUMENTS &&
            `${DOCUMENTS_DATA.length} documents`}
        </Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {renderContent()}
      </View>
    </SafeAreaView>
  );
};

export default MediaListScreen;
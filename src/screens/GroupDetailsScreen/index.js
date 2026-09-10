import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
} from 'react-native';
import backArrow from '../../images/backArrow.png';
import exit from '../../images/exit.png';
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

const GroupDetailsScreen = ({navigation, route}) => {
  const orientation = useOrientation();
  const isPortrait = orientation === 'portrait';
  const styles = isPortrait ? portraitStyles : landscapeStyles;
  const insets = useSafeAreaInsets();
  const {t} = useTranslation();
  const group = route?.params || {};
  const groupName = group.groupName || 'Nutrition Support Group';
  const memberCount = group.memberCount || 24;

  const groupImage = group.groupImage || null;

  const [isMuted, setIsMuted] = useState(false);

  const [members] = useState([
    {
      id: '1',
      name: 'You',
      role: 'Member',
      online: true,
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      role: 'Member',
      online: true,
    },
    {
      id: '3',
      name: 'Michael Smith',
      role: 'Member',
      online: false,
    },
    {
      id: '4',
      name: 'Emily Wilson',
      role: 'Member',
      online: true,
    },
    {
      id: '5',
      name: 'David Brown',
      role: 'Member',
      online: false,
    },
  ]);

  const [showAllMembers, setShowAllMembers] =
    useState(false);

  const displayedMembers = showAllMembers
    ? members
    : members.slice(0, 4);

  const handleLeaveGroup = () => {
    Alert.alert(
      'Leave Group',
      'Are you sure you want to leave this group?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Leave',
          style: 'destructive',
          onPress: () => {
            console.log('Leave group');
            navigation.goBack();
          },
        },
      ],
    );
  };

  const renderMember = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.memberRow}
        activeOpacity={0.7}
        onPress={() => {
          console.log(
            'Selected member:',
            item.id,
          );
        }}>

        <View style={styles.memberAvatar}>
          <Text style={styles.memberAvatarText}>
            {item.name
              ?.charAt(0)
              ?.toUpperCase()}
          </Text>

          {item.online && (
            <View style={styles.memberOnlineDot} />
          )}
        </View>

        <View style={styles.memberInfo}>
          <Text
            numberOfLines={1}
            style={styles.memberName}>
            {item.name}
          </Text>

          <Text style={styles.memberRole}>
            {item.role}
          </Text>
        </View>

        {/* {item.role === 'Admin' && (
          <View style={styles.adminBadge}>
            <Text style={styles.adminBadgeText}>
              Admin
            </Text>
          </View>
        )} */}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>

      {/* SAFE AREA */}
      <View
        style={[
          styles.safeArea,
          {
            height: insets.top,
          },
        ]}
      />

      {/* HEADER */}
      <View style={styles.header}>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Image
            source={backArrow}
            style={styles.backArrow}
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Group Info
        </Text>

        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => {
            console.log('Edit group');
          }}>
          <Icon
            name="edit"
            size={21}
            color="#FFFFFF"
          />
        </TouchableOpacity>

      </View>

      <FlatList
        data={displayedMembers}
        keyExtractor={item => item.id}
        renderItem={renderMember}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          styles.contentContainer
        }
        ListHeaderComponent={
          <>
            {/* GROUP PROFILE */}
            <View style={styles.groupProfile}>

              {groupImage ? (
                <Image
                  source={{uri: groupImage}}
                  style={styles.groupImage}
                />
              ) : (
                <View
                  style={
                    styles.groupImagePlaceholder
                  }>
                  <Text
                    style={
                      styles.groupImageText
                    }>
                    {groupName
                      ?.charAt(0)
                      ?.toUpperCase()}
                  </Text>
                </View>
              )}

              <Text style={styles.groupName}>
                {groupName}
              </Text>

              <Text style={styles.groupMembers}>
                {memberCount} members
              </Text>
            </View>

            {/* DESCRIPTION */}
            <View style={styles.card}>

              <Text style={styles.sectionTitle}>
                About Group
              </Text>

              <Text style={styles.description}>
                Welcome to the {groupName}. This
                community is a place where members
                can share healthy lifestyle tips,
                recipes, fitness ideas and support
                each other.
              </Text>

            </View>

            {/* ACTIONS */}
            <View style={styles.card}>

              <TouchableOpacity
                style={styles.actionRow}
                onPress={() => {
                  setIsMuted(!isMuted);
                }}>

                <View
                  style={styles.actionIcon}>
                  <Icon
                    name={
                      isMuted
                        ? 'bell-off'
                        : 'bell'
                    }
                    size={21}
                    color={COLORS.primary}
                  />
                </View>

                <Text style={styles.actionText}>
                  {isMuted
                    ? 'Unmute Notifications'
                    : 'Mute Notifications'}
                </Text>

                <View style={styles.actionArrow}>
                  <Icon
                    name="chevronRight"
                    size={24}
                    color={COLORS.white}
                  />
                </View>
              </TouchableOpacity>

              <View style={styles.divider} />

              <TouchableOpacity
                style={styles.actionRow}
                onPress={() => {
                  navigation.navigate('MediaListScreen', {
                    groupName: group?.name,
                    groupId: group?.id,
                  });
                }}>

                <View
                  style={styles.actionIcon}>
                  <Icon
                    name="image"
                    size={21}
                    color={COLORS.primary}
                  />
                </View>

                <Text style={styles.actionText}>
                  Media, Links & Documents
                </Text>

                <Text style={styles.actionCount}>
                  18
                </Text>

                <Icon
                  name="chevronRight"
                  size={24}
                  color={COLORS.white}
                />
              </TouchableOpacity>

              <View style={styles.divider} />

              <TouchableOpacity
                style={styles.actionRow}
                onPress={() => {
                  console.log('Search clicked');
                }}>

                <View
                  style={styles.actionIcon}>
                  <Icon
                    name="search"
                    size={24}
                    color={COLORS.primary}
                  />
                </View>

                <Text style={styles.actionText}>
                  Search in Conversation
                </Text>

                <Icon
                  name="chevronRight"
                  size={24}
                  color={COLORS.white}
                />
              </TouchableOpacity>

            </View>

            {/* MEMBERS HEADER */}
            <View style={styles.membersHeader}>

              <Text style={styles.sectionTitle}>
                Members
              </Text>

              <Text style={styles.memberTotal}>
                {memberCount}
              </Text>

            </View>

            {/* ADD MEMBER */}
            <TouchableOpacity
              style={styles.addMemberRow}
              onPress={() => {
                console.log('Add member');
              }}>

              <View style={styles.addMemberIcon}>
                <Icon
                  name="add"
                  size={23}
                  color={COLORS.black}
                />
              </View>

              <Text style={styles.addMemberText}>
                Add Members
              </Text>

            </TouchableOpacity>
          </>
        }
        ListFooterComponent={
          <>
            {!showAllMembers &&
              members.length > 4 && (
                <TouchableOpacity
                  style={styles.seeAllButton}
                  onPress={() =>
                    setShowAllMembers(true)
                  }>
                  <Text
                    style={
                      styles.seeAllText
                    }>
                    View All Members
                  </Text>

                  <Icon
                    name="chevronRight"
                    size={24}
                    color={COLORS.white}
                  />
                </TouchableOpacity>
              )}

            {/* LEAVE GROUP */}
            <View style={styles.dangerCard}>

              <TouchableOpacity
                style={styles.leaveRow}
                onPress={handleLeaveGroup}>

                <View
                  style={styles.leaveIcon}>
                  <Image
                    source={exit}
                    style={[styles.backArrow, {tintColor: COLORS.subPrimary}]}
                  />
                </View>

                <Text style={styles.leaveText}>
                  Leave Group
                </Text>

              </TouchableOpacity>

            </View>

            <View
              style={styles.bottomSpace}
            />
          </>
        }
      />
    </View>
  );
};

export default GroupDetailsScreen;

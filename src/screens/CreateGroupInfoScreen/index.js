import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
  Alert,
} from 'react-native';

import ImagePicker from 'react-native-image-crop-picker';
import Icon from '../../components/Icon';
import Header from '../../components/HeaderComponent';
import useOrientation from '../../components/OrientationComponent';
import {portraitStyles, landscapeStyles} from './styles';
import {COLORS} from '../../utils';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {hp, normalize, wp} from '../../components/responsive';

const CreateGroupInfoScreen = ({navigation, route}) => {
  const orientation = useOrientation();
  const isPortrait = orientation === 'portrait';
  const styles = isPortrait ? portraitStyles : landscapeStyles;

  const insets = useSafeAreaInsets();

  const selectedUsers = route?.params?.selectedUsers || [];

  const [groupName, setGroupName] = useState('');
  const [groupImage, setGroupImage] = useState(null);
  const [creating, setCreating] = useState(false);

  const getInitials = name => {
    const parts = name.split(' ').filter(Boolean);

    if (parts.length === 1) {
      return parts[0].charAt(0).toUpperCase();
    }

    return (
      parts[0].charAt(0) +
      parts[parts.length - 1].charAt(0)
    ).toUpperCase();
  };

  const selectGroupImage = async () => {
  try {
    const image = await ImagePicker.openPicker({
      width: 800,
      height: 800,
      cropping: true,
      cropperCircleOverlay: true,
      compressImageQuality: 0.8,
      mediaType: 'photo',
    });

    if (image?.path) {
      setGroupImage(image.path);
    }
  } catch (error) {
    if (error?.code === 'E_PICKER_CANCELLED') {
      return;
    }

    console.log('Image picker error:', error);
  }
};

  const createGroup = async () => {
    const trimmedName = groupName.trim();

    if (!trimmedName) {
      Alert.alert(
        'Group Name',
        'Please enter a group name.',
      );
      return;
    }

    if (selectedUsers.length === 0) {
      Alert.alert(
        'Members',
        'Please select at least one member.',
      );
      return;
    }

    try {
      setCreating(true);

      /*
       * API example:
       *
       * const payload = {
       *   name: trimmedName,
       *   image: groupImage,
       *   members: selectedUsers.map(user => ({
       *     contact_id: user.id,
       *     name: user.name,
       *     phone_number: user.phoneNumber,
       *   })),
       * };
       *
       * const response = await onAddCommonJsonApi(
       *   'community/groups',
       *   payload
       * );
       */

      const createdGroup = {
        groupId: Date.now().toString(),
        groupName: trimmedName,
        groupImage,
        memberCount: selectedUsers.length + 1,
        members: selectedUsers,
      };

      setCreating(false);

      // navigation.reset({
      //   index: 1,
      //   routes: [
      //     {
      //       name: 'CommunityGroupListScreen',
      //     },
      //     {
      //       name: 'MessageScreen',
      //       params: createdGroup,
      //     },
      //   ],
      // });
    } catch (error) {
      setCreating(false);

      console.log('Create group error:', error);

      Alert.alert(
        'Error',
        'Unable to create group. Please try again.',
      );
    }
  };

  const renderMember = ({item}) => {
    return (
      <View style={styles.memberRow}>
        {item.image ? (
          <Image
            source={{uri: item.image}}
            style={styles.memberAvatar}
          />
        ) : (
          <View style={styles.memberAvatarPlaceholder}>
            <Text style={styles.memberInitials}>
              {getInitials(item.name)}
            </Text>
          </View>
        )}

        <View style={styles.memberInfo}>
          <Text style={styles.memberName}>
            {item.name}
          </Text>

          <Text style={styles.memberPhone}>
            {item.phoneNumber}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          height: insets.top,
          backgroundColor: COLORS.primary,
        }}
      />

      <View style={styles.headerView}>
        <Header
          title="Create Group"
          onPress={() => navigation.goBack()}
        />
      </View>

      <FlatList
        data={selectedUsers}
        keyExtractor={item => item.id}
        renderItem={renderMember}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.groupInfoContent}
        ListHeaderComponent={
          <>
            {/* Group Image */}
            <View style={styles.groupImageSection}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.groupImageWrapper}
                onPress={selectGroupImage}>
                {groupImage ? (
                  <Image
                    source={{uri: groupImage}}
                    style={styles.groupImage}
                  />
                ) : (
                  <View style={styles.groupImagePlaceholder}>
                    <Icon
                      name="people"
                      size={42}
                      color={COLORS.primary}
                    />
                  </View>
                )}

                <View style={styles.cameraButton}>
                  <Icon
                    name="camera"
                    size={16}
                    color="#FFFFFF"
                  />
                </View>
              </TouchableOpacity>

              <Text style={styles.changePhotoText}>
                Add Group Photo
              </Text>
            </View>

            {/* Group Name */}
            <View style={styles.inputSection}>
              <Text style={styles.inputLabel}>
                Group Name
              </Text>

              <View style={styles.groupNameInputWrapper}>
                <Icon
                  name="people"
                  size={20}
                  color="#888888"
                />

                <TextInput
                  value={groupName}
                  onChangeText={setGroupName}
                  placeholder="Enter group name"
                  placeholderTextColor="#999999"
                  maxLength={50}
                  style={styles.groupNameInput}
                />
              </View>

              <Text style={styles.characterCount}>
                {groupName.length}/50
              </Text>
            </View>

            {/* Members */}
            <View style={styles.membersHeader}>
              <Text style={styles.sectionTitle}>
                Members
              </Text>

              <Text style={styles.memberCount}>
                {selectedUsers.length}
              </Text>
            </View>
          </>
        }
        ListFooterComponent={
          <View style={styles.footerSpace} />
        }
      />

      {/* Create Button */}
      <View
        style={[
          styles.createButtonContainer,
          {
            paddingBottom:
              insets.bottom + hp(1),
          },
        ]}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[
            styles.createButton,
            creating && styles.createButtonDisabled,
          ]}
          disabled={creating}
          onPress={createGroup}>
          <Icon
            name="people"
            size={20}
            color="#FFFFFF"
          />

          <Text style={styles.createButtonText}>
            {creating ? 'Creating...' : 'Create Group'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreateGroupInfoScreen;
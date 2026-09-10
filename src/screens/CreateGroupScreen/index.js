import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import Contacts from 'react-native-contacts';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from '../../components/Icon';
import Header from '../../components/HeaderComponent';
import useOrientation from '../../components/OrientationComponent';
import {portraitStyles, landscapeStyles} from './styles';
import {COLORS} from '../../utils';
import {hp} from '../../components/responsive';

const CreateGroupScreen = ({navigation}) => {
  const orientation = useOrientation();
  const isPortrait = orientation === 'portrait';
  const styles = isPortrait ? portraitStyles : landscapeStyles;
  const insets = useSafeAreaInsets();

  const [contacts, setContacts] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const loadContacts = useCallback(async () => {
    try {
      setLoading(true);
      const result = await Contacts.getAll();

      const formattedContacts = (Array.isArray(result) ? result : [])
        .map(contact => {
          const phoneNumber =
            contact.phoneNumbers?.length > 0
              ? contact.phoneNumbers[0].number
              : '';

          const fullName =
            `${contact.givenName || ''} ${
              contact.familyName || ''
            }`.trim();

          return {
            id: contact.recordID || `${fullName}-${phoneNumber}`,
            name: fullName || 'Unknown User',
            phoneNumber,
            image: contact.thumbnailPath || null,
            initials: getInitials(fullName || 'Unknown User'),
          };
        })
        .filter(item => item.phoneNumber);

      formattedContacts.sort((a, b) =>
        a.name.toLowerCase().localeCompare(b.name.toLowerCase()),
      );

      setContacts(formattedContacts);
    } catch (error) {
      console.log('Load contacts error:', error);

      Alert.alert(
        'Contacts',
        error?.message || 'Unable to load contacts from this device.',
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const requestContactsPermission = useCallback(async () => {
    try {
      if (Platform.OS === 'android') {
        const result = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
          {
            title: 'Contacts Permission',
            message:
              'This app needs access to your contacts so you can select users for a group.',
            buttonPositive: 'Allow',
            buttonNegative: 'Cancel',
          },
        );

        if (result !== PermissionsAndroid.RESULTS.GRANTED) {
          setLoading(false);

          Alert.alert(
            'Permission Required',
            'Please allow contacts permission to select users.',
          );

          return;
        }
      }

      await loadContacts();
    } catch (error) {
      console.log('Contact permission error:', error);
      setLoading(false);
    }
  }, [loadContacts]);

  useEffect(() => {
    requestContactsPermission();
  }, [requestContactsPermission]);

  const getInitials = name => {
    const parts = name
      .trim()
      .split(' ')
      .filter(Boolean);

    if (parts.length === 0) {
      return '?';
    }

    if (parts.length === 1) {
      return parts[0].charAt(0).toUpperCase();
    }

    return (
      parts[0].charAt(0) +
      parts[parts.length - 1].charAt(0)
    ).toUpperCase();
  };

  const toggleUser = user => {
    const alreadySelected = selectedUsers.some(
      item => item.id === user.id,
    );

    if (alreadySelected) {
      setSelectedUsers(prev =>
        prev.filter(item => item.id !== user.id),
      );
    } else {
      setSelectedUsers(prev => [...prev, user]);
    }
  };

  const filteredContacts = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) {
      return contacts;
    }

    return contacts.filter(
      item =>
        item.name.toLowerCase().includes(keyword) ||
        item.phoneNumber.toLowerCase().includes(keyword),
    );
  }, [contacts, search]);

  const isSelected = userId => {
    return selectedUsers.some(item => item.id === userId);
  };

  const renderSelectedUser = ({item}) => {
    return (
      <View style={styles.selectedUserContainer}>
        <View style={styles.selectedAvatarWrapper}>
          {item.image ? (
            <Image
              source={{uri: item.image}}
              style={styles.selectedAvatar}
            />
          ) : (
            <View style={styles.selectedAvatarPlaceholder}>
              <Text style={styles.selectedAvatarText}>
                {item.initials}
              </Text>
            </View>
          )}

          <TouchableOpacity
            style={styles.removeSelectedButton}
            onPress={() => toggleUser(item)}>
            <Icon
              name="close"
              size={10}
              color="#FFFFFF"
            />
          </TouchableOpacity>
        </View>

        <Text
          style={styles.selectedUserName}
          numberOfLines={1}>
          {item.name.split(' ')[0]}
        </Text>
      </View>
    );
  };

  const renderContact = ({item}) => {
    const selected = isSelected(item.id);

    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.contactRow}
        onPress={() => toggleUser(item)}>

        <View style={styles.contactAvatar}>
          {item.image ? (
            <Image
              source={{uri: item.image}}
              style={styles.contactImage}
            />
          ) : (
            <View style={styles.contactPlaceholder}>
              <Text style={styles.contactInitials}>
                {item.initials}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.contactInfo}>
          <Text style={styles.contactName}>
            {item.name}
          </Text>

          <Text style={styles.contactNumber}>
            {item.phoneNumber}
          </Text>
        </View>

        <View
          style={[
            styles.selectionCircle,
            selected && styles.selectionCircleSelected,
          ]}>
          {selected && (
            <Icon
              name="check"
              size={15}
              color="#FFFFFF"
            />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const handleContinue = () => {
    if (selectedUsers.length === 0) {
      Alert.alert(
        'Select Members',
        'Please select at least one member.',
      );
      return;
    }

    navigation.navigate('CreateGroupInfoScreen', {
      selectedUsers,
    });
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
          title="New Group"
          onPress={() => navigation.goBack()}
        />
      </View>

      <View style={styles.content}>
        {/* Search */}
        <View style={styles.searchContainer}>
          <Icon
            name="search"
            size={22}
            color="#777777"
          />

          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search contacts"
            placeholderTextColor="#999999"
            style={styles.searchInput}
          />

          {search.length > 0 && (
            <TouchableOpacity
              onPress={() => setSearch('')}>
              <Icon
                name="close"
                size={20}
                color="#777777"
              />
            </TouchableOpacity>
          )}
        </View>

        {/* Selected Users */}
        {selectedUsers.length > 0 && (
          <View style={styles.selectedSection}>
            <Text style={styles.sectionTitle}>
              Selected Members ({selectedUsers.length})
            </Text>

            <FlatList
              horizontal
              data={selectedUsers}
              keyExtractor={item => item.id}
              renderItem={renderSelectedUser}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={
                styles.selectedList
              }
            />
          </View>
        )}

        {/* Contacts */}
        <View style={styles.contactHeader}>
          <Text style={styles.sectionTitle}>
            Contacts
          </Text>

          <Text style={styles.contactCount}>
            {filteredContacts.length}
          </Text>
        </View>

        <FlatList
          data={filteredContacts}
          keyExtractor={item => item.id}
          renderItem={renderContact}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            styles.contactList
          }
          ListEmptyComponent={
            !loading ? (
              <View style={styles.emptyView}>
                <Icon
                  name="people"
                  size={45}
                  color="#AAAAAA"
                />

                <Text style={styles.emptyTitle}>
                  No contacts found
                </Text>

                <Text style={styles.emptyText}>
                  Try searching with another name or
                  phone number.
                </Text>
              </View>
            ) : null
          }
        />
      </View>

      {/* Bottom Button */}
      {selectedUsers.length > 0 && (
        <View
          style={[
            styles.bottomButtonContainer,
            {
              paddingBottom:
                insets.bottom + hp(1),
            },
          ]}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.continueButton}
            onPress={handleContinue}>
            <Text style={styles.continueButtonText}>
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default CreateGroupScreen;


// import React, {
//   useCallback,
//   useEffect,
//   useMemo,
//   useState,
// } from 'react';

// import {
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   TextInput,
//   Image,
//   Alert,
//   Platform,
//   PermissionsAndroid,
// } from 'react-native';

// import Contacts from 'react-native-contacts';
// import {useSafeAreaInsets} from 'react-native-safe-area-context';

// import Icon from '../../components/Icon';
// import Header from '../../components/HeaderComponent';
// import useOrientation from '../../components/OrientationComponent';

// import {
//   portraitStyles,
//   landscapeStyles,
// } from './styles';

// import {COLORS} from '../../utils';
// import {hp} from '../../components/responsive';

// const CreateGroupScreen = ({navigation}) => {
//   const orientation = useOrientation();
//   const isPortrait = orientation === 'portrait';
//   const styles = isPortrait
//     ? portraitStyles
//     : landscapeStyles;

//   const insets = useSafeAreaInsets();

//   const [contacts, setContacts] = useState([]);

//   // Registered users selected for the group
//   const [selectedUsers, setSelectedUsers] = useState([]);

//   const [search, setSearch] = useState('');
//   const [loading, setLoading] = useState(true);

//   // ---------------------------------------------------------
//   // Get initials
//   // ---------------------------------------------------------

//   const getInitials = name => {
//     const parts = name
//       .trim()
//       .split(' ')
//       .filter(Boolean);

//     if (parts.length === 0) {
//       return '?';
//     }

//     if (parts.length === 1) {
//       return parts[0]
//         .charAt(0)
//         .toUpperCase();
//     }

//     return (
//       parts[0].charAt(0) +
//       parts[parts.length - 1].charAt(0)
//     ).toUpperCase();
//   };

//   // ---------------------------------------------------------
//   // Normalize phone number
//   // ---------------------------------------------------------

//   const normalizePhone = phone => {
//     if (!phone) {
//       return '';
//     }

//     let value = phone
//       .replace(/[^\d+]/g, '')
//       .trim();

//     // India example:
//     // 9876543210 -> +919876543210
//     if (value.length === 10 && !value.startsWith('+')) {
//       value = `+91${value}`;
//     }

//     // 09876543210 -> +919876543210
//     if (value.length === 11 && value.startsWith('0')) {
//       value = `+91${value.substring(1)}`;
//     }

//     return value;
//   };

//   // ---------------------------------------------------------
//   // Load contacts
//   // ---------------------------------------------------------

//   const loadContacts = useCallback(async () => {
//     try {
//       setLoading(true);

//       const result = await Contacts.getAll();

//       const formattedContacts = (
//         Array.isArray(result) ? result : []
//       )
//         .map(contact => {
//           const phoneNumber =
//             contact.phoneNumbers?.length > 0
//               ? contact.phoneNumbers[0].number
//               : '';

//           const fullName =
//             `${contact.givenName || ''} ${
//               contact.familyName || ''
//             }`.trim();

//           const normalizedPhone =
//             normalizePhone(phoneNumber);

//           return {
//             id:
//               contact.recordID ||
//               `${fullName}-${phoneNumber}`,

//             name:
//               fullName || 'Unknown User',

//             phoneNumber,

//             normalizedPhone,

//             image:
//               contact.thumbnailPath || null,

//             initials: getInitials(
//               fullName || 'Unknown User',
//             ),

//             // IMPORTANT:
//             // This should come from your Laravel API.
//             isRegistered: false,
//           };
//         })
//         .filter(item => item.phoneNumber);

//       formattedContacts.sort((a, b) =>
//         a.name
//           .toLowerCase()
//           .localeCompare(
//             b.name.toLowerCase(),
//           ),
//       );

//       // ---------------------------------------------------
//       // TEMPORARY REGISTERED USER LOGIC
//       // ---------------------------------------------------
//       //
//       // Replace this with Laravel API response.
//       //
//       // Example:
//       // registeredPhoneNumbers = [
//       //   '+919876543210',
//       //   '+919876543211',
//       // ];
//       //
//       // ---------------------------------------------------

//       const registeredPhoneNumbers = [
//         // Add registered phone numbers here temporarily
//         // '+919876543210',
//         // '+919876543211',
//       ];

//       const updatedContacts =
//         formattedContacts.map(contact => ({
//           ...contact,

//           isRegistered:
//             registeredPhoneNumbers.includes(
//               contact.normalizedPhone,
//             ),
//         }));

//       setContacts(updatedContacts);
//     } catch (error) {
//       console.log(
//         'Load contacts error:',
//         error,
//       );

//       Alert.alert(
//         'Contacts',
//         error?.message ||
//           'Unable to load contacts from this device.',
//       );
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   // ---------------------------------------------------------
//   // Contact permission
//   // ---------------------------------------------------------

//   const requestContactsPermission =
//     useCallback(async () => {
//       try {
//         // Android
//         if (Platform.OS === 'android') {
//           const result =
//             await PermissionsAndroid.request(
//               PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
//               {
//                 title: 'Contacts Permission',

//                 message:
//                   'This app needs access to your contacts so you can select users for a group.',

//                 buttonPositive: 'Allow',

//                 buttonNegative: 'Cancel',

//                 buttonNeutral: 'Ask Me Later',
//               },
//             );

//           if (
//             result !==
//             PermissionsAndroid.RESULTS.GRANTED
//           ) {
//             setLoading(false);

//             Alert.alert(
//               'Permission Required',
//               'Please allow contacts permission to select users.',
//             );

//             return;
//           }
//         }

//         // iOS
//         if (Platform.OS === 'ios') {
//           const permission =
//             await Contacts.checkPermission();

//           if (
//             permission ===
//             Contacts.PERMISSION_UNAVAILABLE
//           ) {
//             setLoading(false);

//             Alert.alert(
//               'Contacts Unavailable',
//               'Contacts are not available on this device.',
//             );

//             return;
//           }

//           if (
//             permission ===
//             Contacts.PERMISSION_DENIED
//           ) {
//             const request =
//               await Contacts.requestPermission();

//             if (
//               request !==
//               Contacts.PERMISSION_AUTHORIZED
//             ) {
//               setLoading(false);

//               Alert.alert(
//                 'Permission Required',
//                 'Please allow Contacts access from Settings.',
//               );

//               return;
//             }
//           }
//         }

//         await loadContacts();
//       } catch (error) {
//         console.log(
//           'Contact permission error:',
//           error,
//         );

//         setLoading(false);

//         Alert.alert(
//           'Contacts',
//           'Unable to access your contacts.',
//         );
//       }
//     }, [loadContacts]);

//   useEffect(() => {
//     requestContactsPermission();
//   }, [requestContactsPermission]);

//   // ---------------------------------------------------------
//   // Registered users
//   // ---------------------------------------------------------

//   const registeredContacts = useMemo(() => {
//     return contacts.filter(
//       item => item.isRegistered,
//     );
//   }, [contacts]);

//   // ---------------------------------------------------------
//   // Invite users
//   // ---------------------------------------------------------

//   const inviteContacts = useMemo(() => {
//     return contacts.filter(
//       item => !item.isRegistered,
//     );
//   }, [contacts]);

//   // ---------------------------------------------------------
//   // Search
//   // ---------------------------------------------------------

//   const filterContacts = useCallback(
//     list => {
//       const keyword =
//         search.trim().toLowerCase();

//       if (!keyword) {
//         return list;
//       }

//       return list.filter(item => {
//         return (
//           item.name
//             .toLowerCase()
//             .includes(keyword) ||
//           item.phoneNumber
//             .toLowerCase()
//             .includes(keyword)
//         );
//       });
//     },
//     [search],
//   );

//   const filteredRegisteredContacts =
//     useMemo(() => {
//       return filterContacts(
//         registeredContacts,
//       );
//     }, [
//       filterContacts,
//       registeredContacts,
//     ]);

//   const filteredInviteContacts =
//     useMemo(() => {
//       return filterContacts(
//         inviteContacts,
//       );
//     }, [
//       filterContacts,
//       inviteContacts,
//     ]);

//   // ---------------------------------------------------------
//   // Select / unselect registered user
//   // ---------------------------------------------------------

//   const toggleUser = user => {
//     const alreadySelected =
//       selectedUsers.some(
//         item => item.id === user.id,
//       );

//     if (alreadySelected) {
//       setSelectedUsers(prev =>
//         prev.filter(
//           item => item.id !== user.id,
//         ),
//       );
//     } else {
//       setSelectedUsers(prev => [
//         ...prev,
//         user,
//       ]);
//     }
//   };

//   // ---------------------------------------------------------
//   // Check selected
//   // ---------------------------------------------------------

//   const isSelected = userId => {
//     return selectedUsers.some(
//       item => item.id === userId,
//     );
//   };

//   // ---------------------------------------------------------
//   // Invite user
//   // ---------------------------------------------------------

//   const handleInvite = user => {
//     Alert.alert(
//       'Invite User',
//       `Send an invitation to ${user.name}?`,
//       [
//         {
//           text: 'Cancel',
//           style: 'cancel',
//         },
//         {
//           text: 'Invite',
//           onPress: () => {
//             console.log(
//               'Invite user:',
//               user,
//             );

//             // ------------------------------------------------
//             // TODO:
//             // Call your Laravel API here.
//             //
//             // Example payload:
//             //
//             // {
//             //   phone_number: user.normalizedPhone,
//             //   name: user.name
//             // }
//             //
//             // ------------------------------------------------

//             Alert.alert(
//               'Invitation Sent',
//               `Invitation sent to ${user.name}.`,
//             );
//           },
//         },
//       ],
//     );
//   };

//   // ---------------------------------------------------------
//   // Selected user item
//   // ---------------------------------------------------------

//   const renderSelectedUser = ({
//     item,
//   }) => {
//     return (
//       <View
//         style={
//           styles.selectedUserContainer
//         }>
//         <View
//           style={
//             styles.selectedAvatarWrapper
//           }>
//           {item.image ? (
//             <Image
//               source={{uri: item.image}}
//               style={styles.selectedAvatar}
//             />
//           ) : (
//             <View
//               style={
//                 styles.selectedAvatarPlaceholder
//               }>
//               <Text
//                 style={
//                   styles.selectedAvatarText
//                 }>
//                 {item.initials}
//               </Text>
//             </View>
//           )}

//           <TouchableOpacity
//             style={
//               styles.removeSelectedButton
//             }
//             onPress={() =>
//               toggleUser(item)
//             }>
//             <Icon
//               name="close"
//               size={10}
//               color="#FFFFFF"
//             />
//           </TouchableOpacity>
//         </View>

//         <Text
//           style={
//             styles.selectedUserName
//           }
//           numberOfLines={1}>
//           {item.name.split(' ')[0]}
//         </Text>
//       </View>
//     );
//   };

//   // ---------------------------------------------------------
//   // Registered user item
//   // ---------------------------------------------------------

//   const renderRegisteredUser = ({
//     item,
//   }) => {
//     const selected = isSelected(
//       item.id,
//     );

//     return (
//       <TouchableOpacity
//         activeOpacity={0.7}
//         style={styles.contactRow}
//         onPress={() =>
//           toggleUser(item)
//         }>
//         {/* Avatar */}
//         <View
//           style={styles.contactAvatar}>
//           {item.image ? (
//             <Image
//               source={{uri: item.image}}
//               style={styles.contactImage}
//             />
//           ) : (
//             <View
//               style={
//                 styles.contactPlaceholder
//               }>
//               <Text
//                 style={
//                   styles.contactInitials
//                 }>
//                 {item.initials}
//               </Text>
//             </View>
//           )}
//         </View>

//         {/* User info */}
//         <View
//           style={styles.contactInfo}>
//           <View
//             style={
//               styles.nameWithRegistered
//             }>
//             <Text
//               style={styles.contactName}
//               numberOfLines={1}>
//               {item.name}
//             </Text>

//             <View
//               style={
//                 styles.registeredBadge
//               }>
//               <Text
//                 style={
//                   styles.registeredBadgeText
//                 }>
//                 Registered
//               </Text>
//             </View>
//           </View>

//           <Text
//             style={styles.contactNumber}>
//             {item.phoneNumber}
//           </Text>
//         </View>

//         {/* Checkbox */}
//         <View
//           style={[
//             styles.selectionCircle,
//             selected &&
//               styles.selectionCircleSelected,
//           ]}>
//           {selected && (
//             <Icon
//               name="check"
//               size={15}
//               color="#FFFFFF"
//             />
//           )}
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   // ---------------------------------------------------------
//   // Invite user item
//   // ---------------------------------------------------------

//   const renderInviteUser = ({
//     item,
//   }) => {
//     return (
//       <View
//         style={
//           styles.inviteContactRow
//         }>
//         {/* Avatar */}
//         <View
//           style={styles.contactAvatar}>
//           {item.image ? (
//             <Image
//               source={{uri: item.image}}
//               style={styles.contactImage}
//             />
//           ) : (
//             <View
//               style={
//                 styles.contactPlaceholder
//               }>
//               <Text
//                 style={
//                   styles.contactInitials
//                 }>
//                 {item.initials}
//               </Text>
//             </View>
//           )}
//         </View>

//         {/* Info */}
//         <View
//           style={styles.contactInfo}>
//           <Text
//             style={styles.contactName}
//             numberOfLines={1}>
//             {item.name}
//           </Text>

//           <Text
//             style={styles.contactNumber}>
//             {item.phoneNumber}
//           </Text>
//         </View>

//         {/* Invite button */}
//         <TouchableOpacity
//           activeOpacity={0.8}
//           style={styles.inviteButton}
//           onPress={() =>
//             handleInvite(item)
//           }>
//           <Icon
//             name="send"
//             size={15}
//             color="#FFFFFF"
//           />

//           <Text
//             style={
//               styles.inviteButtonText
//             }>
//             Invite
//           </Text>
//         </TouchableOpacity>
//       </View>
//     );
//   };

//   // ---------------------------------------------------------
//   // Continue
//   // ---------------------------------------------------------

//   const handleContinue = () => {
//     if (selectedUsers.length === 0) {
//       Alert.alert(
//         'Select Members',
//         'Please select at least one registered member.',
//       );

//       return;
//     }

//     navigation.navigate(
//       'CreateGroupInfoScreen',
//       {
//         selectedUsers,
//       },
//     );
//   };

//   // ---------------------------------------------------------
//   // Render
//   // ---------------------------------------------------------

//   return (
//     <View style={styles.container}>
//       {/* Safe area */}
//       <View
//         style={{
//           height: insets.top,
//           backgroundColor:
//             COLORS.primary,
//         }}
//       />

//       {/* Header */}
//       <View
//         style={styles.headerView}>
//         <Header
//           title="New Group"
//           onPress={() =>
//             navigation.goBack()
//           }
//         />
//       </View>

//       <View style={styles.content}>
//         {/* Search */}
//         <View
//           style={
//             styles.searchContainer
//           }>
//           <Icon
//             name="search"
//             size={22}
//             color="#777777"
//           />

//           <TextInput
//             value={search}
//             onChangeText={setSearch}
//             placeholder="Search contacts"
//             placeholderTextColor="#999999"
//             style={styles.searchInput}
//           />

//           {search.length > 0 && (
//             <TouchableOpacity
//               onPress={() =>
//                 setSearch('')
//               }>
//               <Icon
//                 name="close"
//                 size={20}
//                 color="#777777"
//               />
//             </TouchableOpacity>
//           )}
//         </View>

//         {/* ------------------------------------------------ */}
//         {/* Selected Members */}
//         {/* ------------------------------------------------ */}

//         {selectedUsers.length > 0 && (
//           <View
//             style={
//               styles.selectedSection
//             }>
//             <Text
//               style={styles.sectionTitle}>
//               Selected Members (
//               {selectedUsers.length})
//             </Text>

//             <FlatList
//               horizontal
//               data={selectedUsers}
//               keyExtractor={item =>
//                 `selected-${item.id}`
//               }
//               renderItem={
//                 renderSelectedUser
//               }
//               showsHorizontalScrollIndicator={
//                 false
//               }
//               contentContainerStyle={
//                 styles.selectedList
//               }
//             />
//           </View>
//         )}

//         {/* ================================================= */}
//         {/* REGISTERED USERS */}
//         {/* ================================================= */}

//         <View
//           style={
//             styles.sectionHeaderRow
//           }>
//           <View>
//             <Text
//               style={styles.sectionTitle}>
//               Registered Users
//             </Text>

//             <Text
//               style={
//                 styles.sectionSubtitle
//               }>
//               Select people to add to your
//               group
//             </Text>
//           </View>

//           <View
//             style={
//               styles.countBadge
//             }>
//             <Text
//               style={
//                 styles.countBadgeText
//               }>
//               {filteredRegisteredContacts.length}
//             </Text>
//           </View>
//         </View>

//         <FlatList
//           data={
//             filteredRegisteredContacts
//           }
//           keyExtractor={item =>
//             `registered-${item.id}`
//           }
//           renderItem={
//             renderRegisteredUser
//           }
//           showsVerticalScrollIndicator={
//             false
//           }
//           contentContainerStyle={
//             styles.contactList
//           }
//           ListEmptyComponent={
//             !loading ? (
//               <View
//                 style={
//                   styles.smallEmptyView
//                 }>
//                 <Icon
//                   name="people"
//                   size={35}
//                   color="#AAAAAA"
//                 />

//                 <Text
//                   style={
//                     styles.emptyTitle
//                   }>
//                   No registered users
//                 </Text>
//               </View>
//             ) : null
//           }
//         />

//         {/* ================================================= */}
//         {/* INVITE USERS */}
//         {/* ================================================= */}

//         <View
//           style={
//             styles.inviteSection
//           }>
//           <View
//             style={
//               styles.sectionHeaderRow
//             }>
//             <View>
//               <Text
//                 style={
//                   styles.sectionTitle
//                 }>
//                 Invite User
//               </Text>

//               <Text
//                 style={
//                   styles.sectionSubtitle
//                 }>
//                 Invite contacts who are not
//                 registered
//               </Text>
//             </View>

//             <View
//               style={
//                 styles.inviteCountBadge
//               }>
//               <Text
//                 style={
//                   styles.inviteCountBadgeText
//                 }>
//                 {filteredInviteContacts.length}
//               </Text>
//             </View>
//           </View>

//           <FlatList
//             data={
//               filteredInviteContacts
//             }
//             keyExtractor={item =>
//               `invite-${item.id}`
//             }
//             renderItem={
//               renderInviteUser
//             }
//             showsVerticalScrollIndicator={
//               false
//             }
//             contentContainerStyle={
//               styles.contactList
//             }
//             ListEmptyComponent={
//               !loading ? (
//                 <View
//                   style={
//                     styles.smallEmptyView
//                   }>
//                   <Icon
//                     name="check"
//                     size={35}
//                     color={
//                       COLORS.primary
//                     }
//                   />

//                   <Text
//                     style={
//                       styles.emptyTitle
//                     }>
//                     All contacts are
//                     registered
//                   </Text>

//                   <Text
//                     style={
//                       styles.emptyText
//                     }>
//                     You don't have any
//                     unregistered contacts.
//                   </Text>
//                 </View>
//               ) : null
//             }
//           />
//         </View>
//       </View>

//       {/* ================================================= */}
//       {/* BOTTOM BUTTON */}
//       {/* ================================================= */}

//       {selectedUsers.length > 0 && (
//         <View
//           style={[
//             styles.bottomButtonContainer,
//             {
//               paddingBottom:
//                 insets.bottom +
//                 hp(1),
//             },
//           ]}>
//           <TouchableOpacity
//             activeOpacity={0.8}
//             style={
//               styles.continueButton
//             }
//             onPress={
//               handleContinue
//             }>
//             <Text
//               style={
//                 styles.continueButtonText
//               }>
//               Continue (
//               {selectedUsers.length})
//             </Text>
//           </TouchableOpacity>
//         </View>
//       )}
//     </View>
//   );
// };

// export default CreateGroupScreen;
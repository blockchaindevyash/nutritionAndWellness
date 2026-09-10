// import React from 'react';
// import {Text} from 'react-native';

// const icons = {
//   back: '‹',
//   close: '×',
//   search: '⌕',
//   notification: '♢',
//   add: '+',
//   send: '➤',
//   heart: '♥',
//   heartOutline: '♡',
//   comment: '◯',
//   share: '↗',
//   bookmark: '♡',
//   bookmarkOutline: '♡',
//   more: '•••',
//   image: '▧',
//   edit: '✎',
//   check: '✓',
//   pin: '⌖',
//   info: 'ⓘ',
//   reply: '↳',
//   chat: '☷',
// };

// const Icon = ({
//   name,
//   size = 22,
//   color = '#666',
//   style,
// }) => {
//   return (
//     <Text
//       style={[
//         {
//           fontSize: size,
//           color,
//           fontWeight: '500',
//           lineHeight: size + 4,
//           textAlign: 'center',
//         },
//         style,
//       ]}>
//       {icons[name] || '?'}
//     </Text>
//   );
// };

// export default Icon;


import React from 'react';
import {Text} from 'react-native';

const icons = {
  // =========================
  // Navigation
  // =========================
  back: '‹',
  forward: '›',
  chevronLeft: '‹',
  chevronRight: '›',
  chevronUp: '⌃',
  chevronDown: '⌄',

  // =========================
  // Common
  // =========================
  close: '×',
  add: '+',
  minus: '−',
  check: '✓',
  done: '✓',
  edit: '✎',
  delete: '⌫',
  refresh: '↻',
  image: '▧',
  search: '⌕',
  bell: '♢',
  'bell-off': '♢',
  // =========================
  // Search
  // =========================
  search: '⌕',
  filter: '☷',
  sort: '⇅',

  // =========================
  // Notifications
  // =========================
  notification: '♢',
  notifications: '♢',
  notificationOutline: '♢',
  'notifications-outline': '♢',

  // =========================
  // Social / Like
  // =========================
  heart: '♥',
  heartOutline: '♡',

  // Old Ionicons-compatible names
  'heart-outline': '♡',

  like: '♥',
  likeOutline: '♡',

  // =========================
  // Comments / Chat
  // =========================
  comment: '◯',
  commentOutline: '◯',

  chat: '☷',
  chatOutline: '☷',

  chatbubble: '◯',
  chatbubbleOutline: '◯',

  // Old Ionicons-compatible names
  'chatbubble-outline': '◯',
  'chatbubbles-outline': '☷',

  // =========================
  // Share
  // =========================
  share: '↗',
  shareOutline: '↗',

  // Old Ionicons-compatible name
  'share-social-outline': '↗',

  // =========================
  // Bookmark
  // =========================
  bookmark: '♡',
  bookmarkOutline: '♡',

  // =========================
  // More / Menu
  // =========================
  more: '•••',
  moreVertical: '⋮',
  menu: '☰',

  // Old Ionicons-compatible names
  'ellipsis-horizontal': '•••',
  'ellipsis-vertical': '⋮',

  // =========================
  // Media
  // =========================
  image: '▧',
  imageOutline: '▧',
  camera: '▣',
  video: '▶',
  play: '▶',
  pause: 'Ⅱ',
  microphone: '♩',

  // =========================
  // Content
  // =========================
  document: '▤',
  file: '▤',
  folder: '▱',
  link: '↗',
  copy: '▣',

  // =========================
  // Location
  // =========================
  pin: '⌖',
  pinOutline: '⌖',
  location: '⌖',
  locationOutline: '⌖',

  // =========================
  // Information
  // =========================
  info: 'ⓘ',
  infoOutline: 'ⓘ',
  warning: '⚠',
  help: '?',

  // =========================
  // Status
  // =========================
  success: '✓',
  error: '×',
  warningCircle: '⚠',
  infoCircle: 'ⓘ',
  checkCircle: '✓',
  closeCircle: '×',

  // =========================
  // Actions
  // =========================
  send: '➤',
  upload: '↑',
  download: '↓',
  externalLink: '↗',
  reply: '↳',

  // =========================
  // User
  // =========================
  user: '♙',
  userOutline: '♙',
  profile: '♙',
  person: '♙',
  people: '♙',

  // =========================
  // Health / Wellness
  // =========================
  fitness: '♟',
  activity: '⌁',
  health: '♡',
  nutrition: '♧',
  sleep: '☾',
  water: '≈',
  meditation: '◉',

  // =========================
  // Time
  // =========================
  clock: '◷',
  time: '◷',
  calendar: '▣',

  // =========================
  // Settings
  // =========================
  settings: '⚙',
  gear: '⚙',

  // =========================
  // Security
  // =========================
  lock: '▣',
  unlock: '□',

  // =========================
  // Visibility
  // =========================
  eye: '◉',
  eyeOff: '⊘',

  // =========================
  // Arrows
  // =========================
  arrowUp: '↑',
  arrowDown: '↓',
  arrowLeft: '←',
  arrowRight: '→',

  // =========================
  // Community
  // =========================
  community: '♧',
  discussions: '☷',
};

const Icon = ({
  name,
  size = 22,
  color = '#666',
  style,
}) => {
  return (
    <Text
      style={[
        {
          fontSize: size,
          color,
          fontWeight: '500',
          lineHeight: size + 4,
          textAlign: 'center',
        },
        style,
      ]}>
      {icons[name] || '?'}
    </Text>
  );
};

export default Icon;
import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SafeAreaWrapper = ({ children, backgroundColor }) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        {
          flex: 1,
          paddingTop: insets.top,
          backgroundColor: backgroundColor || '#fff',
        }
      ]}
    >
      {children}
    </View>
  );
};

export default SafeAreaWrapper;

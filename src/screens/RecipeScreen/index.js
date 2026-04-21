import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  Platform,
  PermissionsAndroid,
  FlatList,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { portraitStyles, landscapeStyles } from './styles';
import useOrientation from '../../components/OrientationComponent';
import { hp } from '../../components/responsive';
import dish1 from '../../images/dish1.jpg';
import Header from '../../components/HeaderComponent';

const RecipeScreen = ({ navigation, route }) => {
  const {item} = route.params;
  const orientation = useOrientation();
  const isPortrait = orientation === 'portrait';
  const styles = isPortrait ? portraitStyles : landscapeStyles;
  const [water, setWater] = useState(2); // current glasses
  const maxWater = 8;

  return (
    <View style={styles.safeAreaStyle}>
      <View style={styles.headerView}>
        <Header title={'Recipe'} onPress={() => navigation.goBack()} />
      </View>
      <View style={styles.mainView}>
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: hp(8) }} showsVerticalScrollIndicator={false}>
          <Image style={styles.fullImageStyle} source={item?.image} />
          <View style={styles.infoView}>
            <Text style={styles.dishTitle}>{item?.name}</Text>
            <Text style={styles.descriptionText}>A delicious and nutritious breakfast option, combining creamy oats with a colorful medley of fresh fruits. Packed with fiber, vitamins, and antioxidants, this dish provides sustained energy and supports digestive health. Perfect for starting your day on a healthy note!</Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default RecipeScreen;
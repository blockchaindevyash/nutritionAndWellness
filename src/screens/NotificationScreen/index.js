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
import React, { useCallback, useEffect, useState } from 'react';
import { portraitStyles, landscapeStyles } from './styles';
import useOrientation from '../../components/OrientationComponent';
import Header from '../../components/HeaderComponent';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../../utils';
import { onGetCommonApi } from '../../services/Api';
import { useFocusEffect } from '@react-navigation/native';

const NotificationScreen = ({ navigation }) => {
    const orientation = useOrientation(); // Get current orientation
    const isPortrait = orientation === 'portrait';
    const insets = useSafeAreaInsets();
    const styles = isPortrait ? portraitStyles : landscapeStyles;
    const [loading, setLoading] = useState(false);
    const [notificationList, setNotificationList] = useState([]);

    useFocusEffect(
        useCallback(() => {    
            fetchData();
        }, [])
    );

    const fetchData = async () => {
        setLoading(true);
        try {
            // Fetch notification data here
            const response = await onGetCommonApi('notifications');
            if (response.data.status) {
                setNotificationList(response.data.data.notifications);
                setLoading(false);
            }
        } catch (error) {
            console.error('Error fetching notification data:', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={styles.safeAreaStyle}>
            <View
                style={{
                    width: '100%',
                    paddingTop: insets.top,
                    backgroundColor: COLORS.primary,
                }}
            />
            <View style={styles.headerView}>
                <Header title={'Notification'} onPress={() => navigation.goBack()} />
            </View>
            <View style={styles.mainView}>
                <FlatList
                    data={notificationList}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    ListEmptyComponent={() => (
                    <View key={0} style={styles.ListEmptyView}>
                        {loading ? (
                        <ActivityIndicator size={'large'} color={COLORS.subPrimary} />
                        ) : (
                        <Text style={styles.emptyText}>
                            {'No record found'}
                        </Text>
                        )}
                    </View>
                    )}
                    renderItem={({ item }) => (
                    <TouchableOpacity style={styles.dishCard} onPress={() => navigation.navigate('RecipeScreen', {item: item})}>
                        <Image source={{uri: item.recipe_image}} style={styles.dishImage} />
                        <Text style={styles.cardTitle}>{item.recipe_name}</Text>
                    </TouchableOpacity>
                    )}
                />
            </View>
        </View>
    );
};

export default NotificationScreen;
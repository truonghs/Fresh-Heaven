import {Image, StyleSheet, Text, View, ScrollView, TouchableOpacity, Pressable} from 'react-native';
import React, {useLayoutEffect, useEffect, useContext, useState} from 'react';

import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import axios from 'axios';
import styles from './Profile.style';
import {COLORS} from '../../constants';
import Ip from '../../constants/ipAddress';
import {userContext} from '../../Context/UserContext';
import CustomButton from '../../components/CustomButton/CustomButton';
function Profile() {
  const navigation = useNavigation();
  const {userId, currentUser} = useContext(userContext);
  const [orders, setOrders] = useState([]);
  const logout = async () => {
    await AsyncStorage.removeItem('authToken');
    await AsyncStorage.removeItem('isFirstTime');
    navigation.replace('AuthStack');
  };
  const [statusMemberShip, setStatusMemberShip] = useState(orders?.length < 5 ? 'Silver member' : orders?.length < 10 ? 'Gold member' : orders?.length < 20 ? 'Platinum member' : 'Rookie');
  useEffect(() => {
    axios
      .get(`http://${Ip}:3000/api/order/orders/${userId}`)
      .then(({data}) => {
        setOrders(data.orders);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.backGroundImage}>
        <Image style={styles.userImage} source={currentUser.avatar ? {uri: currentUser.avatar} : require('../../assets/images/user.png')} />
        <View style={styles.userMemberShip}>
          <View style={styles.userMemberShipRow}>
            <Ionicons name="ribbon" size={24} color={COLORS.orange} />
            <Text style={styles.userMemberShipText}>{statusMemberShip}</Text>
          </View>
          <View style={styles.userMemberShipRow}>
            <Ionicons name="bag-handle" size={24} color={COLORS.orange} />
            <Text style={styles.userMemberShipText}>Total orders: {orders.length ?? 0}</Text>
          </View>
        </View>
        <Pressable style={styles.btnEditProfile} onPress={() => navigation.navigate('EditProfile')}>
          <SimpleLineIcons name="note" size={24} color={'#fff'} />
        </Pressable>
      </View>
      <View style={styles.userInfoList}>
        <View style={styles.userInfoItem}>
          <Ionicons name="person" size={24} color={COLORS.primary} />
          <Text style={styles.userInfoItemText}>{currentUser.firstName + ' ' + currentUser.lastName}</Text>
        </View>
        <View style={styles.userInfoItem}>
          <Ionicons name="call-sharp" size={24} color={COLORS.primary} />
          <Text style={styles.userInfoItemText}>{currentUser.phoneNumber}</Text>
        </View>
        <View style={styles.userInfoItem}>
          <Ionicons name="mail-sharp" size={24} color={COLORS.primary} />
          <Text style={styles.userInfoItemText}>{currentUser.email}</Text>
        </View>
        <View style={styles.userInfoItem}>
          <Ionicons name="location-sharp" size={24} color={COLORS.primary} />
          <Text style={styles.userInfoItemText}>{currentUser.addresses[0].addressDetail}</Text>
        </View>
        <Pressable style={styles.userInfoItem} onPress={() => navigation.navigate('Order')}>
          <FontAwesome name="shopping-bag" size={24} color={COLORS.primary} />
          <Text style={styles.userInfoItemText}>View order</Text>
        </Pressable>
        <Pressable style={styles.userInfoItem} onPress={() => navigation.navigate('ForgotPassword')}>
          <Ionicons name="lock-closed" size={24} color={COLORS.primary} />
          <Text style={styles.userInfoItemText}>Change password</Text>
        </Pressable>
        <Pressable style={styles.userInfoItem} onPress={logout}>
          <Feather name="log-out" size={24} color={COLORS.primary} />
          <Text style={styles.userInfoItemText}>Logout</Text>
        </Pressable>
      </View>
    </View>
  );
}
export default Profile;

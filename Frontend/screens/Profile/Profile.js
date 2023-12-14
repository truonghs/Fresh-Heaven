import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useLayoutEffect, useEffect, useContext, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LottieView from 'lottie-react-native';
import axios from 'axios';
import {userContext} from '../../Context/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ip from '../../constants/ipAddress';
const Profile = () => {
  const {userId, setUserId} = useContext(userContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerStyle: {
        backgroundColor: '#00CED1',
      },
      headerLeft: () => (
        <Image
          style={{width: 140, height: 120, resizeMode: 'contain'}}
          source={{
            uri: 'https://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c518.png',
          }}
        />
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6,
            marginRight: 12,
          }}>
          <Ionicons name="notifications-outline" size={24} color="black" />

          <AntDesign name="search1" size={24} color="black" />
        </View>
      ),
    });
  }, []);
  const [user, setUser] = useState();
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`http://${Ip}:3000/profile/${userId}`);
        const {user} = response.data;
        setUser(user);
      } catch (error) {
        console.log('error profile user', error);
      }
    };

    fetchUserProfile();
  }, []);
  const logout = () => {
    clearCart();
    clearAuthToken();
  };
  const clearAuthToken = async () => {
    await AsyncStorage.removeItem('authToken');
    console.log('auth token cleared');
    navigation.replace('Login');
  };
  const clearCart = async () => {
    console.log('cart cleared');
  };
  // useEffect(() => {
  //   const fetchOrders = async () => {
  //     try {
  //       const response = await axios.get(`http:/${Ip}:3000/orders/${userId}`);
  //       const orders = response.data.orders;
  //       setOrders(orders);
  //       setLoading(false);
  //     } catch (error) {
  //       console.log('error profile order', error);
  //     }
  //   };

  //   fetchOrders();
  // }, []);
  console.log('orders', orders);
  return (
    <ScrollView style={{padding: 10, flex: 1, backgroundColor: 'white'}}>
      <Text style={{fontSize: 16, fontWeight: 'bold'}}>
        Welcome {user?.name}
      </Text>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          marginTop: 12,
        }}>
        <TouchableOpacity
          style={{
            padding: 10,
            backgroundColor: '#E0E0E0',
            borderRadius: 25,
            flex: 1,
          }}>
          <Text style={{textAlign: 'center'}}>Your orders</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            padding: 10,
            backgroundColor: '#E0E0E0',
            borderRadius: 25,
            flex: 1,
          }}>
          <Text style={{textAlign: 'center'}}>Your Account</Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          marginTop: 12,
        }}>
        <TouchableOpacity
          style={{
            padding: 10,
            backgroundColor: '#E0E0E0',
            borderRadius: 25,
            flex: 1,
          }}>
          <Text style={{textAlign: 'center'}}>Buy Again</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={logout}
          style={{
            padding: 10,
            backgroundColor: '#E0E0E0',
            borderRadius: 25,
            flex: 1,
          }}>
          <Text style={{textAlign: 'center'}}>Logout</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {loading ? (
          <LottieView
            source={require('../../assets/animation/loading.json')}
            autoPlay
            loop
            style={{
              width: 70,
              height: 70,
            }}
          />
        ) : orders.length > 0 ? (
          orders.map(order => (
            <TouchableOpacity
              style={{
                marginTop: 20,
                padding: 15,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: '#d0d0d0',
                marginHorizontal: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              key={order._id}>
              {/* Render the order information here */}
              {order.products.slice(0, 1)?.map(product => (
                <View style={{marginVertical: 10}} key={product._id}>
                  <Image
                    source={{uri: product.image}}
                    style={{width: 100, height: 100, resizeMode: 'contain'}}
                  />
                </View>
              ))}
            </TouchableOpacity>
          ))
        ) : (
          <Text>No orders found</Text>
        )}
      </ScrollView>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({});

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
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import styles from './Profile.style';
import {COLORS} from '../../constants';
import Ip from '../../constants/ipAddress';
import {userContext} from '../../Context/UserContext';
import CustomButton from '../../components/CustomButton/CustomButton';
// const Profile = () => {
//   // const {userId, setUserId} = useContext(userContext);
//   // const [orders, setOrders] = useState([]);
//   // const [loading, setLoading] = useState(true);

//   // useLayoutEffect(() => {
//   //   navigation.setOptions({
//   //     headerTitle: '',
//   //     headerStyle: {
//   //       backgroundColor: '#00CED1',
//   //     },
//   //     headerLeft: () => (
//   //       <Image
//   //         style={{width: 140, height: 120, resizeMode: 'contain'}}
//   //         source={{
//   //           uri: 'https://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c518.png',
//   //         }}
//   //       />
//   //     ),
//   //     headerRight: () => (
//   //       <View
//   //         style={{
//   //           flexDirection: 'row',
//   //           alignItems: 'center',
//   //           gap: 6,
//   //           marginRight: 12,
//   //         }}>
//   //         <Ionicons name="notifications-outline" size={24} color="black" />

//   //         <AntDesign name="search1" size={24} color="black" />
//   //       </View>
//   //     ),
//   //   });
//   // }, []);
//   // const [user, setUser] = useState();
//   // useEffect(() => {
//   //   const fetchUserProfile = async () => {
//   //     try {
//   //       const response = await axios.get(`http://${Ip}:3000/profile/${userId}`);
//   //       const {user} = response.data;
//   //       setUser(user);
//   //     } catch (error) {
//   //       console.log('error profile user', error);
//   //     }
//   //   };

//   //   fetchUserProfile();
//   // }, []);

//   // // useEffect(() => {
//   // //   const fetchOrders = async () => {
//   // //     try {
//   // //       const response = await axios.get(`http:/${Ip}:3000/orders/${userId}`);
//   // //       const orders = response.data.orders;
//   // //       setOrders(orders);
//   // //       setLoading(false);
//   // //     } catch (error) {
//   // //       console.log('error profile order', error);
//   // //     }
//   // //   };

//   // //   fetchOrders();
//   // // }, []);

//   // return (
//   //   <ScrollView style={{padding: 10, flex: 1, backgroundColor: 'white'}}>
//   //     <Text style={{fontSize: 16, fontWeight: 'bold'}}>
//   //       Welcome {user?.name}
//   //     </Text>

//   //     <View
//   //       style={{
//   //         flexDirection: 'row',
//   //         alignItems: 'center',
//   //         gap: 10,
//   //         marginTop: 12,
//   //       }}>
//   //       <TouchableOpacity
//   //         style={{
//   //           padding: 10,
//   //           backgroundColor: '#E0E0E0',
//   //           borderRadius: 25,
//   //           flex: 1,
//   //         }}>
//   //         <Text style={{textAlign: 'center'}}>Your orders</Text>
//   //       </TouchableOpacity>

//   //       <TouchableOpacity
//   //         style={{
//   //           padding: 10,
//   //           backgroundColor: '#E0E0E0',
//   //           borderRadius: 25,
//   //           flex: 1,
//   //         }}>
//   //         <Text style={{textAlign: 'center'}}>Your Account</Text>
//   //       </TouchableOpacity>
//   //     </View>

//   //     <View
//   //       style={{
//   //         flexDirection: 'row',
//   //         alignItems: 'center',
//   //         gap: 10,
//   //         marginTop: 12,
//   //       }}>
//   //       <TouchableOpacity
//   //         style={{
//   //           padding: 10,
//   //           backgroundColor: '#E0E0E0',
//   //           borderRadius: 25,
//   //           flex: 1,
//   //         }}>
//   //         <Text style={{textAlign: 'center'}}>Buy Again</Text>
//   //       </TouchableOpacity>

//   //       <TouchableOpacity
//   //         onPress={logout}
//   //         style={{
//   //           padding: 10,
//   //           backgroundColor: '#E0E0E0',
//   //           borderRadius: 25,
//   //           flex: 1,
//   //         }}>
//   //         <Text style={{textAlign: 'center'}}>Logout</Text>
//   //       </TouchableOpacity>
//   //     </View>

//   //     <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//   //       {loading ? (
//   //         <LottieView
//   //           source={require('../../assets/animation/loading.json')}
//   //           autoPlay
//   //           loop
//   //           style={{
//   //             width: 70,
//   //             height: 70,
//   //           }}
//   //         />
//   //       ) : orders.length > 0 ? (
//   //         orders.map(order => (
//   //           <TouchableOpacity
//   //             style={{
//   //               marginTop: 20,
//   //               padding: 15,
//   //               borderRadius: 8,
//   //               borderWidth: 1,
//   //               borderColor: '#d0d0d0',
//   //               marginHorizontal: 10,
//   //               justifyContent: 'center',
//   //               alignItems: 'center',
//   //             }}
//   //             key={order._id}>
//   //             {/* Render the order information here */}
//   //             {order.products.slice(0, 1)?.map(product => (
//   //               <View style={{marginVertical: 10}} key={product._id}>
//   //                 <Image
//   //                   source={{uri: product.image}}
//   //                   style={{width: 100, height: 100, resizeMode: 'contain'}}
//   //                 />
//   //               </View>
//   //             ))}
//   //           </TouchableOpacity>
//   //         ))
//   //       ) : (
//   //         <Text>No orders found</Text>
//   //       )}
//   //     </ScrollView>
//   //   </ScrollView>
//   // );
// };

function Profile() {
  const navigation = useNavigation();
  const logout = async () => {
    await AsyncStorage.removeItem('authToken');
    navigation.replace('AuthStack');
  };
  return (
    <View style={styles.container}>
      <View style={styles.backGroundImage}>
        <Image
          style={styles.userImage}
          source={{
            uri: 'https://scontent.fsgn19-1.fna.fbcdn.net/v/t39.30808-1/409605809_2046023819099995_2387937422268289495_n.jpg?stp=c3.0.240.240a_dst-jpg_p240x240&_nc_cat=105&ccb=1-7&_nc_sid=5740b7&_nc_ohc=fRHb2JJzAzsAX9CORDx&_nc_ht=scontent.fsgn19-1.fna&oh=00_AfDNIHYd-mGXInaRnKO4NtfBNTK40JeddBRn0RIvtf7I3A&oe=6584FD94',
          }}
        />
        <View style={styles.userMemberShip}>
          <View style={styles.userMemberShipRow}>
            <Ionicons name="ribbon" size={24} color={COLORS.orange} />
            <Text style={styles.userMemberShipText}>Gold member</Text>
          </View>
          <View style={styles.userMemberShipRow}>
            <Ionicons name="bag-handle" size={24} color={COLORS.orange} />
            <Text style={styles.userMemberShipText}>Total orders: 6</Text>
          </View>
        </View>
      </View>
      <View style={styles.userInfoList}>
        <View style={styles.userInfoItem}>
          <Ionicons name="person" size={24} color={COLORS.primary} />
          <Text style={styles.userInfoItemText}>Gia Bảo</Text>
        </View>
        <View style={styles.userInfoItem}>
          <Ionicons name="call-sharp" size={24} color={COLORS.primary} />
          <Text style={styles.userInfoItemText}>0934102546</Text>
        </View>
        <View style={styles.userInfoItem}>
          <Ionicons name="mail-sharp" size={24} color={COLORS.primary} />
          <Text style={styles.userInfoItemText}>21521864@gmail.com</Text>
        </View>
        <View style={styles.userInfoItem}>
          <Ionicons name="location-sharp" size={24} color={COLORS.primary} />
          <Text style={styles.userInfoItemText}>
            Tổ 15, ấp Phước Long, xã tân hoà, thị xã Phú Mỹ
          </Text>
        </View>
        <View style={styles.buttons}>
          <CustomButton text={'Change password'} widh={160} />
          <CustomButton text={'Logout'} widh={160} onPress={logout} />
        </View>
      </View>
    </View>
  );
}
export default Profile;

import {Text, View, TouchableOpacity, ScrollView} from 'react-native';
import styles from './home.style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Welcome, Carousels, Heading} from '../../components/home';
import ProductRow from '../../products/ProductRow/ProductRow';
import {useState, useEffect, useContext} from 'react';
import {UserType} from '../../UserContext';
import {useNavigation} from '@react-navigation/native';
import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {
  BottomModal,
  SlideAnimation,
  ModalContent,
  ModalPortal,
} from 'react-native-modals';
import {COLORS} from '../../constants';

function Home() {
  const navigation = useNavigation();

  const {userId, setUserId} = useContext(UserType);

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAdress] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    if (userId) {
      fetchAddresses();
    }
  }, [userId, modalVisible]);
  const fetchAddresses = async () => {
    try {
      const response = await axios.get(
        `http://192.168.1.4:3000/addresses/${userId}`,
      );
      const {addresses} = response.data;

      setAddresses(addresses);
    } catch (error) {
      console.log('error', error);
    }
  };
  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem('authToken');

      const decodedToken = jwt_decode(token);

      const userId = decodedToken.userId;
      console.log(userId);
      setUserId(userId);
    };

    fetchUser();
  }, []);

  return (
    <View>
      <View style={styles.appBarWrapper}>
        <View style={styles.appBar}>
          <TouchableOpacity
            hitSlop={{top: 40, bottom: 40, left: 40, right: 40}}
            onPress={() => setModalVisible(!modalVisible)}>
            <Ionicons name="location-outline" size={24} />
          </TouchableOpacity>

          <TouchableOpacity
            hitSlop={{top: 40, bottom: 40}}
            onPress={() => setModalVisible(!modalVisible)}>
            {selectedAddress ? (
              <Text style={styles.location}>
                {selectedAddress?.name} - {selectedAddress?.street}
              </Text>
            ) : (
              <Text style={styles.location}>Add an Address</Text>
            )}
          </TouchableOpacity>

          <View style={{alignItems: 'flex-end'}}>
            <View style={styles.cartCount}>
              <Text style={styles.cartNumber}>8</Text>
            </View>
            <TouchableOpacity>
              <Fontisto name="shopping-bag" size={24} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ScrollView>
        <Welcome />
        <Carousels />
        <Heading />
        <ProductRow />
      </ScrollView>
      <BottomModal
        onBackdropPress={() => setModalVisible(!modalVisible)}
        swipeDirection={['up', 'down']}
        swipeThreshold={200}
        modalAnimation={
          new SlideAnimation({
            slideFrom: 'bottom',
          })
        }
        onHardwareBackPress={() => setModalVisible(!modalVisible)}
        visible={modalVisible}
        onTouchOutside={() => setModalVisible(!modalVisible)}>
        <ModalContent style={styles.modal}>
          <View style={{marginBottom: 8}}>
            <Text style={styles.addressTitle}>Choose your Location</Text>

            <Text style={styles.addressDesc}>
              Select a delivery location to see product availabilty and delivery
              options
            </Text>
          </View>

          <View style={styles.addressScroll}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {/* already added addresses */}

              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                  navigation.navigate('AddAddress');
                }}
                style={styles.addressAddBox}>
                <AntDesign
                  name="pluscircleo"
                  size={24}
                  color={COLORS.blue}
                  style={{marginBottom: 10}}
                />
                <Text style={styles.addressAddTxt}>Add a new Address</Text>
              </TouchableOpacity>

              {addresses?.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSelectedAdress(item)}
                  style={styles.addressLect(
                    selectedAddress === item ? '#FBCEB1' : 'white',
                  )}>
                  <View style={styles.addressName}>
                    <Text style={styles.addressTxt}>{item?.name}</Text>
                    <Ionicons
                      name="location-outline"
                      size={24}
                      color={COLORS.blue}
                    />
                  </View>
                  <Text numberOfLines={1} style={styles.addressDetail}>
                    {item?.city}
                  </Text>
                  <Text numberOfLines={1} style={styles.addressDetail}>
                    {item?.houseNumber},{item?.street}
                  </Text>

                  <Text numberOfLines={1} style={styles.addressDetail}>
                    Viet Nam
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={styles.addressOptContainer}>
            <View style={styles.addressOpt}>
              <Ionicons name="locate-sharp" size={22} color={COLORS.blue} />
              <Text style={styles.addressOptTxt}>Use My Currect location</Text>
            </View>

            <View style={styles.addressOpt}>
              <AntDesign name="earth" size={22} color={COLORS.blue} />

              <Text style={styles.addressOptTxt}>
                Deliver outside Ho Chi Minh city
              </Text>
            </View>
          </View>
        </ModalContent>
      </BottomModal>
      <ModalPortal />
    </View>
  );
}

export default Home;

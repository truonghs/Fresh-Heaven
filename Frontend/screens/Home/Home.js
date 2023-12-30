import {Text, View, TouchableOpacity, ScrollView, Pressable, PermissionsAndroid, Platform} from 'react-native';
import styles from './Home.style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

import {Welcome, Slider, Heading} from '../../components/home';
import ProductRow from '../../components/products/ProductRow/ProductRow';
import React, {useState, useEffect, useContext} from 'react';
import {userContext} from '../../Context/UserContext';
import {productsContext} from '../../Context/ProductContext';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import Ip from '../../constants/ipAddress';
import {BottomModal, SlideAnimation, ModalContent, ModalPortal} from 'react-native-modals';
import {COLORS} from '../../constants';

function Home({route}) {
  const navigation = useNavigation();
  const {userId, currentUser, setCurrentUser} = useContext(userContext);
  const {products, isLoadingProducts} = useContext(productsContext);
  const [selectedAddress, setSelectedAdress] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isScrollEnable, setIsScrollEnable] = useState(true);
  const arr = products;
  // useEffect(() => {}, [isLoadingProducts]);
  useEffect(() => {
    if (userId) {
      getUserInfo();
    }
  }, [userId]);
  const getUserInfo = async () => {
    await axios
      .get(`http://${Ip}:3000/profile/${userId}`)
      .then(({data}) => {
        setCurrentUser(data.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePickAddress = (item) => {
    setSelectedAdress(item);
    setModalVisible(false);
  };
  const getPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          navigation.navigate('Map', {name: 'Home'});
          setModalVisible(false);
        } else {
          console.log('Camera permission denied');
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  useEffect(() => {
    const getCurrenrtLocation = async () => {
      if (route.params) {
        await axios
          .get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${route.params.location.latitude}&lon=${route.params.location.longitude}`)
          .then(({data}) => {
            const newAddress = {
              fullName: currentUser.firstName + ' ' + currentUser.lastName,
              phoneNumber: currentUser.phoneNumber,
              latitude: data.lat,
              longitude: data.lon,
              addressDetail: data.display_name,
            };
            setCurrentUser({
              ...currentUser,
              addresses: [...currentUser.addresses, newAddress],
            });
            axios
              .put(`http://${Ip}:3000/setaddresses/${userId}`, newAddress)
              .then((response) => {
                console.log('add location success');
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    };
    getCurrenrtLocation();
  }, [route.params]);
  return (
    <View>
      <View style={styles.appBarWrapper}>
        <View style={styles.appBar}>
          <TouchableOpacity hitSlop={{top: 40, bottom: 40, left: 40, right: 40}} onPress={() => setModalVisible(true)}>
            <View style={styles.addressContainer}>
              <Ionicons name="location-outline" size={26} color={COLORS.red} />
              <View>
                {selectedAddress ? (
                  <Text numberOfLines={1} style={styles.location}>
                    {selectedAddress}
                  </Text>
                ) : (
                  <Text numberOfLines={1} style={styles.location}>
                    {Object.keys(currentUser).length > 0 ? currentUser.addresses[0]?.addressDetail : 'Add an address'}
                  </Text>
                )}
              </View>
            </View>
          </TouchableOpacity>

          <View style={{alignItems: 'flex-end'}}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Order');
              }}
            >
              <View style={styles.dot} />
              <View style={styles.headingIcon}>
                <Feather name="bell" size={24} color={COLORS.secondary} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <Welcome />
      <ScrollView showsVerticalScrollIndicator={false} scrollEnabled={isScrollEnable}>
        <View style={styles.scrollView}>
          <Slider setIsScrollEnable={setIsScrollEnable} />
          <Heading title={'Super Fresh'} />

          <ProductRow products={products} isLoadingProducts={isLoadingProducts} amount={10} />
          <Heading title={'Special Offer'} />

          <ProductRow products={products} isLoadingProducts={isLoadingProducts} amount={20} from={10} />
        </View>
      </ScrollView>
      <BottomModal
        visible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        modalAnimation={
          new SlideAnimation({
            slideFrom: 'bottom',
          })
        }
        onSwipeOut={() => setModalVisible(false)}
        onHardwareBackPress={() => setModalVisible(false)}
        onTouchOutside={() => setModalVisible(false)}
        style={styles.modalContainer}
      >
        <ModalContent style={styles.modal}>
          <View style={{marginBottom: 8}}>
            <Text style={styles.addressTitle}>Choose your Location</Text>

            <Text style={styles.addressDesc}>Select a delivery location to see product availabilty and delivery options</Text>
          </View>

          <View style={styles.addressScroll}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {/* already added addresses */}

              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                  navigation.navigate('AddAddress', {name: 'AddAddress'});
                }}
                style={styles.addressAddBox}
              >
                <AntDesign name="pluscircleo" size={24} color={COLORS.blue} style={{marginBottom: 10}} />
                <Text style={styles.addressAddTxt}>Add a new Address</Text>
              </TouchableOpacity>

              {currentUser.addresses?.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handlePickAddress(item.addressDetail)}
                  style={styles.addressLect(selectedAddress.addressDetail == item.addressDetail ? COLORS.brownlight : 'white')}
                >
                  <View style={styles.addressName}>
                    <Text style={styles.addressTxt(selectedAddress.addressDetail == item.addressDetail ? COLORS.red : COLORS.blue)}>{item?.name}</Text>
                    <Ionicons name="location-outline" size={24} color={selectedAddress.addressDetail == item.addressDetail ? COLORS.red : COLORS.blue} />
                  </View>
                  <Text numberOfLines={1} style={styles.addressDetail}>
                    {item.addressDetail}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={styles.addressOptContainer}>
            <TouchableOpacity style={styles.addressOpt} onPress={getPermission}>
              <Ionicons name="locate-sharp" size={22} color={COLORS.blue} />
              <Text style={styles.addressOptTxt}>Use My Currect location</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
                navigation.navigate('AddressDetail');
              }}
              style={styles.addressOpt}
            >
              <AntDesign name="earth" size={22} color={COLORS.blue} />

              <Text style={styles.addressOptTxt}>View all Addresses</Text>
            </TouchableOpacity>
          </View>
        </ModalContent>
      </BottomModal>
    </View>
  );
}

export default React.memo(Home);

import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from 'react-native';
import styles from './Home.style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

import {Welcome, Slider, Heading} from '../../components/home';
import ProductRow from '../../components/products/ProductRow/ProductRow';
import {useState, useEffect, useContext} from 'react';
import {userContext} from '../../Context/UserContext';
import {productsContext} from '../../Context/ProductContext';
import {cartContext} from '../../Context/CartContext';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import Ip from '../../constants/ipAddress';
import {
  BottomModal,
  SlideAnimation,
  ModalContent,
  ModalPortal,
} from 'react-native-modals';
import {COLORS} from '../../constants';

function Home() {
  // console.log('home');
  const navigation = useNavigation();
  const {cart} = useContext(cartContext);
  const {userId, setUserId} = useContext(userContext);
  const {products, isLoadingProducts} = useContext(productsContext);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAdress] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isScrollEnable, setIsScrollEnable] = useState(true);
  // useEffect(() => {}, [isLoadingProducts]);
  useEffect(() => {
    if (userId) {
      fetchAddresses();
    }
  }, [userId, modalVisible]);
  const fetchAddresses = async () => {
    try {
      const response = await axios.get(`http://${Ip}:3000/addresses/${userId}`);
      const {addresses} = response.data;
      setAddresses(addresses);
    } catch (error) {
      console.log('error home', error);
    }
  };

  const handlePickAddress = item => {
    setSelectedAdress(item);
    setModalVisible(!modalVisible);
  };
  const addProduct = async () => {
    try {
      const response = await axios.post(`http://${Ip}:3000/api/products/add`);
      console.log('added an product!');
    } catch (error) {
      console.log('error home', error);
    }
  };
  const handleAddProduct = () => {
    addProduct();
  };
  return (
    <View>
      <View style={styles.appBarWrapper}>
        <View style={styles.appBar}>
          <TouchableOpacity
            hitSlop={{top: 40, bottom: 40, left: 40, right: 40}}
            onPress={() => setModalVisible(!modalVisible)}>
            <View style={styles.addressContainer}>
              <Ionicons name="location-outline" size={26} color={COLORS.red} />
              <View>
                {selectedAddress ? (
                  <Text numberOfLines={1} style={styles.location}>
                    {selectedAddress?.name} - {selectedAddress?.houseNumber},{' '}
                    {selectedAddress?.detail}
                  </Text>
                ) : (
                  <Text style={styles.location}>Add an Address</Text>
                )}
              </View>
            </View>
          </TouchableOpacity>

          <View style={{alignItems: 'flex-end'}}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Cart');
              }}>
              <View style={styles.dot} />
              <View style={styles.headingIcon}>
                <Feather name="bell" size={24} color={COLORS.secondary} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <Welcome />
      <ScrollView
        showsVerticalScrollIndicator={false}
        scrollEnabled={isScrollEnable}>
        <View style={styles.scrollView}>
          <Slider setIsScrollEnable={setIsScrollEnable} />
          <Heading />
          {/* <TouchableOpacity onPress={handleAddProduct}>
            <Text style={styles.addProduct}>Add Product</Text>
          </TouchableOpacity> */}
          <ProductRow
            products={products}
            isLoadingProducts={isLoadingProducts}
          />
        </View>
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
                  onPress={() => handlePickAddress(item)}
                  style={styles.addressLect(
                    selectedAddress._id == item._id
                      ? COLORS.brownlight
                      : 'white',
                  )}>
                  <View style={styles.addressName}>
                    <Text
                      style={styles.addressTxt(
                        selectedAddress._id == item._id
                          ? COLORS.red
                          : COLORS.blue,
                      )}>
                      {item?.name}
                    </Text>
                    <Ionicons
                      name="location-outline"
                      size={24}
                      color={
                        selectedAddress._id == item._id
                          ? COLORS.red
                          : COLORS.blue
                      }
                    />
                  </View>
                  <Text numberOfLines={1} style={styles.addressDetail}>
                    {item?.city}
                  </Text>
                  <Text numberOfLines={1} style={styles.addressDetail}>
                    {item?.houseNumber},{item?.detail}
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

            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
                navigation.navigate('AddressDetail');
              }}
              style={styles.addressOpt}>
              <AntDesign name="earth" size={22} color={COLORS.blue} />

              <Text style={styles.addressOptTxt}>View all Addresses</Text>
            </TouchableOpacity>
          </View>
        </ModalContent>
      </BottomModal>
      <ModalPortal />
    </View>
  );
}

export default Home;

import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  Pressable,
} from 'react-native';
import styles from './Confirm.style';

import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ip from '../../constants/ipAddress';
import {UserType} from '../../UserContext';
import {useDispatch, useSelector} from 'react-redux';
import {cleanCart} from '../../redux/CartReducer';
import {useNavigation} from '@react-navigation/native';
import RazorpayCheckout from 'react-native-razorpay';
import {COLORS, SIZES} from '../../constants';

const Confirm = () => {
  const steps = [
    {title: 'Address', content: 'Address Form'},
    {title: 'Delivery', content: 'Delivery Options'},
    {title: 'Payment', content: 'Payment Details'},
    {title: 'Place Order', content: 'Order Summary'},
  ];
  const navigation = useNavigation();
  const [currentStep, setCurrentStep] = useState(0);
  const [addresses, setAddresses] = useState([]);
  const {userId, setUserId} = useContext(UserType);
  const cart = useSelector(state => state.cart.cart);
  const total = cart
    ?.map(item => item.price * item.quantity)
    .reduce((curr, prev) => curr + prev, 0);
  useEffect(() => {
    fetchAddresses();
  }, []);
  const fetchAddresses = async () => {
    try {
      const response = await axios.get(`http://${Ip}:3000/addresses/${userId}`);
      const {addresses} = response.data;

      setAddresses(addresses);
    } catch (error) {
      console.log('error', error);
    }
  };
  const dispatch = useDispatch();
  const [address, setAdress] = useState('');
  const [delivery, setDelivery] = useState('');
  const [payment, setPayment] = useState('');
  const [totalFee, setTotalFee] = useState(total);
  const handlePlaceOrder = async () => {
    try {
      const orderData = {
        userId: userId,
        cartItems: cart,
        totalPrice: totalFee,
        shippingAddress: address,
        paymentMethod: payment,
      };
      console.log(cart);

      const response = await axios.post(`http://${Ip}:3000/orders`, orderData);
      if (response.status === 200) {
        navigation.navigate('Order');
        dispatch(cleanCart());
        console.log('order created successfully', response.data);
      } else {
        console.log('error creating order', response.data);
      }
    } catch (error) {
      console.log('errror', error);
    }
  };
  const handlePayment = () => {
    if (payment) {
      if (payment == 'cash') setCurrentStep(3);
      else {
        Alert.alert('UPI/Debit card', 'Pay Online', [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel is pressed'),
          },
          {
            text: 'OK',
            onPress: () => pay(),
          },
        ]);
      }
    } else {
      null;
    }
  };
  const pay = async () => {
    try {
      const options = {
        description: 'Adding To Wallet',
        currency: 'USD',
        name: 'FuHu',
        key: 'rzp_test_sdciHp38y8KMZ1',
        amount: totalFee,
        prefill: {},
        theme: {color: COLORS.thirth},
      };

      const data = await RazorpayCheckout.open(options);

      console.log(data);

      const orderData = {
        userId: userId,
        cartItems: cart,
        totalPrice: totalFee,
        shippingAddress: address,
        paymentMethod: 'card',
      };

      const response = await axios.post(`http://${Ip}:3000/orders`, orderData);
      if (response.status === 200) {
        navigation.navigate('Order');
        dispatch(cleanCart());
        console.log('order created successfully', response.data);
      } else {
        console.log('error creating order', response.data);
      }
    } catch (error) {
      console.log('error', error);
    }
  };
  return (
    <ScrollView>
      <View style={styles.mainContainer}>
        <View style={styles.heading}>
          {steps?.map((step, index) => (
            <View
              style={{justifyContent: 'center', alignItems: 'center'}}
              key={index}>
              {index > 0 && (
                <View
                  style={[
                    {flex: 1, height: 2, backgroundColor: 'green'},
                    index <= currentStep && {backgroundColor: 'green'},
                  ]}
                />
              )}
              <View
                style={[
                  styles.step,
                  index < currentStep && {backgroundColor: 'green'},
                ]}>
                {index < currentStep ? (
                  <Text style={styles.stepircleTxt}>&#10003;</Text>
                ) : (
                  <Text style={styles.stepTxt}>{index + 1}</Text>
                )}
              </View>
              <Text style={styles.stepTitle}>{step.title}</Text>
            </View>
          ))}
        </View>
      </View>

      {currentStep == 0 && (
        <View style={{marginHorizontal: 20}}>
          <Text style={styles.title}>Select Delivery Address</Text>

          <View>
            {addresses?.map((item, index) => (
              <Pressable
                onPress={() => setAdress(item)}
                key={index}
                style={[
                  styles.address,
                  {
                    borderColor:
                      address && address._id === item?._id
                        ? COLORS.thirth
                        : '#D0D0D0',
                  },
                ]}>
                <View style={{marginLeft: 6}}>
                  <View style={styles.addressTitle}>
                    <Text style={styles.addressTitleTxt}>{item?.name}</Text>
                    <Entypo name="location-pin" size={24} color="red" />
                  </View>

                  <Text style={styles.addressTxt}>
                    {item?.houseNumber}, {item?.detail}
                  </Text>

                  <Text style={styles.addressTxt}>{item?.city}</Text>

                  <Text style={styles.addressTxt}>Viet Nam</Text>

                  <Text style={styles.addressTxt}>
                    phone Number : {item?.phoneNumber}
                  </Text>

                  {/* <View style={styles.addressBtnContainer}>
                    <TouchableOpacity style={styles.addressBtn}>
                      <Text style={styles.addressBtnTxt}>Edit</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.addressBtn}>
                      <Text style={styles.addressBtnTxt}>Remove</Text>
                    </TouchableOpacity>
                  </View> */}

                  <View style={styles.addressSubmitContainer}>
                    {address && address._id === item?._id && (
                      <TouchableOpacity
                        onPress={() => setCurrentStep(1)}
                        style={styles.submitActive}>
                        <Text style={styles.submitTxt}>
                          Deliver to this Address
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </Pressable>
            ))}
          </View>
        </View>
      )}

      {currentStep == 1 && (
        <View style={{marginHorizontal: 20}}>
          <Text style={styles.title}>Choose delivery options</Text>

          <Pressable
            style={[
              styles.delivery,
              {
                borderColor: delivery == 'standard' ? COLORS.thirth : '#D0D0D0',
                opacity: delivery == 'fast' ? 0.5 : 1,
              },
            ]}
            onPress={() => {
              setDelivery('standard');
              setTotalFee(total + 2);
            }}>
            <View>
              <Text style={styles.deliveryTitle}>Standard: </Text>
              <Text style={styles.deliveryTxt}>- 5-7 days delivery</Text>
              <Text style={styles.deliveryTxt}>
                - Delivery fee: <Text style={styles.deliveryPrice}>2$</Text>
              </Text>
            </View>
          </Pressable>
          <Pressable
            style={[
              styles.delivery,
              {
                borderColor: delivery == 'fast' ? COLORS.thirth : '#D0D0D0',
                opacity: delivery == 'standard' ? 0.5 : 1,
              },
            ]}
            onPress={() => {
              setDelivery('fast');
              setTotalFee(total + 4);
            }}>
            <View>
              <Text style={styles.deliveryTitle}>Fast: </Text>
              <Text style={styles.deliveryTxt}>- 3-5 days delivery</Text>
              <Text style={styles.deliveryTxt}>
                - Delivery fee: <Text style={styles.deliveryPrice}>4$</Text>
              </Text>
            </View>
          </Pressable>

          <TouchableOpacity
            onPress={() => {
              delivery ? setCurrentStep(2) : null;
            }}
            style={delivery ? styles.submitActive : styles.submitInActive}>
            <Text style={styles.submitTxt}>Continue</Text>
          </TouchableOpacity>
        </View>
      )}

      {currentStep == 2 && (
        <View style={{marginHorizontal: 20}}>
          <Text style={styles.title}>Select payment Method</Text>

          <Pressable
            onPress={() => setPayment('cash')}
            style={[
              styles.payment,
              {
                borderColor: payment == 'cash' ? COLORS.thirth : 'white',
              },
            ]}>
            <Text style={{color: payment == 'cash' ? '#000' : COLORS.gray}}>
              Cash on Delivery
            </Text>
          </Pressable>

          <Pressable
            onPress={() => {
              setPayment('card');
            }}
            style={[
              styles.payment,
              {
                borderColor: payment == 'card' ? COLORS.thirth : 'white',
              },
            ]}>
            <Text style={{color: payment == 'card' ? '#000' : COLORS.gray}}>
              Credit or debit card
            </Text>
          </Pressable>
          <TouchableOpacity
            onPress={() => handlePayment()}
            style={payment ? styles.submitActive : styles.submitInActive}>
            <Text style={styles.submitTxt}>Continue</Text>
          </TouchableOpacity>
        </View>
      )}

      {currentStep === 3 && payment === 'cash' && (
        <View style={{marginHorizontal: 20}}>
          <Text style={styles.title}>Order Now</Text>

          {/* <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 8,
              backgroundColor: 'white',
              padding: 8,
              borderColor: '#D0D0D0',
              borderWidth: 1,
              marginTop: 10,
            }}>
            <View>
              <Text style={{fontSize: 17, fontWeight: 'bold', color: '#000'}}>
                Save 5% and never run out
              </Text>
              <Text style={{fontSize: 15, color: 'gray', marginTop: 5}}>
                Turn on auto deliveries
              </Text>
            </View>

            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color="black"
            />
          </View> */}

          <View style={styles.orderDetail}>
            <Text style={styles.orderAddress}>
              Shipping to: {address?.name}
            </Text>

            <View style={styles.orderFee}>
              <Text style={styles.orderFeeTitle}>Items</Text>

              <Text style={styles.orderFeeTxt}>${total}</Text>
            </View>

            <View style={styles.orderFee}>
              <Text style={styles.orderFeeTitle}>Delivery</Text>

              <Text style={styles.orderFeeTxt}>{totalFee - total}</Text>
            </View>

            <View style={styles.orderFee}>
              <Text style={styles.orderTotalFee}>Order Total</Text>

              <Text style={styles.orderFeeFinal}>${totalFee}</Text>
            </View>
          </View>

          <View style={styles.orderPayment}>
            <Text style={styles.orderPaymentTitle}>Pay With</Text>

            <Text style={styles.orderPaymentTxt}>Pay on delivery (Cash)</Text>
          </View>

          <TouchableOpacity
            onPress={handlePlaceOrder}
            style={styles.submitActive}>
            <Text style={styles.submitTxt}>Place your order</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

export default Confirm;

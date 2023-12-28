import {View, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {userContext} from '../../Context/UserContext';
import axios from 'axios';
import Ip from '../../constants/ipAddress';
import styles from './Order.style';
import {productsContext} from '../../Context/ProductContext';
import {Screen} from 'react-native-screens';
import CustomButton from '../../components/CustomButton/CustomButton';
import font from '../../assets/fonts/font';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {COLORS, SIZES} from '../../constants';
const Order = () => {
  const {userId} = useContext(userContext);
  const {products} = useContext(productsContext);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const fetchOrders = async () => {
    try {
      const response = await axios.get(`http://${Ip}:3000/api/order/orders/${userId}`);
      const {orders} = response.data;
      setOrders(orders);
      setIsLoading(false);
    } catch (error) {
      console.log('error on all order screen', error);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.productsContainer}>
          {!isLoading ? (
            orders?.map((item, index) => (
              <View key={index} style={styles.orderItemContainer}>
                <View style={styles.topRow}>
                  <View style={styles.imageContainer}>
                    <Image style={styles.productImage} source={{uri: products.find((product) => product._id == item.products[0].productId).imageUrl[0]}} />
                  </View>
                  <View style={styles.titleContainer}>
                    <View style={styles.titleRow}>
                      <Text numberOfLines={1} style={styles.title}>
                        {item.products[0].title}
                      </Text>
                    </View>
                    <View style={styles.moreRow}>
                      <View style={styles.typeRow}>
                        <Text style={styles.packing}>Type: {item.products[0].packing}</Text>
                        <Text style={styles.quantity}>Quantity: {item.products[0].quantity}</Text>
                      </View>
                      {item.products.length > 1 ? (
                        <TouchableOpacity style={styles.viewmoreContainer}>
                          <Text style={styles.viewmore}>View more</Text>
                          <MaterialIcons color={'#ccc'} name={'keyboard-arrow-right'} size={20} />
                        </TouchableOpacity>
                      ) : null}
                    </View>
                  </View>
                </View>
                <View style={styles.middleRow}>
                  <View style={styles.totalRow}>
                    <Text style={styles.totalProduct}>Total products: {item.totalProduct}</Text>
                  </View>
                  <View style={styles.priceRow}>
                    <Text style={styles.priceTitle}>Total Price:</Text>
                    <Text style={styles.priceValue}> ${item.totalPrice}</Text>
                  </View>
                </View>
                <View style={styles.statusRow}>
                  <Text style={styles.status}>The order has been successfully delivered</Text>
                </View>
                <View style={styles.feedbackRow}>
                  <CustomButton widh={200} height={40} text={'Leave a FeedBack'} />
                </View>
              </View>
            ))
          ) : (
            <ActivityIndicator size={SIZES.xxLarge} color={COLORS.primary} />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Order;

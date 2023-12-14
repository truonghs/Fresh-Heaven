import {Text, View, ScrollView, Image, TouchableOpacity} from 'react-native';
import React, {useContext} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import styles from './Cart.style';
import {userContext} from '../../Context/UserContext';
import {cartContext} from '../../Context/CartContext';
import {productsContext} from '../../Context/ProductContext';
import Ip from '../../constants/ipAddress';
import axios from 'axios';
const Cart = () => {
  const {userId} = useContext(userContext);
  const {cart, FetchCart, setCartData} = useContext(cartContext);
  const {products} = useContext(productsContext);
  const navigation = useNavigation();
  decreaseQuantity = item => {
    axios
      .post(`http://${Ip}:3000/decreasecart/${userId}`, {productId: item._id})
      .then(response => {
        setCartData({cart: response.data.cart, isLoadingCart: false});
        // FetchCart(userId);
      })
      .catch(error => {
        console.log('Cart error: ', error);
      });
  };
  increaseQuantity = item => {
    axios
      .post(`http://${Ip}:3000/increasecart/${userId}`, {productId: item._id})
      .then(response => {
        // FetchCart(userId);
        setCartData({cart: response.data.cart, isLoadingCart: false});
      })
      .catch(error => {
        console.log('Cart error: ', error);
      });
  };
  deleteItem = item => {
    console.log(item.title);
    axios
      .post(`http://${Ip}:3000/deletecart/${userId}`, {productId: item._id})
      .then(response => {
        // FetchCart(userId);
        setCartData({cart: response.data.cart, isLoadingCart: false});
      })
      .catch(error => {
        console.log('Cart error: ', error);
      });
  };
  return (
    <View style={styles.mainContainer}>
      <ScrollView style={styles.scroll}>
        <View style={{marginHorizontal: 10}}>
          {!cart.products ? (
            <Text style={styles.empty}>
              You don't have any thing in your cart.
            </Text>
          ) : null}
          {cart.products?.map((item, index) => (
            <View style={styles.main} key={index}>
              <View style={styles.productInfo}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('ProductDetail', {item: item.product})
                  }>
                  <Image
                    style={styles.productImg}
                    source={{uri: item.product?.imageUrl}}
                  />
                </TouchableOpacity>

                <View>
                  <Text numberOfLines={3} style={styles.productName}>
                    {item.product?.title}
                  </Text>
                  <Text style={styles.productPrice}>{item.product?.price}</Text>
                  <Image
                    style={styles.logo}
                    source={require('../../assets/images/logo-trans.png')}
                  />
                  <Text style={{color: 'green'}}>In Stock</Text>
                </View>
              </View>

              <View style={styles.quantity}>
                <View style={styles.quantityLeft}>
                  {item?.quantity > 1 ? (
                    <TouchableOpacity
                      onPress={() => decreaseQuantity(item.product)}
                      style={styles.decreaseBtn}>
                      <AntDesign name="minus" size={24} color="black" />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => deleteItem(item.product)}
                      style={styles.decreaseBtn}>
                      <AntDesign name="delete" size={24} color="black" />
                    </TouchableOpacity>
                  )}

                  <View style={styles.quantityTxt}>
                    <Text style={styles.txt}>{item?.quantity}</Text>
                  </View>

                  <TouchableOpacity
                    onPress={() => increaseQuantity(item.product)}
                    style={styles.increaseBtn}>
                    <Feather name="plus" size={24} color="black" />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={() => deleteItem(item.product)}
                  style={styles.deleteItem}>
                  <Text style={styles.txt}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <View>
        <Text style={styles.line} />
        <View style={styles.totalContainer}>
          <Text style={styles.totalTitle}>Subtotal : </Text>
          <Text style={styles.totalValue}>{cart.totalPrice}</Text>
        </View>
        {cart.totalProduct > 0 ? (
          <TouchableOpacity
            onPress={() => navigation.navigate('Confirm')}
            style={styles.buyBtn}>
            <Text style={styles.btnTxt}>
              Proceed to Buy ({cart.totalProduct}) items
            </Text>
          </TouchableOpacity>
        ) : (
          <View onPress={null} style={styles.buyBtnInActive}>
            <Text style={styles.btnTxt}>
              Proceed to Buy ({cart.totalProduct}) items
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default Cart;

import {Text, View, ScrollView, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import {
  decrementQuantity,
  incementQuantity,
  removeFromCart,
} from '../../redux/CartReducer';
import {useNavigation} from '@react-navigation/native';
import styles from './Cart.style';

const Cart = () => {
  const cart = useSelector(state => state.cart.cart);
  // const total = cart
  //   ?.map(item => item.price * item.quantity)
  //   .reduce((curr, prev) => curr + prev, 0);
  const total = useSelector(state => state.cart.total);
  const dispatch = useDispatch();
  const increaseQuantity = item => {
    dispatch(incementQuantity(item));
  };
  const decreaseQuantity = item => {
    dispatch(decrementQuantity(item));
  };
  const deleteItem = item => {
    dispatch(removeFromCart(item));
  };
  const navigation = useNavigation();
  return (
    <View style={styles.mainContainer}>
      <ScrollView style={styles.scroll}>
        <View style={{marginHorizontal: 10}}>
          {!cart[0] ? (
            <Text style={styles.empty}>
              You don't have any thing in your cart.
            </Text>
          ) : null}
          {cart?.map((item, index) => (
            <View style={styles.main} key={index}>
              <View style={styles.productInfo}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('ProductDetail', {item})}>
                  <Image
                    style={styles.productImg}
                    source={{uri: item?.imageUrl}}
                  />
                </TouchableOpacity>

                <View>
                  <Text numberOfLines={3} style={styles.productName}>
                    {item?.title}
                  </Text>
                  <Text style={styles.productPrice}>{item?.price}</Text>
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
                      onPress={() => decreaseQuantity(item)}
                      style={styles.decreaseBtn}>
                      <AntDesign name="minus" size={24} color="black" />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => deleteItem(item)}
                      style={styles.decreaseBtn}>
                      <AntDesign name="delete" size={24} color="black" />
                    </TouchableOpacity>
                  )}

                  <View style={styles.quantityTxt}>
                    <Text style={styles.txt}>{item?.quantity}</Text>
                  </View>

                  <TouchableOpacity
                    onPress={() => increaseQuantity(item)}
                    style={styles.increaseBtn}>
                    <Feather name="plus" size={24} color="black" />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={() => deleteItem(item)}
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
          <Text style={styles.totalValue}>{total}</Text>
        </View>
        {cart[0] ? (
          <TouchableOpacity
            onPress={() => navigation.navigate('Confirm')}
            style={styles.buyBtn}>
            <Text style={styles.btnTxt}>Proceed to Buy ({total}) items</Text>
          </TouchableOpacity>
        ) : (
          <View onPress={null} style={styles.buyBtnInActive}>
            <Text style={styles.btnTxt}>Proceed to Buy ({total}) items</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default Cart;

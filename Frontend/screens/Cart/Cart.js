import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Button,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import styles from './Cart.style';
import {userContext} from '../../Context/UserContext';
import {cartContext} from '../../Context/CartContext';
import {productsContext} from '../../Context/ProductContext';
import Ip from '../../constants/ipAddress';
import axios from 'axios';
import {COLORS} from '../../constants';
import font from '../../assets/fonts/font';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import LinearGradient from 'react-native-linear-gradient';
import GradientText from 'react-native-gradient-texts';
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from 'react-native-alert-notification';
import Alert from '../../components/CustomAlert/CustomAlert';
const Cart = () => {
  const {userId} = useContext(userContext);
  const {cartData, setCartData} = useContext(cartContext);
  const {products} = useContext(productsContext);
  const navigation = useNavigation();
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertParams, setAlertParams] = useState(false);

  const [cartInfo, setCartInfo] = useState({
    cartProducts: [],
    totalPrice: 0,
    totalProduct: 0,
  });
  const [count, setCount] = useState(0);
  const [orderInfo, setOrderInfo] = useState([]);
  // const [isChecked, setIsChecked] = useState(true);

  const setRenderData = () => {
    var totalPrice = 0;
    var cartProducts = [];
    var totalProduct = 0;
    cartData.cart.products?.forEach((item, index) => {
      const product = products.find(product => product._id == item.productId);

      const productPackingInfo = product.packing.find(
        element => element.unit == item.packing,
      );

      const productPrice =
        parseFloat(productPackingInfo.discount) != 0
          ? (parseFloat(productPackingInfo.price) *
              (100 - parseFloat(productPackingInfo.discount))) /
            100
          : parseFloat(productPackingInfo.price);

      totalPrice = totalPrice + productPrice * parseFloat(item.quantity);
      totalProduct += parseInt(item.quantity);

      cartProducts.push({
        product: product,
        finalPrice: productPrice,
        packing: item.packing,
        quantity: item.quantity,
        discount: productPackingInfo.discount,
        price: productPackingInfo.price,
      });
    });

    setCartInfo({
      cartProducts: cartProducts,
      totalPrice: totalPrice,
      totalProduct: totalProduct,
    });
  };
  useEffect(() => {
    setRenderData();
  }, [cartData]);

  const decreaseQuantity = item => {
    cartData.cart.products.forEach((element, index) => {
      if (
        element.productId == item.product._id &&
        element.packing == item.packing
      ) {
        tmp = cartData.cart;
        tmp.products[index].quantity--;

        setCartData({
          cart: tmp,
          totalProduct: cartData.totalProduct - 1,
          isLoadingCart: 'false',
        });
        setRenderData();
      }
    });
    updateCart(tmp);
  };
  const increaseQuantity = item => {
    cartData.cart.products.forEach((element, index) => {
      if (
        element.productId == item.product._id &&
        element.packing == item.packing
      ) {
        tmp = cartData.cart;
        tmp.products[index].quantity++;

        setCartData({
          cart: tmp,
          totalProduct: cartData.totalProduct + 1,
          isLoadingCart: 'false',
        });

        setRenderData();
      }
    });
    updateCart(tmp);
  };
  const deleteItem = item => {
    cartData.cart.products.forEach((element, index) => {
      if (
        element.productId == item.product._id &&
        element.packing == item.packing
      ) {
        tmp = cartData.cart;
        const quantity = tmp.products[index].quantity;
        tmp.products.splice(index, 1);
        setCartData({
          cart: tmp,
          totalProduct: cartData.totalProduct - quantity,
          isLoadingCart: 'false',
        });
        setRenderData();
      }
    });
    updateCart(tmp);
    setAlertVisible(false);
  };
  const handleDelete = item => {
    setAlertParams(item);
    setAlertVisible(true);
  };
  const updateCart = async item => {
    axios
      .put(`http://${Ip}:3000/api/cart/update-cart/${userId}`, {
        newCart: item,
      })
      .then(response => {})
      .catch(error => {
        console.log('Cart error: ', error);
      });
  };
  const setAddToOrder = item => {
    var newProductsList = orderInfo.products ? orderInfo.products : [];
    var totalPrice = orderInfo.totalPrice ? orderInfo.totalPrice : 0;
    var totalProducts = orderInfo.totalProducts ? orderInfo.totalProducts : 0;
    var isExisted = false;
    newProductsList.forEach((element, index) => {
      if (
        element.productId == item.product._id &&
        element.packing == item.packing
      ) {
        newProductsList.splice(index, 1);
        totalProducts = totalProducts - item.quantity;
        totalPrice =
          totalPrice - parseFloat(item.finalPrice) * parseFloat(item.quantity);
        isExisted = true;
      }
    });
    if (!isExisted) {
      newProductsList.push({
        productId: item.product._id,
        title: item.product.title,
        price: item.finalPrice,
        quantity: item.quantity,
        packing: item.packing,
      });
      totalPrice =
        totalPrice + parseFloat(item.finalPrice) * parseFloat(item.quantity);
      totalProducts = totalProducts + item.quantity;
    }
    const newOrder = {
      products: newProductsList,
      totalProducts: totalProducts,
      totalPrice: totalPrice,
    };
    setOrderInfo(newOrder);
  };
  return (
    <View style={styles.mainContainer}>
      <ScrollView style={styles.scroll}>
        <View style={{margin: 10}}>
          {cartData.cart.products == [] ? (
            <Text style={styles.empty}>
              You don't have any thing in your cart.
            </Text>
          ) : null}
          {cartInfo.cartProducts?.map((item, index) => {
            return (
              <View style={styles.main} key={index}>
                <View style={styles.productInfo}>
                  <View style={styles.checkArea}>
                    <BouncyCheckbox
                      style={styles.checkBox}
                      isChecked={false}
                      size={20}
                      fillColor={COLORS.primary}
                      unfillColor="#FFFFFF"
                      disableText={true}
                      iconStyle={{borderColor: COLORS.primary}}
                      innerIconStyle={{borderWidth: 2}}
                      textStyle={{fontFamily: font.regular}}
                      onPress={() => setAddToOrder(item)}
                    />
                  </View>
                  <TouchableOpacity
                    // onPress={() =>
                    //   navigation.navigate('ProductDetail', {
                    //     item: item.product,
                    //   })
                    // }
                    style={styles.imageContainer}>
                    <Image
                      style={styles.productImg}
                      source={{uri: item.product?.imageUrl[0]}}
                    />
                  </TouchableOpacity>

                  <View style={styles.detailArea}>
                    <View style={styles.nameRow}>
                      <TouchableOpacity
                      // onPress={() =>
                      //   navigation.navigate('ProductDetail', {
                      //     item: item.product,
                      //   })
                      // }
                      >
                        <Text numberOfLines={1} style={styles.productName}>
                          {item.product?.title}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handleDelete(item)}
                        style={styles.deleteItem}>
                        <AntDesign name="close" size={16} color={COLORS.red} />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.detailFlex}>
                      <View>
                        {item.discount == 0 ? (
                          <Text style={styles.productPriceFinal}>
                            ${item?.price}
                          </Text>
                        ) : (
                          <View style={styles.priceRow}>
                            <Text style={styles.productPrice}>
                              ${item?.price}
                            </Text>
                            <Text style={styles.productPriceFinal}>
                              ${item?.finalPrice}
                            </Text>
                          </View>
                        )}
                        <View style={styles.classifyRow}>
                          <Text style={styles.unitTitle}>Type: </Text>
                          <Text style={styles.unitText}>{item?.packing}</Text>
                        </View>
                      </View>
                      <View style={styles.quantity}>
                        <View style={styles.quantityLeft}>
                          <TouchableOpacity
                            onPress={() => decreaseQuantity(item)}
                            style={styles.decreaseBtn}>
                            <AntDesign
                              name="minus"
                              size={18}
                              color={COLORS.secondary}
                            />
                          </TouchableOpacity>

                          <View style={styles.quantityTxt}>
                            <Text style={styles.txt}>{item?.quantity}</Text>
                          </View>

                          <TouchableOpacity
                            onPress={() => increaseQuantity(item)}>
                            <LinearGradient
                              start={{x: 0, y: 0}}
                              end={{x: 1, y: 0}}
                              colors={[COLORS.primary, COLORS.secondary]}
                              style={styles.increaseBtn}>
                              <Feather
                                name="plus"
                                size={18}
                                color={COLORS.white}
                              />
                            </LinearGradient>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>

      {/* <View style={styles.checkOutContainer}> */}
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={[COLORS.primary, COLORS.secondary]}
        style={styles.checkOutContainer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalTitle}>Subtotal in cart: </Text>
          <Text style={styles.totalValue}>{cartInfo?.totalPrice}</Text>
        </View>
        <View style={styles.totalContainer}>
          <Text
            style={{
              ...styles.totalTitle,
              fontFamily: font.semiBold,
              color: COLORS.red,
              fontSize: 18,
            }}>
            Subtotal selected:{' '}
          </Text>
          <Text style={{...styles.totalValue, color: COLORS.red, fontSize: 20}}>
            {orderInfo?.totalPrice}
          </Text>
        </View>
        {orderInfo.products?.length > 0 ? (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Confirm', {orderData: orderInfo})
            }
            style={styles.buyBtn}>
            <GradientText
              text={`Proceed to Buy (${orderInfo.products?.length}) items`}
              fontSize={13}
              width={240}
              locations={{x: 120, y: 26}}
              isGradientFill
              height={46}
              style={styles.name}
              gradientColors={['#51e68a', '#1ac179']}
              fontFamily={font.bold}
            />
          </TouchableOpacity>
        ) : (
          <View onPress={null} style={styles.buyBtnInActive}>
            <Text style={{...styles.btnTxt, color: '#ccc'}}>
              Proceed to Buy ({0}) items
            </Text>
          </View>
        )}
      </LinearGradient>
      {/* </View> */}
      <Alert
        title={'Are you want to remove this product from your cart?'}
        setAlertVisible={setAlertVisible}
        alertVisible={alertVisible}
        leftBtnText={'Cancel'}
        rightBtnText={'Yes'}
        leftBtnFnc={() => setAlertVisible(false)}
        rightBtnFnc={() => deleteItem(alertParams)}
      />
    </View>
  );
};

export default Cart;

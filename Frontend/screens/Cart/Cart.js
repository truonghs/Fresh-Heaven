import {Text, View, ScrollView, Image, TouchableOpacity, FlatList, ActivityIndicator} from 'react-native';
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
import {COLORS, SIZES} from '../../constants';
import font from '../../assets/fonts/font';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import LinearGradient from 'react-native-linear-gradient';
import GradientText from 'react-native-gradient-texts';

import Alert from '../../components/CustomAlert/CustomAlert';
import {useIsFocused} from '@react-navigation/native';

const Cart = ({route}) => {
  const [visible, setVisible] = useState(true);
  console.log('begin: ', performance.now());
  const {cartData, setCartData} = useContext(cartContext);

  const {userId} = useContext(userContext);

  const {products} = useContext(productsContext);
  const navigation = useNavigation();
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertParams, setAlertParams] = useState(false);
  const [cartRenderData, setCartRenderData] = useState({
    cartRenderProducts: [],
    cartTotalPrice: 0,
    cartTotalProduct: 0,
  });
  const [isAddedByDefault, setIsAddedByDefault] = useState(false);
  const [orderInfo, setOrderInfo] = useState([]);
  const isFocused = useIsFocused();
  const [firstCheckedIndex, setFirstCheckedIndex] = useState(null);
  // const [checkBoxValues, setCheckBoxValues] = useState([])
  // Create Data for render
  useEffect(() => {
    if (isFocused) {
      createCartRenderData();
    }
  }, [cartData.cart, isFocused]);

  useEffect(() => {
    if (isFocused) {
      setVisible(true);
    } else {
      route.params = undefined;
      setVisible(false);

      setOrderInfo([]);
      setCartRenderData({
        cartRenderProducts: [],
        cartTotalPrice: 0,
        cartTotalProduct: 0,
      });
      setIsAddedByDefault(false);
    }
  }, [isFocused]);
  const createCartRenderData = () => {
    let newCartTotalPrice = 0;
    let newCartTotalProduct = 0;
    const newCartProducts = [];
    let totalIncart = 0;
    cartData.cart.products?.forEach((item, index) => {
      const cartProduct = products.find((product) => product._id == item.productId);
      const cartProductPacking = cartProduct.packing.find((element) => element.unit == item.packing);
      const cartProductFinalPrice =
        Math.round(
          parseFloat(cartProductPacking.discount) != 0
            ? ((parseFloat(cartProductPacking.price) * (100 - parseFloat(cartProductPacking.discount))) / 100) * 10
            : parseFloat(cartProductPacking.price) * 10,
        ) / 10;
      newCartTotalPrice = Math.round((newCartTotalPrice + cartProductFinalPrice * parseInt(item.quantity)) * 10) / 10;
      newCartTotalProduct += parseInt(item.quantity);
      if (cartRenderData ? cartRenderData.cartRenderProducts[index]?.inOrderIndex == undefined || cartRenderData.cartRenderProducts[index]?.inOrderIndex == null : false) {
        newCartProducts.push({
          product: cartProduct,
          finalPrice: cartProductFinalPrice,
          packing: item.packing,
          quantity: item.quantity,
          discount: cartProductPacking.discount,
          price: cartProductPacking.price,
          inOrderIndex: null,
          inCartIndex: index,
        });
      } else {
        newCartProducts.push({
          product: cartProduct,
          finalPrice: cartProductFinalPrice,
          packing: item.packing,
          quantity: item.quantity,
          discount: cartProductPacking.discount,
          price: cartProductPacking.price,
          inOrderIndex: totalIncart,
          inCartIndex: index,
        });
        totalIncart += 1;
      }
    });

    setCartRenderData({
      cartRenderProducts: newCartProducts,
      cartTotalPrice: Math.round(newCartTotalPrice * 10) / 10,
      cartTotalProduct: newCartTotalProduct,
    });
  };

  const handleDelete = (item, index) => {
    setAlertParams({item, index});
    setAlertVisible(true);
  };
  const setAddToOrder = (item, itemIndex) => {
    let newOrderProducts = orderInfo.products ? [...orderInfo.products] : [];
    let newOrderTotalPrice = orderInfo.totalPrice ? orderInfo.totalPrice : 0;
    let newOrderTotalProduct = orderInfo.totalProducts ? orderInfo.totalProducts : 0;
    let isExisted = false;
    let isAdded = false;
    let totalInOrder = 0;
    let newCartProducts = [...cartRenderData.cartRenderProducts];
    newOrderProducts?.forEach((element, index) => {
      if (element.productId == item.product._id && element.packing == item.packing) {
        newOrderTotalProduct = newOrderTotalProduct - element.quantity;
        newOrderTotalPrice = Math.round((newOrderTotalPrice - parseFloat(element.finalPrice) * parseFloat(element.quantity)) * 10) / 10;
        newOrderProducts.splice(index, 1);
        isExisted = true;
        isAdded = true;

        newCartProducts[itemIndex].inOrderIndex = null;
      }
      if (isExisted && newCartProducts[element.inCartIndex].inOrderIndex != null && newCartProducts[element.inCartIndex].inOrderIndex != undefined) {
        newCartProducts[element.inCartIndex].inOrderIndex -= 1;
      }

      if (!isExisted && itemIndex < element.inCartIndex) {
        newCartProducts[itemIndex].inOrderIndex = index;
        const newOrderItem = {
          productId: item.product._id,
          title: item.product.title,
          finalPrice: item.finalPrice,
          quantity: item.quantity,
          packing: item.packing,
          inCartIndex: itemIndex,
        };
        isExisted = true;
        isAdded = true;

        newOrderProducts.splice(index, 0, newOrderItem);

        newOrderTotalPrice = Math.round((newOrderTotalPrice + parseFloat(item.finalPrice) * parseFloat(item.quantity)) * 10) / 10;
        newOrderTotalProduct = newOrderTotalProduct + item.quantity;
      }
      totalInOrder += 1;
    });
    if (!isExisted && !isAdded) {
      newCartProducts[itemIndex].inOrderIndex = totalInOrder;

      newOrderProducts.push({
        productId: item.product._id,
        title: item.product.title,
        finalPrice: item.finalPrice,
        quantity: item.quantity,
        packing: item.packing,
        inCartIndex: totalInOrder,
      });
      newOrderTotalPrice = Math.round((newOrderTotalPrice + parseFloat(item.finalPrice) * parseFloat(item.quantity)) * 10) / 10;
      newOrderTotalProduct = newOrderTotalProduct + item.quantity;
      console.log(newOrderTotalPrice);
    }

    // setCartInfo({
    //   cartProducts: cartProducts,
    //   totalPrice: totalPrice,
    //   totalProduct: totalProduct,
    // });
    const newOrder = {
      products: newOrderProducts,
      totalProducts: newOrderTotalProduct,
      totalPrice: Math.round(newOrderTotalPrice * 10) / 10,
    };
    setOrderInfo(newOrder);
  };
  const decreaseQuantity = (item, itemIndex) => {
    let tmp = {...cartData.cart};
    tmp.products[itemIndex].quantity--;

    if (cartRenderData.cartRenderProducts[itemIndex].inOrderIndex != null && cartRenderData.cartRenderProducts[itemIndex].inOrderIndex != undefined) {
      let newOrderInfo = {...orderInfo};
      let newOrderProducts = [...orderInfo.products];
      newOrderProducts[cartRenderData.cartRenderProducts[itemIndex].inOrderIndex].quantity -= 1;
      newOrderInfo.totalPrice = Math.round((newOrderInfo.totalPrice - parseFloat(item.finalPrice)) * 10) / 10;
      newOrderInfo.totalProducts -= 1;
      newOrderInfo.products = newOrderProducts;
      setOrderInfo(newOrderInfo);
    }
    setCartData({
      cart: tmp,
      totalProduct: cartData.totalProduct - 1,
      isLoadingCart: 'false',
    });
    updateCart(tmp);
  };
  const increaseQuantity = (item, itemIndex) => {
    let tmp = {...cartData.cart};
    tmp.products[itemIndex].quantity++;

    if (cartRenderData.cartRenderProducts[itemIndex].inOrderIndex != null && cartRenderData.cartRenderProducts[itemIndex].inOrderIndex != undefined) {
      let newOrderInfo = {...orderInfo};
      let newOrderProducts = [...orderInfo.products];
      newOrderProducts[cartRenderData.cartRenderProducts[itemIndex].inOrderIndex].quantity += 1;
      newOrderInfo.totalPrice = Math.round((parseFloat(item.finalPrice) + newOrderInfo.totalPrice) * 10) / 10;
      newOrderInfo.totalProducts += 1;
      newOrderInfo.products = newOrderProducts;
      setOrderInfo(newOrderInfo);
    }
    setCartData({
      cart: tmp,
      totalProduct: cartData.totalProduct + 1,
      isLoadingCart: 'false',
    });
    updateCart(tmp);
  };
  const deleteItem = (item, itemIndex) => {
    let tmp = {...cartData.cart};
    const quantity = tmp.products[itemIndex].quantity;

    if (cartRenderData.cartRenderProducts[itemIndex].inOrderIndex != null && cartRenderData.cartRenderProducts[itemIndex].inOrderIndex != undefined) {
      let newOrderInfo = {...orderInfo};
      let newOrderProducts = [...orderInfo.products];

      newOrderInfo.totalProducts -= item.quantity;

      newOrderInfo.totalPrice = Math.round((newOrderInfo.totalPrice - parseFloat(item.finalPrice) * item.quantity) * 10) / 10;

      newOrderProducts.splice(cartRenderData.cartRenderProducts[itemIndex].inOrderIndex, 1);

      newOrderInfo.products = newOrderProducts;
      for (let i = cartRenderData.cartRenderProducts[itemIndex].inOrderIndex; i < newOrderProducts.length; i++) {
        newOrderProducts[i].inCartIndex -= 1;
      }
      setOrderInfo(newOrderInfo);
    }
    tmp.products.splice(itemIndex, 1);
    setCartData({
      cart: tmp,
      totalProduct: cartData.totalProduct - quantity,
      isLoadingCart: 'false',
    });
    updateCart(tmp);

    setAlertVisible(false);
  };
  const updateCart = async (item) => {
    axios
      .put(`http://${Ip}:3000/api/cart/update-cart/${userId}`, {
        newCart: item,
      })
      .then((response) => {})
      .catch((error) => {
        console.log('Cart error: ', error);
      });
  };
  //------------------------------------------------//
  useEffect(() => {
    console.log('CartData Changed!');
  }, [cartRenderData]);
  return (
    <View style={styles.mainContainer}>
      <View style={styles.scrollContainer}>
        {/* <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}> */}
        <View style={{margin: 10, flex: 1, paddingBottom: 40}}>
          {cartRenderData.cartRenderProducts == [] ? <Text style={styles.empty}>You don't have any thing in your cart.</Text> : null}
          {/* {cartRenderData.cartRenderProducts?.map((item, index) => {
              if (route.params?.firstCheckedIndex == index && !isAddedByDefault) {
                setAddToOrder(item, index);
                setIsAddedByDefault(true);
              }

              return (
                
              );
            })} */}
          {visible ? (
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={cartRenderData.cartRenderProducts ? cartRenderData.cartRenderProducts : []}
              horizontal={false}
              renderItem={({item, index}) => (
                <View style={styles.main} key={index}>
                  {index == cartRenderData.cartRenderProducts.length - 1 ? console.log('end: ', performance.now()) : null}
                  <View style={styles.productInfo}>
                    <View style={styles.checkArea}>
                      <BouncyCheckbox
                        style={styles.checkBox}
                        isChecked={item.inOrderIndex != null && item.inOrderIndex != undefined ? true : false}
                        size={20}
                        fillColor={COLORS.primary}
                        unfillColor="#FFFFFF"
                        disableText={true}
                        iconStyle={{borderColor: COLORS.primary}}
                        innerIconStyle={{borderWidth: 2}}
                        textStyle={{fontFamily: font.regular}}
                        onPress={() => setAddToOrder(item, index)}
                      />
                    </View>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('ProductDetail', {
                          product: item.product,
                        })
                      }
                      style={styles.imageContainer}
                    >
                      <Image style={styles.productImg} source={{uri: item.product?.imageUrl[0]}} />
                    </TouchableOpacity>

                    <View style={styles.detailArea}>
                      <View style={styles.nameRow}>
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate('ProductDetail', {
                              product: item.product,
                            })
                          }
                        >
                          <Text numberOfLines={1} style={styles.productName}>
                            {item.product?.title}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleDelete(item, index)} style={styles.deleteItem}>
                          <AntDesign name="close" size={16} color={COLORS.red} />
                        </TouchableOpacity>
                      </View>
                      <View style={styles.detailFlex}>
                        <View>
                          {item.discount == 0 ? (
                            <Text style={styles.productPriceFinal}>${item?.price}</Text>
                          ) : (
                            <View style={styles.priceRow}>
                              <Text style={styles.productPrice}>${item?.price}</Text>
                              <Text style={styles.productPriceFinal}>${item?.finalPrice}</Text>
                            </View>
                          )}
                          <View style={styles.classifyRow}>
                            <Text style={styles.unitTitle}>Type: </Text>
                            <Text style={styles.unitText}>{item?.packing}</Text>
                          </View>
                        </View>
                        <View style={styles.quantity}>
                          <View style={styles.quantityLeft}>
                            <TouchableOpacity onPress={() => (item.quantity > 1 ? decreaseQuantity(item, index) : handleDelete(item, index))} style={styles.decreaseBtn}>
                              <AntDesign name="minus" size={18} color={COLORS.secondary} />
                            </TouchableOpacity>

                            <View style={styles.quantityTxt}>
                              <Text style={styles.txt}>{item?.quantity}</Text>
                            </View>

                            <TouchableOpacity
                              onPress={() => {
                                increaseQuantity(item, index);
                              }}
                            >
                              <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={[COLORS.primary, COLORS.secondary]} style={styles.increaseBtn}>
                                <Feather name="plus" size={18} color={COLORS.white} />
                              </LinearGradient>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              )}
              keyExtractor={(item, index) => index}
            />
          ) : null}
        </View>
        {/* </ScrollView> */}
      </View>

      {/* <View style={styles.checkOutContainer}> */}
      <View style={styles.checkOutBase}>
        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={[COLORS.primary, COLORS.secondary]} style={styles.checkOutContainer}>
          <View style={styles.totalContainer}>
            <Text style={styles.totalTitle}>Subtotal in cart: </Text>
            <Text style={{...styles.totalValue, fontFamily: font.semiBold}}>${cartRenderData?.cartTotalPrice ? cartRenderData?.cartTotalPrice : 0}</Text>
          </View>
          <View style={styles.totalContainer}>
            <Text
              style={{
                ...styles.totalTitle,
                fontFamily: font.semiBold,
                color: COLORS.red,
                fontSize: 18,
              }}
            >
              Subtotal selected:{' '}
            </Text>
            <Text style={{...styles.totalValue, color: COLORS.red, fontSize: 21}}>${orderInfo.totalPrice > 0 ? orderInfo.totalPrice : 0}</Text>
          </View>
          {orderInfo.products?.length > 0 ? (
            <TouchableOpacity onPress={() => navigation.navigate('Confirm', {orderData: orderInfo})} style={styles.buyBtn}>
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
              <Text style={{...styles.btnTxt, color: '#ccc'}}>Proceed to Buy ({0}) items</Text>
            </View>
          )}
        </LinearGradient>
      </View>
      {/* </View> */}
      <Alert
        title={'Are you want to remove this product from your cart?'}
        setAlertVisible={setAlertVisible}
        alertVisible={alertVisible}
        leftBtnText={'Cancel'}
        rightBtnText={'Yes'}
        leftBtnFnc={() => setAlertVisible(false)}
        rightBtnFnc={() => deleteItem(alertParams.item, alertParams.index)}
      />
    </View>
  );
};

export default React.memo(Cart);

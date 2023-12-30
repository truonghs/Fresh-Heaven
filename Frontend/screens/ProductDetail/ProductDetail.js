import {View, TouchableOpacity, Image, Text, Alert, Pressable, ScrollView} from 'react-native';
import React, {useState, useContext} from 'react';
import styles from './ProductDetail.style';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Carousel from 'react-native-reanimated-carousel';
import {COLORS, SIZES} from '../../constants';
import axios from 'axios';
import {userContext} from '../../Context/UserContext';
import {cartContext} from '../../Context/CartContext';
import Ip from '../../constants/ipAddress';
import CustomButton from '../../components/CustomButton/CustomButton';
import LinearGradient from 'react-native-linear-gradient';
import ProductRow from '../../components/products/ProductRow/ProductRow';
import {productsContext} from '../../Context/ProductContext';
import Rating from '../../components/Rating/Rating';

const ProducDetail = ({navigation, route}) => {
  const [count, setCount] = useState(1);
  const [packingIndex, setPackingIndex] = useState(0);

  const {products, isLoadingProducts} = useContext(productsContext);
  const arr = products;

  const increase = () => {
    setCount(count + 1);
  };
  const decrease = () => {
    count > 1 ? setCount(count - 1) : null;
  };
  const {product} = route.params;
  const {userId} = useContext(userContext);

  const {cartData, setCartData} = useContext(cartContext);

  const addToCart = async (id, packingIndex) => {
    await axios
      .post(`http://${Ip}:3000/api/cart/addcart/${userId}`, {
        productId: id,
        packingIndex: packingIndex,
        quantity: count,
      })
      .then((response) => {
        Alert.alert(`${1} product added to cart!`);
        setCartData({
          cart: response.data.cart,
          totalProduct: cartData.totalProduct + 1,
          isLoadingCart: 'false',
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const addItemToCart = () => {
    addToCart(product._id, packingIndex);
  };

  const handleBuy = () => {
    var isExist = false;
    cartData.cart.products.forEach((item, index) => {
      if (item.productId == product._id && product.packing[packingIndex].unit == item.packing) {
        isExist = true;
        console.log('params: ', index);
        navigation.navigate('Cart', {firstCheckedIndex: index});
      }
    });
    if (!isExist) {
      addItemToCart();
      console.log('params: ', cartData.cart.products.length);

      navigation.navigate('Cart', {
        firstCheckedIndex: cartData.cart.products.length,
      });
    }
  };

  return (
    <View style={styles.main}>
      <View style={styles.upperRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicon name="chevron-back-circle" size={30} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.goToCartBtn}
          onPress={() => {
            navigation.navigate('Cart');
          }}
        >
          <Ionicon name="cart-outline" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.galeryContainer}>
            <Carousel
              // pagingEnabled={false}
              onConfigurePanGesture={(gestureChain) => gestureChain.activeOffsetY([-1, 1])}
              loop
              width={SIZES.width}
              height={280}
              autoPlay={false}
              data={product.imageUrl}
              scrollAnimationDuration={1000}
              // onSnapToItem={(index) => console.log('current index:', index)}
              renderItem={({item}) => (
                <View style={styles.galeryItem}>
                  <Image style={styles.img} source={{uri: item}} />
                </View>
              )}
            />
          </View>
          <View style={styles.detail}>
            <View style={styles.locationWrapper}>
              <View style={styles.location}>
                <View style={styles.locationRow}>
                  <Ionicon name="location-outline" size={20} color={COLORS.red} />
                  <View style={styles.locationTxt}>
                    <Text style={styles.locationTxt}>{product.product_location}</Text>
                  </View>
                </View>
                <View style={styles.locationRow}>
                  <MaterialCommunityIcon name="truck-delivery-outline" size={20} color={COLORS.red} />
                  <View style={styles.deliveryTxt}>
                    <Text style={styles.locationTxt}>Standard Delivery</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.titleRow}>
              <Text style={styles.title}>{product.title}</Text>
            </View>
            <View style={styles.ratingRow}>
              <View style={styles.rating}>
                <Rating rating={product.rating} />
                <Text style={styles.ratingText}>({product.rating})</Text>
              </View>
              <View style={styles.packingOptionContainer}>
                {product.packing.map((item, index) => (
                  <Pressable key={index} onPress={() => setPackingIndex(index)} style={styles.packingOptionBtn(index == packingIndex)}>
                    <Text style={styles.packingOptionText(index == packingIndex)}>{item.unit}</Text>
                  </Pressable>
                ))}

                {/* <Pressable
                  onPress={() => setPackingIndex(1)}
                  style={styles.packingOptionBtn(1 == packingIndex)}>
                  <Text style={styles.packingOptionText(1 == packingIndex)}>
                    {product.packing.unit}
                  </Text>
                </Pressable> */}
              </View>
            </View>
            <View style={styles.priceRow}>
              {product.packing[packingIndex].discount == 0 ? (
                <Text style={styles.price}>${product.packing[packingIndex].price}</Text>
              ) : (
                <View style={styles.priceFlex}>
                  <Text style={styles.priceBefore}>${product.packing[packingIndex].price}</Text>
                  <Text style={styles.priceAfter}>${product.packing[packingIndex].price - (product.packing[packingIndex].price * product.packing[packingIndex].discount) / 100}</Text>
                </View>
              )}
              <View style={styles.counter}>
                <Text style={styles.counterTitle}>Quantity: </Text>
                <TouchableOpacity
                  style={styles.decreaseBtn}
                  onPress={() => {
                    decrease();
                  }}
                >
                  <AntDesign name="minus" size={20} color={COLORS.primary} />
                </TouchableOpacity>
                <Text style={styles.counterText}>{count}</Text>
                <TouchableOpacity style={styles.increaseBtn} onPress={() => increase()}>
                  <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={[COLORS.primary, COLORS.secondary]} style={styles.increaseBtn}>
                    <Feather name="plus" size={18} color={COLORS.white} />
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.cartRow}>
              {/* <TouchableOpacity style={styles.cartBtn} onPress={() => {}}>
                <Text style={styles.cartTitle}>BUY NOW</Text>
              </TouchableOpacity> */}
              <CustomButton text={'BUY NOW'} onPress={() => handleBuy()} widh={160} height={40} />
              <TouchableOpacity style={styles.addCart} onPress={() => addItemToCart()}>
                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={[COLORS.primary, COLORS.secondary]} style={styles.addCart}>
                  <FontAwesome5 name="cart-arrow-down" size={20} color={COLORS.lightWhite} />
                </LinearGradient>
              </TouchableOpacity>
            </View>

            <View style={styles.descWraper}>
              <Text style={styles.desc}>Description</Text>
              <Text style={styles.descText}>Origin: {product.origin}</Text>
              <Text style={styles.descText}>Quality Standards: {product.quality_standards}</Text>
              <Text style={styles.descText}>Trait: {product.description}</Text>
            </View>
            <View style={styles.relatedWraper}>
              <Text style={styles.relatedTitle}>Related Offer</Text>
              <ProductRow scale={0.8} products={products} isLoadingProducts={isLoadingProducts} amount={4} />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default React.memo(ProducDetail);

// <View style={styles.priceWrapper}>
//             <Text style={styles.price}>${product.price}</Text>
//           </View>

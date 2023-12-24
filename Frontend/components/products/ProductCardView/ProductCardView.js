import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Pressable,
  Alert,
} from 'react-native';
import React, {useContext} from 'react';
import styles from './ProductCardView.style';
import Entypo from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import {COLORS} from '../../../constants';
import {useNavigation} from '@react-navigation/native';
import Rating from '../../Rating/Rating';
import Ip from '../../../constants/ipAddress';
import {cartContext} from '../../../Context/CartContext';
import {userContext} from '../../../Context/UserContext';
const ProductCartView = ({product, scale}) => {
  const navigation = useNavigation();
  const {cartData, setCartData} = useContext(cartContext);
  const {userId} = useContext(userContext);
  const addToCart = async (id, packingIndex) => {
    await axios
      .post(`http://${Ip}:3000/api/cart/addcart/${userId}`, {
        productId: id,
        packingIndex: packingIndex,
        quantity: 1,
      })
      .then(response => {
        Alert.alert(`${1} product added to cart!`);
        setCartData({
          cart: response.data.cart,
          totalProduct: cartData.totalProduct + 1,
          isLoadingCart: 'false',
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
  const addItemToCart = () => {
    console.log(product._id);
    addToCart(product._id, 0);
    // setTimeout(() => {
    //   // setAddedToCart(false);
    // }, 5000);
  };

  return (
    <Pressable
      style={styles.container(scale)}
      onPress={() => navigation.navigate('ProductDetail', {product})}>
      <View>
        <View style={styles.imgContainer}>
          <Image style={styles.img} source={{uri: product.imageUrl[1]}} />
        </View>
        <View style={styles.details}>
          <Text style={styles.title} numberOfLines={2}>
            {product.title}
          </Text>

          {product.packing[0].discount == 0 ? (
            <View style={styles.priceContainer}>
              <Text style={styles.price}>${product.packing[0].price}</Text>
            </View>
          ) : (
            <View style={styles.priceContainer}>
              <Text style={styles.priceBefore}>
                ${product.packing[0].price}
              </Text>
              <Text style={styles.priceAfter}>
                $
                {product.packing[0].price -
                  (product.packing[0].price * product.packing[0].discount) /
                    100}
              </Text>
            </View>
          )}
          <View style={styles.tagContainer}>
            <View style={styles.tag}>
              {product.packing[0].discount ? (
                <Text style={styles.tagText}>On Sale</Text>
              ) : null}
            </View>
          </View>
          <View style={styles.suplierAndRatingContainer}>
            <View style={styles.suplierContainer}>
              <Text style={styles.suplierText}>{product.product_location}</Text>
            </View>
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingNumber}>({product.rating})</Text>
              <Rating rating={product.rating} />
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={() => addItemToCart()} style={styles.addBtn}>
          <Entypo name={'plus'} size={28} color="#fff" />
        </TouchableOpacity>
      </View>
    </Pressable>
  );
};

export default ProductCartView;

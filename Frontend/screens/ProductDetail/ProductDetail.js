import {View, TouchableOpacity, Image, Text, Alert} from 'react-native';
import React, {useState, useContext} from 'react';
import styles from './productDetail.style';
import Ionicon from 'react-native-vector-icons/Ionicons';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {COLORS} from '../../constants';
import axios from 'axios';
import {userContext} from '../../Context/UserContext';
import {cartContext} from '../../Context/CartContext';
import Ip from '../../constants/ipAddress';

const ProducDetail = ({navigation, route}) => {
  const [rating, setRating] = useState(1);
  // const [addedToCart, setAddedToCart] = useState(false);
  const increase = () => {
    rating < 5 ? setRating(rating + 1) : null;
  };
  const decrease = () => {
    rating > 0 ? setRating(rating - 1) : null;
  };
  const {item} = route.params;
  const {userId} = useContext(userContext);
  const {FetchCart, setCartData} = useContext(cartContext);

  const addToCart = async (id, price) => {
    console.log(id);

    await axios
      .post(`http://${Ip}:3000/addcart/${userId}`, {productId: id})
      .then(response => {
        Alert.alert('Success', 'Addresses added successfully');
        // setAddedToCart(true);
        // FetchCart(userId);
        setCartData({cart: response.data.cart, isLoadingCart: false});
      })
      .catch(error => {
        console.log(error);
      });
  };
  const addItemToCart = item => {
    addToCart(item._id);
    setTimeout(() => {
      // setAddedToCart(false);
    }, 5000);
  };
  // const cart = useSelector(state => state.cart.cart);
  // console.log(cart);
  return (
    <View style={styles.container}>
      <View style={styles.upperRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicon name="chevron-back-circle" size={30} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <Ionicon name="heart" size={30} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
      <Image style={styles.img} source={{uri: item.imageUrl[0]}} />
      <View style={styles.detail}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{item.title}</Text>
          <View style={styles.priceWrapper}>
            <Text style={styles.price}>${item.price}</Text>
          </View>
        </View>
        <View style={styles.ratingRow}>
          <View style={styles.rating}>
            {[1, 2, 3, 4, 5].map(index => (
              <Ionicon key={index} name="star" size={24} color="gold" />
            ))}
            <Text style={styles.ratingText}>(4.9)</Text>
          </View>
          <View style={styles.rating}>
            <TouchableOpacity onPress={() => decrease()}>
              <SimpleLineIcon name="minus" size={20} color="#000" />
            </TouchableOpacity>
            <Text style={styles.ratingText}>{rating}</Text>
            <TouchableOpacity onPress={() => increase()}>
              <SimpleLineIcon name="plus" size={20} color="#000" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.descWraper}>
          <Text style={styles.desc}>Description</Text>
          <Text style={styles.descText}>{item.description}</Text>
        </View>
        <View style={styles.locationWrapper}>
          <View style={styles.location}>
            <View style={styles.locationRow}>
              <Ionicon name="location-outline" size={20} color="#000" />
              <View style={styles.locationTxt}>
                <Text style={styles.locationTxt}>{item.product_location}</Text>
              </View>
            </View>
            <View style={styles.locationRow}>
              <MaterialCommunityIcon
                name="truck-delivery-outline"
                size={20}
                color="#000"
              />
              <View style={styles.deliveryTxt}>
                <Text style={styles.locationTxt}>Free Delivery</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.cartRow}>
          <TouchableOpacity style={styles.cartBtn} onPress={() => {}}>
            <Text style={styles.cartTitle}>BUY NOW</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addCart}
            onPress={() => addItemToCart(item)}>
            <Fontisto name="shopping-bag" size={20} color={COLORS.lightWhite} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProducDetail;

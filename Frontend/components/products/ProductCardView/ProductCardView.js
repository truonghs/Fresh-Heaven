import {Text, View, TouchableOpacity, Image, Pressable} from 'react-native';
import React from 'react';
import styles from './productCadtView.style';
import Ionicon from 'react-native-vector-icons/Ionicons';
// import Ionicon from 'react-native-vector-icons/Ionicons';

import {COLORS} from '../../../constants';
import {useNavigation} from '@react-navigation/native';
import Rating from '../../Rating/Rating';

const ProductCartView = ({product, scale}) => {
  const navigation = useNavigation();
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
              <Text style={styles.tagText}>Imported</Text>
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
        <TouchableOpacity style={styles.addBtn}>
          <Ionicon name={'add-circle'} size={35} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
    </Pressable>
  );
};

export default ProductCartView;

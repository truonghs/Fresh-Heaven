import {Image, View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

import {useNavigation} from '@react-navigation/native';
import styles from './SearchProductResult.style';
export default function SearchProductResult({product}) {
  const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('ProductDetail', {product})}>
        <View style={styles.image}>
          <Image source={{uri: product.imageUrl[0]}} style={styles.productImg} />
        </View>
        <View style={styles.textContainer}>
          <View>
            <Text style={styles.productTitle} numberOfLines={1}>{product.title}</Text>
            <Text style={styles.origin}>{product.origin}</Text>
          </View>
          <Text style={styles.price}>${product.packing[0].price}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

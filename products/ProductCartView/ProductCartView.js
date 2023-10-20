import {Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import styles from './productCartView.style';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../constants';
import {useNavigation} from '@react-navigation/native';

const ProductCartView = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate('ProductDetail')}>
      <View style={styles.container}>
        <View style={styles.imgContainer}>
          <Image
            style={styles.img}
            source={require('../../assets/images/fn1.jpg')}
          />
        </View>
        <View style={styles.details}>
          <Text style={styles.title} numberOfLines={1}>
            Product
          </Text>
          <Text style={styles.suplier} numberOfLines={1}>
            Product
          </Text>
          <Text style={styles.price}>$2353</Text>
        </View>
        <TouchableOpacity style={styles.addBtn}>
          <Ionicon name={'add-circle'} size={35} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCartView;

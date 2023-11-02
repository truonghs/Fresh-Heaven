import {Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import styles from './productCartView.style';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../constants';
import {useNavigation} from '@react-navigation/native';

const ProductCartView = ({item}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('ProductDetail', {item})}>
      <View style={styles.container}>
        <View style={styles.imgContainer}>
          <Image style={styles.img} source={{uri: item.imageUrl}} />
        </View>
        <View style={styles.details}>
          <Text style={styles.title} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.suplier} numberOfLines={1}>
            {item.suplier}
          </Text>
          <Text style={styles.price}>${item.price}</Text>
        </View>
        <TouchableOpacity style={styles.addBtn}>
          <Ionicon name={'add-circle'} size={35} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCartView;

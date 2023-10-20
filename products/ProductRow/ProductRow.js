import {Text, View, FlatList} from 'react-native';
import React from 'react';
import styles from './productRow.style';
import {SIZES} from '../../constants';
import ProductCartView from '../ProductCartView/ProductCartView';
const products = [1, 2, 3, 4, 5, 6, 7];

const ProductRow = () => {
  return (
    <View style={{marginTop: SIZES.medium, marginLeft: 12}}>
      <FlatList
        data={products}
        horizontal
        contentContainerStyle={{columnGap: SIZES.medium}}
        renderItem={({item}) => <ProductCartView />}
      />
    </View>
  );
};

export default ProductRow;

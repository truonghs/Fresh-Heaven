import {Text, View, FlatList, ActivityIndicator} from 'react-native';
import React from 'react';
import styles from './productRow.style';
import {COLORS, SIZES} from '../../constants';
import ProductCartView from '../ProductCartView/ProductCartView';

const ProductRow = ({products, isLoading}) => {
  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size={SIZES.xxLarge} color={COLORS.primary} />
      ) : (
        <FlatList
          data={products}
          keyExtractor={item => item._id}
          horizontal
          contentContainerStyle={{columnGap: SIZES.medium}}
          renderItem={({item}) => <ProductCartView item={item} />}
        />
      )}
    </View>
  );
};

export default ProductRow;

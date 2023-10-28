import {Text, View, FlatList, ActivityIndicator} from 'react-native';
import React from 'react';
import styles from './productRow.style';
import {COLORS, SIZES} from '../../constants';
import ProductCartView from '../ProductCartView/ProductCartView';
import useFectch from '../../hooks/useFectch';

const ProductRow = () => {
  const {data, isLoading, error} = useFectch();
  console.log(error)
  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size={SIZES.xxLarge} color={COLORS.primary} />
      ) : error ? (
        <Text>Something went wrong</Text>
      ) : (
        <FlatList
          data={data}
          keyExtractor={item => item._id}
          horizontal
          contentContainerStyle={{columnGap: SIZES.medium}}
          renderItem={({item}) => <ProductCartView item = {item}/>}
        />
      )}
    </View>
  );
};

export default ProductRow;

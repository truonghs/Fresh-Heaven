import {FlatList, Text, View, ActivityIndicator} from 'react-native';
import React from 'react';
import useFectch from '../../hooks/useFectch';
import {COLORS, SIZES} from '../../constants';
import styles from './ProductList.style';
import ProductCartView from '../ProductCartView/ProductCartView';

export default function ProductList() {
  const {data, isLoading, error, reFetch} = useFectch();
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={SIZES.xxLarge} color={COLORS.primary} />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={item => item._id}
        numColumns={2}
        renderItem={({item}) => <ProductCartView item={item} />}
        contentContainerStyle={styles.container}
        ItemSeparatorComponent={() => <View style={styles.separator}/>}
      />
    </View>
  );
}

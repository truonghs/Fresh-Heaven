import {FlatList, Text, View, ActivityIndicator} from 'react-native';
import React, {useContext} from 'react';
import {COLORS, SIZES} from '../../../constants';
import styles from './ProductList.style';
import ProductCartView from '../ProductCardView/ProductCardView';
import {Context} from '../../../Context/UserContext';

export default function ProductList() {
  const {products, isLoading} = useContext(Context);
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
        data={products}
        keyExtractor={(item) => item._id}
        numColumns={2}
        renderItem={({item}) => <ProductCartView item={item} />}
        contentContainerStyle={styles.container}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

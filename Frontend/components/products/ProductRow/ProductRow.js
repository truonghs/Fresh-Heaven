import {Text, View, FlatList, ActivityIndicator} from 'react-native';
import React from 'react';
import styles from './productRow.style';
import {COLORS, SIZES} from '../../../constants';
import ProductCartView from '../ProductCardView/ProductCardView';

const ProductRow = ({
  products,
  isLoadingProducts,
  scale,
}) => {
  return (
    <View style={styles.container}>
      {isLoadingProducts ? (
        <ActivityIndicator size={SIZES.xxLarge} color={COLORS.primary} />
      ) : (
        <FlatList
          data={products}
          keyExtractor={index => Math.random()}
          scrollEnabled={false}
          numColumns={2}
          contentContainerStyle={styles.flatListContainer}
          renderItem={({item}) => (
            <View style={styles.itemContainer(scale)}>
              <ProductCartView scale={scale} product={item} />
            </View>
          )}
        />
      )}
    </View>
  );
};

export default ProductRow;

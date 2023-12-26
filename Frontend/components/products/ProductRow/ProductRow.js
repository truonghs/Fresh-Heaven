import {Text, View, FlatList, ActivityIndicator} from 'react-native';
import React from 'react';
import styles from './productRow.style';
import {COLORS, SIZES} from '../../../constants';
import ProductCartView from '../ProductCardView/ProductCardView';

const ProductRow = ({products, isLoadingProducts, scale, amount}) => {
  return (
    <View style={styles.container}>
      {isLoadingProducts ? (
        <ActivityIndicator size={SIZES.xxLarge} color={COLORS.primary} />
      ) : (
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={products.slice(0, amount)}
          // keyExtractor={({item}) => console.log('item: ', item)}
          horizontal
          contentContainerStyle={styles.flatListContainer}
          renderItem={({item, index}) => (
            <View key={index} style={styles.itemContainer(scale)}>
              <ProductCartView scale={scale} product={item} />
            </View>
          )}
        />
      )}
    </View>
  );
};

export default React.memo(ProductRow);

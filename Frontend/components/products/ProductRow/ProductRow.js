import {Text, View, FlatList, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './productRow.style';
import {COLORS, SIZES} from '../../../constants';
import ProductCartView from '../ProductCardView/ProductCardView';
import {useIsFocused} from '@react-navigation/native';

const ProductRow = ({products, isLoadingProducts, scale, amount = null, horizontal = true, numColumns, scrollEnabled = true, from = null}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);
  const startIndex = 0;
  const endIndex = startIndex + productsPerPage * currentPage;
  const currentProducts = products.slice(startIndex, endIndex);
  const fetchMoreProducts = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  const isFocused = useIsFocused();

  // const totalPages = Math.ceil(products.length / productsPerPage);
  useEffect(() => {
    setCurrentPage(1);
  }, [products]);
  useEffect(() => {
    if (isFocused) {
    } else {
      setCurrentPage(1);
    }
  }, [isFocused]);
  return (
    <View style={styles.container}>
      {isLoadingProducts ? (
        <ActivityIndicator size={SIZES.xxLarge} color={COLORS.primary} />
      ) : (
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={amount ? (from ? products.slice(from, amount) : products.slice(0, amount)) : currentProducts}
          keyExtractor={(item) => item._id}
          horizontal={horizontal}
          numColumns={numColumns}
          scrollEnabled={scrollEnabled}
          contentContainerStyle={styles.flatListContainer}
          onEndReached={fetchMoreProducts}
          onEndReachedThreshold={0.1}
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

import {Text, View, FlatList, ActivityIndicator} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import styles from './productRow.style';
import {COLORS, SIZES} from '../../../constants';
import ProductCartView from '../ProductCardView/ProductCardView';
import {useIsFocused} from '@react-navigation/native';
// import {productsContext} from '../../../Context/ProductContext';
const ProductRow = ({initPage, setInitPage, products, isLoadingProducts, scale, amount = null, horizontal = true, numColumns, scrollEnabled = true, from = null}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 2;
  const startIndex = 0;
  // const {products} = useContext(productsContext);
  const fetchMoreProducts = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  const isFocused = useIsFocused();
  const totalPages = Math.ceil(products.length / productsPerPage);
  useEffect(() => {
    setInitPage ? setInitPage(null) : null;
    setCurrentPage(1);
    // return () => {
    //   setCurrentPage(1);
    // };
  }, [products]);
  useEffect(() => {
    if (isFocused) {
    } else {
      setCurrentPage(1);
    }
  }, [isFocused]);
  const endIndex = initPage != null ? initPage : 2 + productsPerPage * currentPage;
  const currentProducts = products.slice(startIndex, endIndex);
  return (
    <View style={[styles.container, {paddingBottom: horizontal == false ? 190 : 0}]}>
      {isLoadingProducts ? (
        <ActivityIndicator size={SIZES.xxLarge} color={COLORS.primary} />
      ) : initPage == undefined ? (
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={amount ? (from ? products.slice(from, amount) : products.slice(0, amount)) : currentProducts}
          keyExtractor={(item) => item._id}
          horizontal={horizontal}
          numColumns={numColumns}
          scrollEnabled={scrollEnabled}
          contentContainerStyle={styles.flatListContainer}
          onEndReached={() => {
            fetchMoreProducts();
          }}
          onEndReachedThreshold={0.7}
          renderItem={({item, index}) => (
            <View key={index} style={styles.itemContainer(scale)}>
              <ProductCartView scale={scale} product={item} />
            </View>
          )}
        />
      ) : initPage == null ? (
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={amount ? (from ? products.slice(from, amount) : products.slice(0, amount)) : currentProducts}
          keyExtractor={(item) => item._id}
          horizontal={horizontal}
          numColumns={numColumns}
          scrollEnabled={scrollEnabled}
          contentContainerStyle={styles.flatListContainer}
          onEndReached={() => {
            fetchMoreProducts();
          }}
          onEndReachedThreshold={0.7}
          renderItem={({item, index}) => (
            <View key={index} style={styles.itemContainer(scale)}>
              <ProductCartView scale={scale} product={item} />
            </View>
          )}
        />
      ) : (
        <ActivityIndicator style={{marginTop: 50}} size={SIZES.xxLarge} color={COLORS.primary} />
      )}
    </View>
  );
};

export default React.memo(ProductRow);

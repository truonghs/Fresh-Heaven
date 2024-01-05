import {Text, TextInput, TouchableOpacity, View, ScrollView, Pressable, ActivityIndicator} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './Menu.style';
import {COLORS, SIZES} from '../../constants';
import {productsContext} from '../../Context/ProductContext';
import ProductRow from '../../components/products/ProductRow/ProductRow';
import SortView from '../SortView/SortView';
function Menu({route}) {
  const {navigate} = useNavigation();
  const {products, isLoadingProducts} = useContext(productsContext);
  const [visible, setVisible] = useState(false);
  const [arrProduct, setArrProduct] = useState([...products]);
  const [initPage, setInitPage] = useState(null);
  const [isSorted, setIsSorted] = useState(false);
  useEffect(() => {
    if (route?.params) {
      setArrProduct(route.params.searchResults);
    }
  }, [route.params]);
  const [sortList, setSortList] = useState([
    {
      sortItemName: 'Menu',
      isChecked: true,
    },
    {
      sortItemName: 'Newest',
      isChecked: false,
    },
    {
      sortItemName: 'Hot Sale',
      isChecked: false,
    },
  ]);
  const [priceRange, setPriceRange] = useState({
    minPrice: '',
    maxPrice: '',
  });
  const [sortChoices, setSortChoices] = useState({
    quality_standards: [],
    origin: [],
  });
  const handleSortBasic = (sortName) => {
    let tempArrProduct = 
    route?.params?.searchResults.length > 0 ? [...route.params.searchResults] 
    : isSorted ? [...arrProduct]
    : [...products];

    setSortList((prevSortList) =>
      prevSortList.map((sortItem) => ({
        ...sortItem,
        isChecked: sortItem.sortItemName === sortName,
      })),
    );
    if (sortName === 'Menu') {
      tempArrProduct.sort((thisProduct, thatProduct) => thisProduct.title.length - thatProduct.title.length);
      setInitPage(0);
      setArrProduct([...tempArrProduct]);
    }
    if (sortName === 'Newest') {
      tempArrProduct.sort((thisProduct, thatProduct) => new Date(thisProduct.updatedAt) - new Date(thatProduct.updatedAt));
      setInitPage(0);

      setArrProduct([...tempArrProduct]);
    } else if (sortName === 'Hot Sale') {
      tempArrProduct.sort((thisProduct, thatProduct) => thatProduct.packing[0].price - thisProduct.packing[0].price);
      setInitPage(0);

      setArrProduct([...tempArrProduct.slice(0, 20)]);
    } else {
    }
  };
  const handleSortAdvanced = (sortType, sortOption) => {
    Object.keys(sortChoices).forEach((key) => {
      if (key === sortType) {
        if (sortChoices[key].length === 0) {
          setSortChoices({...sortChoices, [key]: [...sortChoices[key], sortOption]});
        } else {
          const updatedChoices = [...sortChoices[key]];
          const indexToRemove = updatedChoices.indexOf(sortOption);

          if (indexToRemove !== -1) {
            updatedChoices.splice(indexToRemove, 1);
          } else {
            updatedChoices.push(sortOption);
          }

          setSortChoices({...sortChoices, [key]: updatedChoices});
        }
      }
    });
    handleSortBasic('Menu');
  };

  const handleApplySort = () => {
    const arr = [...products];
    const filteredProducts = arr.filter((product) => {
      const meetsQualityCriteria = sortChoices['quality_standards'].length === 0 || sortChoices['quality_standards'].includes(product.quality_standards);

      const meetsOriginCriteria = sortChoices['origin'].length === 0 || sortChoices['origin'].includes(product.origin);

      const meetsPriceCriteria = product.packing[0].price >= Number(priceRange.minPrice) && (Number(priceRange.maxPrice) === 0 || product.packing[0].price <= Number(priceRange.maxPrice));
      setIsSorted(true);
      return meetsQualityCriteria && meetsOriginCriteria && meetsPriceCriteria;
    });

    setArrProduct(filteredProducts);
    setVisible(false);
  };
  const handleResetSort = () => {
    setSortChoices({
      quality_standards: [],
      origin: [],
    });
    setPriceRange({
      minPrice: '',
      maxPrice: '',
    });
    setArrProduct([...products]);
    if (route?.params) {
      route.params.searchResults = [];
    }
    setIsSorted(false);

    // setVisible(false);
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.searchContainer}>
            <View style={styles.searchWrapper}>
              <TouchableOpacity>
                <Feather name="search" size={24} style={styles.searchIcon} color={COLORS.brown} />
              </TouchableOpacity>
              <TextInput style={styles.searchInput} value="" onPressIn={() => navigate('Search', {name: 'Menu'})} placeholder="What are you looking for" placeholderTextColor={COLORS.orange} />
            </View>
            <TouchableOpacity style={styles.searchBtn} onPress={() => setVisible(true)}>
              <Feather name="filter" size={SIZES.xLarge} color={COLORS.brown} />
              <Text style={styles.text}>Sort</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.sortList}>
          {sortList.map((sortItem, index) => (
            <Pressable key={index} style={[styles.sortItem, sortItem.isChecked ? styles.sortBasicActive : null]} onPress={() => handleSortBasic(sortItem.sortItemName)}>
              <Text style={[styles.sortItemText, sortItem.isChecked ? {color: '#fff'} : null]}>{sortItem.sortItemName}</Text>
            </Pressable>
          ))}
        </View>
        {arrProduct?.length === 0 && (
          <View style={styles.noResult}>
            <Text style={styles.noResultText}>No product founded</Text>
          </View>
        )}
        {/* {!visible && arrProduct?.length > 0 && (
          <ScrollView>
            <ProductRow products={arrProduct} isLoadingProducts={isLoadingProducts} horizontal={false} numColumns={2} scrollEnabled={false} />
          </ScrollView>
        )} */}
        {arrProduct?.length > 0 && (
          <View style={{}}>
            <ProductRow
              initPage={initPage}
              setInitPage={setInitPage}
              param={sortList}
              products={arrProduct}
              isLoadingProducts={isLoadingProducts}
              horizontal={false}
              numColumns={2}
              scrollEnabled={true}
            />
          </View>
        )}
      </View>
      {visible ? (
        <SortView
          visible={visible}
          setVisible={setVisible}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          sortChoices={sortChoices}
          handleSortAdvanced={handleSortAdvanced}
          handleApplySort={handleApplySort}
          handleResetSort={handleResetSort}
        />
      ) : null}
    </View>
  );
}
export default React.memo(Menu);

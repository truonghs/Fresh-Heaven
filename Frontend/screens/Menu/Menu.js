import {Text, TextInput, TouchableOpacity, View, ScrollView, Pressable} from 'react-native';
import {useContext, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Modal, SlideAnimation, ModalContent, ModalPortal} from 'react-native-modals';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './Menu.style';
import {COLORS, SIZES} from '../../constants';
import {productsContext} from '../../Context/ProductContext';
import ProductRow from '../../components/products/ProductRow/ProductRow';
export default function Menu() {
  const {navigate} = useNavigation();
  const {products, isLoadingProducts} = useContext(productsContext);
  const arr = [...products];
  const [visible, setVisible] = useState(false);
  const [arrProduct, setArrProduct] = useState([...arr]);
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
  const handleSortBasic = (sortName) => {
    setSortList((prevSortList) =>
      prevSortList.map((sortItem) => ({
        ...sortItem,
        isChecked: sortItem.sortItemName === sortName,
      })),
    );
    if (sortName === 'Menu') {
      setArrProduct([...products]);
    }
    if (sortName === 'Newest') {
      arr.sort((thisProduct, thatProduct) => new Date(thisProduct.updatedAt) - new Date(thatProduct.updatedAt));
      setArrProduct([...arr]);
    } else if (sortName === 'Hot Sale') {
      arrProduct.sort((thisProduct, thatProduct) => thisProduct.packing[0].price - thatProduct.packing[0].price);
      setArrProduct([...arrProduct.slice(0, 10)]);
    } else {
    }
  };
  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.searchContainer}>
            {/* <TouchableOpacity
            style={styles.btnBack}
            onPress={() => navigate('UserInfo')}>
            <Ionicons name="chevron-back" size={24} color={COLORS.brown} />
          </TouchableOpacity> */}
            <View style={styles.searchWrapper}>
              <TouchableOpacity>
                <Feather name="search" size={24} style={styles.searchIcon} color={COLORS.brown} />
              </TouchableOpacity>
              <TextInput style={styles.searchInput} value="" onPressIn={() => navigate('Search')} placeholder="What are you looking for" placeholderTextColor={COLORS.orange} />
            </View>
            <TouchableOpacity style={styles.searchBtn} onPress={() => setVisible(true)}>
              <Feather name="filter" size={SIZES.xLarge} color={COLORS.brown} />
              <Text style={styles.text}>Sort</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.sortList}>
          {sortList.map((sortItem, index) => (
            <Pressable key={index} style={[styles.sortItem, sortItem.isChecked ? styles.sortActive : null]} onPress={() => handleSortBasic(sortItem.sortItemName)}>
              <Text style={[styles.sortItemText, sortItem.isChecked ? {color: '#fff'} : null]}>{sortItem.sortItemName}</Text>
            </Pressable>
          ))}
        </View>

        <ScrollView>
          <ProductRow products={arrProduct} isLoadingProducts={isLoadingProducts} />
        </ScrollView>
      </View>
      <Modal
        visible={false}
        // onTouchOutside={() => setVisible(false)}
        modalAnimation={
          new SlideAnimation({
            slideFrom: 'right',
          })
        }
      >
        <ModalContent style={styles.modal}>
          <Text>Search filter</Text>
          <View>
            <Text>according to quality</Text>
            <View>
              <Pressable>
                <Text>Import</Text>
              </Pressable>
              <Pressable>
                <Text>Domestic</Text>
              </Pressable>
            </View>
            <View>
              <Pressable>
                <Text>Clean fruit</Text>
              </Pressable>
            </View>
          </View>
          <View>
            <Text>Production Site </Text>
            <View>
              <Pressable>
                <Text>Import</Text>
              </Pressable>
              <Pressable>
                <Text>Domestic</Text>
              </Pressable>
            </View>
            <View>
              <Pressable>
                <Text>Clean fruit</Text>
              </Pressable>
            </View>
          </View>
        </ModalContent>
      </Modal>
      <ModalPortal />
    </View>
  );
}

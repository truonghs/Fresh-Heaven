import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import {useContext, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
    BottomModal,
    SlideAnimation,
    ModalContent,
    ModalPortal,
  } from 'react-native-modals';
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
  const [arrProduct, setArrProduct] = useState([...products]);
  return (
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
              <Feather
                name="search"
                size={24}
                style={styles.searchIcon}
                color={COLORS.brown}
              />
            </TouchableOpacity>
            <TextInput
              style={styles.searchInput}
              value=""
              onPressIn={() => navigate('Search')}
              placeholder="What are you looking for"
              placeholderTextColor={COLORS.orange}
            />
          </View>
          <TouchableOpacity style={styles.searchBtn}>
            <Feather name="filter" size={SIZES.xLarge} color={COLORS.brown} />
            <Text style={styles.text}>Sort</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.sortList}>
        <TouchableOpacity style={[styles.sortItem]}>
          <Text style={styles.sortItemText}>Menu</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.sortItem]}>
          <Text style={styles.sortItemText}>Newest</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.sortItem]}>
          <Text style={styles.sortItemText}>Hot Sale</Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        <ProductRow products={arrProduct} isLoadingProducts={isLoadingProducts} />
      </ScrollView>
    </View>
  );
}

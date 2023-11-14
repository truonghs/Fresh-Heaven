import {View,Text, TouchableOpacity} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';

import styles from './NewRivals.style';
import { COLORS } from '../../constants';
import ProductList from '../../products/ProductList/ProductList';
export default function NewRivals({navigation}) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.upperRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicon 
          name="chevron-back-circle" 
          size={30} 
          color={COLORS.lightWhite} />
        </TouchableOpacity>
        <Text style={styles.heading}>Products</Text>
      </View>
      <ProductList/>
    </View>
  );
}

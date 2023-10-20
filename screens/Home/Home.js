import {Text, View, TouchableOpacity, ScrollView} from 'react-native';
import styles from './home.style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {Welcome, Carousels, Heading} from '../../components/home';
import ProductRow from '../../products/ProductRow/ProductRow';
function Home() {
  return (
    <View>
      <View style={styles.appBarWrapper}>
        <View style={styles.appBar}>
          <Ionicons name="location-outline" size={24} />
          <Text style={styles.location}>HoChiMinh VietNam</Text>
          <View style={{alignItems: 'flex-end'}}>
            <View style={styles.cartCount}>
              <Text style={styles.cartNumber}>8</Text>
            </View>
            <TouchableOpacity>
              <Fontisto name="shopping-bag" size={24} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ScrollView>
        <Welcome />
        <Carousels />
        <Heading />
        <ProductRow />
      </ScrollView>
    </View>
  );
}

export default Home;

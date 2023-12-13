import {
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  Image,
  Text,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useState} from 'react';
import axios from 'axios';
import Feather from 'react-native-vector-icons/Feather';
import Ionicon from 'react-native-vector-icons/Ionicons';

import styles from './search.stlye';
import {COLORS, SIZES} from '../../constants';
import SearchProductResult from '../../products/SearchProductResult/SearchProductResult';
import Ip from '../../constants/ipAddress';
function Search() {
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const handleSearch = async () => {
    await axios
      .get(`http:${Ip}:3000/api/products/search/${searchValue}`)
      .then(response => {
        setSearchResults(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <SafeAreaView>
      <View style={styles.searchContainer}>
        <TouchableOpacity>
          <Ionicon
            style={styles.searchIcon}
            name="camera-outline"
            size={SIZES.xLarge}
          />
        </TouchableOpacity>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={searchValue}
            onChangeText={value => setSearchValue(value)}
            placeholder="What are you looking for"
            placeholderTextColor={COLORS.gray}
          />
        </View>
        <View>
          <TouchableOpacity
            style={styles.searchBtn}
            onPress={() => handleSearch()}>
            <Feather name="search" size={24} color={COLORS.offwhite} />
          </TouchableOpacity>
        </View>
      </View>
      {searchResults.length === 0 ? (
        <View style={{flex: 1}}>
          <Image
            source={require('../../assets/images/Pose23.png')}
            style={styles.searchImage}
          />
        </View>
      ) : (
        <FlatList
          data={searchResults}
          keyExtractor={item => item._id}
          renderItem={({item}) => <SearchProductResult item={item} />}
          style={{marginHorizontal: 12}}
        />
      )}
    </SafeAreaView>
  );
}

export default Search;

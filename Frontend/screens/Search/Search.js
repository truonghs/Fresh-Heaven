import {TextInput, TouchableOpacity, View, FlatList, Image, Text, Alert, ImageBackground, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useState, useEffect} from 'react';
import axios from 'axios';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

import styles from './Search.stlye';
import {COLORS, SIZES} from '../../constants';
import SearchProductResult from '../../components/products/SearchProductResult/SearchProductResult';
import Ip from '../../constants/ipAddress';
import useDebounce from '../../hooks/useDebounce';
function Search({route}) {
  const {navigate} = useNavigation();
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const debounced = useDebounce(searchValue, 500);
  const handleSearch = async () => {
    if (searchResults.length > 0) {
      navigate('Menu', {searchResults});
    } else {
      Alert.alert('Please enter your keyword');
    }
  };
  useEffect(() => {
    if (!debounced.trim()) {
      setSearchResults([]);
      return;
    }
    const fetchApi = async () => {
      // setLoading(true);
      await axios
        .get(`http:${Ip}:3000/api/products/search/${debounced}`)
        .then(({data}) => {
          setSearchResults(data);
          // setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchApi();
  }, [debounced]);
  const handleChange = (value) => {
    const searchValue = value;
    if (!searchValue.startsWith(' ')) {
      setSearchValue(searchValue);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground style={styles.imageBackground} source={require('../../assets/images/bgImage.png')} />
      <View style={styles.header}>
        <Text style={styles.title}>Find your favorite fruits</Text>
        <Pressable onPress={() => navigate("Cart")}>
          <Ionicons name="cart-outline" size={35} color={COLORS.primary} />
        </Pressable>
      </View>
      <View style={styles.searchContainer}>
        <TouchableOpacity style={styles.btnBack} onPress={() => navigate(route.params.name)}>
          <Ionicons name="chevron-back" size={24} color={COLORS.brown} />
        </TouchableOpacity>
        <View style={styles.searchWrapper}>
          <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
            <Feather name="search" size={24} color={COLORS.brown} />
          </TouchableOpacity>
          <TextInput style={styles.searchInput} value={searchValue} onChangeText={(value) => handleChange(value)} placeholder="What are you looking for" placeholderTextColor={COLORS.orange} />
        </View>
      </View>
      {searchResults.length === 0 ? (
        <View style={styles.bannerSearchContainer}>
          <Image style={styles.bannerSearch} source={require('../../assets/images/bannersearch.png')} />
        </View>
      ) : (
        <FlatList data={searchResults} keyExtractor={(item) => item._id} renderItem={({item}) => <SearchProductResult product={item} />} style={{marginHorizontal: 12}} />
      )}
    </SafeAreaView>
  );
}

export default Search;

import React from 'react';
import {TextInput, TouchableOpacity, View} from 'react-native';
import styles from './search.stlye';
import {COLORS, SIZES} from '../../constants';
import Feather from 'react-native-vector-icons/Feather';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

function Search() {
  const navigation = useNavigation();

  return (
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
          value=""
          onPressIn={() => navigation.navigate('Search')}
          placeholder="What are you looking for"
        />
      </View>
      <TouchableOpacity style={styles.searchBtn}>
        <Feather name="search" size={24} color={COLORS.offwhite} />
      </TouchableOpacity>
    </View>
  );
}

export default Search;

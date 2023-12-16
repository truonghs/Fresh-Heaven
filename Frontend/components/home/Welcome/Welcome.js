import React from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import styles from './welcome.style';
import {COLORS, SIZES} from '../../../constants';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

export default function Welcome() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.welcomeTxt}>Find Your</Text>
        <Text style={styles.welcomeTxt}>Favorite Fruit</Text>
      </View>
      <View style={styles.searchContainer}>
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
            onPressIn={() => navigation.navigate('Search')}
            placeholder="What are you looking for"
            placeholderTextColor={COLORS.orange}
          />
        </View>
        <TouchableOpacity style={styles.searchBtn}>
          <FontAwesome
            name="sliders"
            size={SIZES.xLarge}
            color={COLORS.brown}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

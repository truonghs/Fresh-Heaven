import {View, Text, ImageBackground, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './Intro.style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {COLORS} from '../../constants';
import {err} from 'react-native-svg';
const Intro1 = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <ImageBackground
        onLoad={() => setIsLoading(false)}
        style={styles.imageBackground}
        source={require('../../assets/images/intro-screen-1.png')}>
        {!isLoading ? (
          <TouchableOpacity
            style={styles.btn(COLORS.secondary)}
            onPress={() => navigation.navigate('Intro2')}>
            <Text style={styles.btnText(COLORS.white)}>Next</Text>
            <AntDesign name={'arrowright'} color={'#fff'} size={24} />
          </TouchableOpacity>
        ) : null}
      </ImageBackground>
    </View>
  );
};

export default Intro1;

import {View, Text, ImageBackground, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './Intro.style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {COLORS} from '../../constants';
const Intro2 = ({image}) => {
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <ImageBackground
        onLoad={() => setIsLoading(false)}
        style={styles.imageBackground}
        source={require('../../assets/images/intro-screen-2.png')}>
        {!isLoading ? (
          <TouchableOpacity
            style={styles.btn(COLORS.white)}
            onPress={() => navigation.navigate('AuthStack')}>
            <Text style={styles.btnText(COLORS.secondary)}>Explore</Text>
            <AntDesign name={'arrowright'} color={COLORS.secondary} size={24} />
          </TouchableOpacity>
        ) : null}
      </ImageBackground>
    </View>
  );
};

export default Intro2;

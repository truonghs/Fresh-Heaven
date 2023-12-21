import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  ImageBackground,
  Image,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './Congratulations.style';
import CustomButton from '../../components/CustomButton/CustomButton';
import {COLORS} from '../../constants';
export default function Congratulations() {
  const {navigate} = useNavigation();
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.imageBackground}
        source={require('../../assets/images/bgImage.png')}
      />
      <View style={styles.content}>
        <Image source={require('../../assets/images/success.png')} />
        <Text style={styles.title}>Congrats!</Text>
        <Text style={styles.text}>Your Profile Is Ready To Use</Text>
      </View>
      <View style={styles.btnNext}>
        <CustomButton
          text={'Try Order'}
          widh={150}
          onPress={() => navigate('Login')}
        />
      </View>
    </View>
  );
}

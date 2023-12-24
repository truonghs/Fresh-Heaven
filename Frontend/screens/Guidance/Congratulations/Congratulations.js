import {Text, View, ImageBackground, Image} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import styles from './Congratulations.style';
import Ip from '../../../constants/ipAddress';
import {userContext} from '../../../Context/UserContext';
import CustomButton from '../../../components/CustomButton/CustomButton';
export default function Congratulations() {
  const {navigate} = useNavigation();
  const {userId, currentUser, setCurrentUser} = useContext(userContext);
  useEffect(() => {
    axios
      .put(`http://${Ip}:3000/updateuserinfo/${userId}`, currentUser)
      .then(({data}) => {
        setCurrentUser(data.data);
        AsyncStorage.setItem('isFirstTime', 'false');
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.imageBackground}
        source={require('../../../assets/images/bgImage.png')}
      />
      <View style={styles.content}>
        <Image source={require('../../../assets/images/success.png')} />
        <Text style={styles.title}>Congrats!</Text>
        <Text style={styles.text}>Your Profile Is Ready To Use</Text>
      </View>
      <View style={styles.btnNext}>
        <CustomButton
          text={'Try Order'}
          widh={150}
          onPress={() => navigate('BottomTabNavigation')}
        />
      </View>
    </View>
  );
}

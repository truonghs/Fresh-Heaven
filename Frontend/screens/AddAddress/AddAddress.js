import {
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import styles from './AddAddress.style';
import Ip from '../../constants/ipAddress';
import {COLORS} from '../../constants';
import {userContext} from '../../Context/UserContext';
import CustomButton from '../../components/CustomButton/CustomButton';
const AddressScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [detail, setDetail] = useState('');
  const [city, setCity] = useState('');

  const {userId, setUserId} = useContext(userContext);
  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const token = await AsyncStorage.getItem('authToken');

  //     const decodedToken = jwt_decode(token);
  //     const userId = decodedToken.userId;
  //     setUserId(userId);
  //   };

  //   fetchUser();
  // }, []);
  const handleAddAddress = () => {
    const address = {
      name,
      phoneNumber,
      city,
      detail,
      houseNumber,
    };
    console.log(address);

    axios
      .post(`http://${Ip}:3000/addresses`, {userId, address})
      .then(response => {
        Alert.alert('Success', 'Addresses added successfully');
        setName('');
        setPhoneNumber('');
        setHouseNumber('');
        setDetail('');
        setCity('');

        setTimeout(() => {
          navigation.goBack();
        }, 500);
      })
      .catch(error => {
        Alert.alert('Error', 'Failed to add address');
        console.log('error', error);
      });
  };
  return (
    <ScrollView>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require('../../assets/images/logo-trans.png')}
        />
      </View>
      <View style={{padding: 10}}>
        <View style={styles.inputContainer}>
          <Text style={styles.title}>Address name</Text>

          <TextInput
            placeholderTextColor={COLORS.gray}
            value={name}
            onChangeText={text => setName(text)}
            style={styles.input}
            placeholder="Name"
          />
        </View>

        <View>
          <Text style={styles.title}>Phone number</Text>

          <TextInput
            placeholderTextColor={COLORS.gray}
            value={phoneNumber}
            onChangeText={text => setPhoneNumber(text)}
            style={styles.input}
            placeholder="Phone Number"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.title}>Province, City</Text>

          <TextInput
            placeholderTextColor={COLORS.gray}
            value={city}
            onChangeText={text => setCity(text)}
            style={styles.input}
            placeholder="Province, City"
          />
        </View>

        <View>
          <Text style={styles.title}>Detail address</Text>
          <TextInput
            placeholderTextColor={COLORS.gray}
            value={detail}
            onChangeText={text => setDetail(text)}
            style={styles.input}
            placeholder="Detail address"
          />
        </View>
        <View>
          <Text style={styles.title}>House Number</Text>
          <TextInput
            placeholderTextColor={COLORS.gray}
            value={houseNumber}
            onChangeText={text => setHouseNumber(text)}
            style={styles.input}
            placeholder="House Numbe"
          />
        </View>
        <View style={styles.btnContainer}>
          <CustomButton onPress={handleAddAddress} text={'Add Address'} />
        </View>
      </View>
    </ScrollView>
  );
};

export default AddressScreen;

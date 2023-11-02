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
import {UserType} from '../../UserContext';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import styles from './AddAddress.style';

const AddressScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [street, setStreet] = useState('');
  const [landmark, setLandmark] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const {userId, setUserId} = useContext(UserType);
  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem('authToken');

      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };

    fetchUser();
  }, []);
  const handleAddAddress = () => {
    const address = {
      name,
      phoneNumber,
      houseNumber,
      street,
    };

    axios
      .post('http://192.168.1.4:3000/addresses', {userId, address})
      .then(response => {
        Alert.alert('Success', 'Addresses added successfully');
        setName('');
        setPhoneNumber('');
        setHouseNumber('');
        setStreet('');
        setLandmark('');
        setPostalCode('');

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
          source={require('../../assets/images/logo-icon.png')}
        />
      </View>
      <View style={{padding: 10}}>
        <Text style={styles.title}>Add a new Address</Text>

        <TextInput placeholder="Ho Chi Minh" style={styles.input} />

        <View style={styles.inputContainer}>
          <Text style={styles.title}>Full name (First and last name)</Text>

          <TextInput
            value={name}
            onChangeText={text => setName(text)}
            style={styles.input}
            placeholder="enter your name"
          />
        </View>

        <View>
          <Text style={styles.title}>Phone number</Text>

          <TextInput
            value={phoneNumber}
            onChangeText={text => setPhoneNumber(text)}
            style={styles.input}
            placeholder="Phone Number"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.title}>City, Province</Text>

          <TextInput
            value={houseNumber}
            onChangeText={text => setHouseNumber(text)}
            style={styles.input}
            placeholder=""
          />
        </View>

        <View>
          <Text style={styles.title}>Area,Street, House Number</Text>
          <TextInput
            value={street}
            onChangeText={text => setStreet(text)}
            style={styles.input}
            placeholder=""
          />
        </View>

        <TouchableOpacity onPress={handleAddAddress} style={styles.btn}>
          <Text style={styles.btnTxt}>Add Address</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AddressScreen;

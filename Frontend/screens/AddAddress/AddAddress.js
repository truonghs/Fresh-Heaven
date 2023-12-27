import {Text, View, ScrollView, TextInput, TouchableOpacity, Alert, Image, Pressable, PermissionsAndroid, Platform} from 'react-native';
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
const AddressScreen = ({route}) => {
  const navigation = useNavigation();
  const {userId, currentUser, setCurrentUser} = useContext(userContext);
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState({
    latitude: '',
    longitude: '',
    addressDetail: '',
  });

  const handleAddAddress = () => {
    if (fullName === '' || phoneNumber === '' || address.addressDetail === '') {
      Alert.alert('Please fill full infomation');
    } else if (phoneNumber.match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)) {
      const newAddress = {
        fullName: fullName,
        phoneNumber: phoneNumber,
        ...address,
      };
      setCurrentUser({
        ...currentUser,
        addresses: [...currentUser.addresses, newAddress],
      });
      axios
        .put(`http://${Ip}:3000/setaddresses/${userId}`, newAddress)
        .then((response) => {
          navigation.navigate('AddressDetail');
          console.log('add location success');
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      Alert.alert('Please enter a valid phone number');
    }
  };
  const getPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          navigation.navigate('Map', {name: 'AddAddress'});
        } else {
          console.log('Location permission denied');
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  useEffect(() => {
    const getCurrenrtLocation = async () => {
      if (route.params) {
        await axios
          .get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${route.params.location.latitude}&lon=${route.params.location.longitude}`)
          .then(({data}) => {
            setAddress({
              latitude: data.lat,
              longitude: data.lon,
              addressDetail: data.display_name,
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    };
    getCurrenrtLocation();
  }, [route.params]);
  return (
    <ScrollView>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require('../../assets/images/logo-trans.png')} />
      </View>
      <View style={styles.btnContainer}>
        <CustomButton widh={240} onPress={getPermission} text={'Use my current location'} />
      </View>
      <View style={{padding: 10}}>
        <View style={styles.inputContainer}>
          <Text style={styles.title}>Your name</Text>
          <TextInput style={styles.input} placeholder="Your Name" placeholderTextColor={COLORS.gray} value={fullName} onChangeText={(text) => setFullName(text)} />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.title}>Phone number</Text>
          <TextInput style={styles.input} placeholder="Phone Number" placeholderTextColor={COLORS.gray} value={phoneNumber} onChangeText={(text) => setPhoneNumber(text)} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.title}>Detail address</Text>
          <TextInput
            style={styles.input}
            placeholder="Detail address"
            placeholderTextColor={COLORS.gray}
            value={address.addressDetail}
            onChangeText={(text) => {
              setAddress({...address, addressDetail: text});
            }}
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

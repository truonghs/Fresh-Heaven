import React, {useContext, useEffect, useState} from 'react';
import {Text, View, TouchableOpacity, Alert, ImageBackground, Image, PermissionsAndroid, Platform, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './UserLocation.style';
import CustomButton from '../../../components/CustomButton/CustomButton';
import {COLORS} from '../../../constants';
import {userContext} from '../../../Context/UserContext';
import axios from 'axios';
export default function UserLocation({route}) {
  const {navigate} = useNavigation();
  const [currentLocation, setCurrentLocation] = useState({});
  const {currentUser, setCurrentUser} = useContext(userContext);
  useEffect(() => {
    const getCurrenrtLocation = async () => {
      if (route.params) {
        await axios
          .get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${route.params.location.latitude}&lon=${route.params.location.longitude}`)
          .then(({data}) => {
            setCurrentLocation({
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
  const getPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          navigate('Map',{name:"UserLocation"});
        } else {
          console.log('Camera permission denied');
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  const handeNext = () => {
    if (Object.keys(currentLocation).length > 0) {
      setCurrentUser({
        ...currentUser,
        address: {
          fullName: currentUser.firstName+" "+currentUser.lastName,
          phoneNumber: currentUser.phoneNumber,
          ...currentLocation,
        },
      });
      navigate('Congratulations');
    } else {
      Alert.alert('Please choose your location');
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <ImageBackground style={styles.imageBackground} source={require('../../../assets/images/bgImage.png')} />
        <View style={styles.content}>
          <TouchableOpacity style={styles.btnBack} onPress={() => navigate('UserUploadPhoto')}>
            <Ionicons name="chevron-back" size={24} color={COLORS.brown} />
          </TouchableOpacity>
          <Text style={styles.title}>Set Your Location</Text>
          <Text style={styles.text}>This data will be displayed in your account profile for security</Text>

          <View style={styles.wrapper}>
            <View style={styles.subWrapper}>
              <Image style={styles.icon} source={require('../../../assets/images/location.png')} />
              <Text style={styles.mess}>Your location</Text>
            </View>
            {route.params ? <Text style={styles.location}>{currentLocation.addressDetail}</Text> : null}
            <TouchableOpacity style={styles.btnSetLocation} onPress={getPermission}>
              <Text style={styles.mess}>Set Location</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <View style={styles.btnNext}>
        <CustomButton text={'Next'} widh={150} onPress={handeNext} />
      </View>
    </View>
  );
}

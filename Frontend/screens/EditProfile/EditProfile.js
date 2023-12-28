import React, {useContext, useState} from 'react';
import {Text, View, Keyboard, KeyboardAvoidingView, TextInput, TouchableOpacity, TouchableWithoutFeedback, Alert, ScrollView, ImageBackground, Image, PermissionsAndroid, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import styles from './EditProfile.style';
import {COLORS} from '../../constants';
import CustomButton from '../../components/CustomButton/CustomButton';
import Ip from '../../constants/ipAddress';
import {userContext} from '../../Context/UserContext';

export default function EditProfile() {
  const {navigate} = useNavigation();
  const {userId, currentUser, setCurrentUser} = useContext(userContext);
  const [userInfo, setUserInfo] = useState({
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    phoneNumber: currentUser.phoneNumber,
  });
  const [imageUrl, setImageUrl] = useState(currentUser.avatar);
  const onPressCamera = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          const result = await launchCamera({saveToPhotos: true});
          setImageUrl(result?.assets[0]?.uri);
        } else {
          console.log('Camera permission denied');
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  const onPressImagesLib = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES);
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          const result = await launchImageLibrary();
          if (result?.assets[0]?.uri) {
            setImageUrl(result?.assets[0]?.uri);
          }
        } else {
          console.log('Images li permission denied');
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  const handleSubmit = async () => {
    if (userInfo.firstName === '' || userInfo.lastName === '' || userInfo.phoneNumber === '') {
      Alert.alert('Please fill full information!');
    } else if (userInfo.phoneNumber.match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)) {
      setCurrentUser({...currentUser, ...userInfo, avatar: imageUrl});
      navigate('Profile');
      axios
        .put(`http://${Ip}:3000/updateuserinfo/${userId}`, {...currentUser, ...userInfo, avatar: imageUrl, isEdit: true})
        .then(({data}) => {
          
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      Alert.alert('Please enter a valid phone number');
    }
  };
  return (
    <KeyboardAvoidingView style={styles.container}>
      <ImageBackground style={styles.imageBackground} source={require('../../assets/images/bgImage.png')} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView style={{flex: 1}}>
          <View style={styles.content}>
            <TouchableOpacity style={styles.btnBack} onPress={() => navigate('Profile')}>
              <Ionicons name="chevron-back" size={24} color={COLORS.brown} />
            </TouchableOpacity>
            <Text style={styles.title}>Edit your profile</Text>
            <Text style={styles.text}>This data will be displayed in your account profile for security</Text>
            <View style={styles.imageChoosen}>
              <Image style={styles.userImage} source={imageUrl ? {uri: imageUrl} : require('../../assets/images/user.png')} />

              <TouchableOpacity style={styles.paymentMethod} onPress={onPressImagesLib}>
                <Image source={require('../../assets/images/image-gallery.png')} style={[styles.paymentMethodImg, {width: 60}]} />
                <Text style={styles.mess}>From Gallery</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.paymentMethod} onPress={onPressCamera}>
                <Image source={require('../../assets/images/camera.png')} style={styles.paymentMethodImg} />
                <Text style={styles.mess}>Take Photo</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.formGroup}>
              <Ionicons name="person-circle" style={styles.formIcon} />
              <TextInput
                value={userInfo.firstName}
                onChangeText={(value) => setUserInfo({...userInfo, firstName: value})}
                style={styles.formControl}
                placeholder="Enter your first name"
                placeholderTextColor={'#cecece'}
              />
            </View>
            <View style={styles.formGroup}>
              <Ionicons name="person-circle" style={styles.formIcon} />
              <TextInput
                value={userInfo.lastName}
                onChangeText={(value) => setUserInfo({...userInfo, lastName: value})}
                style={styles.formControl}
                placeholder="Enter your last name"
                placeholderTextColor={'#cecece'}
              />
            </View>
            <View style={styles.formGroup}>
              <Ionicons name="call-sharp" style={styles.formIcon} />
              <TextInput
                value={userInfo.phoneNumber}
                onChangeText={(value) => setUserInfo({...userInfo, phoneNumber: value})}
                style={styles.formControl}
                placeholder="Enter your phone number"
                placeholderTextColor={'#cecece'}
              />
            </View>
          </View>
          <View style={styles.btnNext}>
            <CustomButton text={'Update'} widh={150} onPress={handleSubmit} />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

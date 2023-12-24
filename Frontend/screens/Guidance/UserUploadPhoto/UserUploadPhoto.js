import {
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
  ImageBackground,
  Image,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './UserUploadPhoto.style';
import CustomButton from '../../../components/CustomButton/CustomButton';
import {COLORS} from '../../../constants';
import {userContext} from '../../../Context/UserContext';
export default function UserUploadPhoto() {
  const {navigate} = useNavigation();
  const [imageUrl, setImageUrl] = useState(null);
  const {currentUser, setCurrentUser} = useContext(userContext);

  const onPressCamera = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
        );
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
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        );
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
  const handleNext = () => {
    setCurrentUser({...currentUser, avatar: imageUrl});
    navigate('UserLocation');
  };
  return (
    <KeyboardAvoidingView style={styles.container}>
      <ImageBackground
        style={styles.imageBackground}
        source={require('../../../assets/images/bgImage.png')}
      />
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => navigate('UserPaymentMethod')}>
          <Ionicons name="chevron-back" size={24} color={COLORS.brown} />
        </TouchableOpacity>
        <Text style={styles.title}>Upload Your Photo Profile </Text>
        <Text style={styles.text}>
          This data will be displayed in your account profile for security
        </Text>

        <View style={styles.imageChoosen}>
          <Image
            style={styles.userImage}
            source={
              imageUrl
                ? {uri: imageUrl}
                : require('../../../assets/images/user.png')
            }
          />
          <TouchableOpacity
            style={styles.paymentMethod}
            onPress={onPressImagesLib}>
            <Image
              source={require('../../../assets/images/image-gallery.png')}
              style={[styles.paymentMethodImg, {width: 60}]}
            />
            <Text style={styles.mess}>From Gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.paymentMethod}
            onPress={onPressCamera}>
            <Image
              source={require('../../../assets/images/camera.png')}
              style={styles.paymentMethodImg}
            />
            <Text style={styles.mess}>Take Photo</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.btnNext}>
        <CustomButton text={'Next'} widh={150} onPress={handleNext} />
      </View>
    </KeyboardAvoidingView>
  );
}

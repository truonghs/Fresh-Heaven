import {
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
  ImageBackground,
  Image,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './UserUploadPhoto.style';
import CustomButton from '../../../components/CustomButton/CustomButton';
import {COLORS} from '../../../constants';
export default function UserUploadPhoto() {
  const {navigate} = useNavigation();
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
            // source={{
            //   uri: 'https://scontent.fsgn19-1.fna.fbcdn.net/v/t39.30808-1/409605809_2046023819099995_2387937422268289495_n.jpg?stp=c3.0.240.240a_dst-jpg_p240x240&_nc_cat=105&ccb=1-7&_nc_sid=5740b7&_nc_ohc=QVpKAVwHSzUAX8zdI_D&_nc_ht=scontent.fsgn19-1.fna&oh=00_AfCHkzrz2N7OA10D7Istc03TjoM_6JDwNUFtWX4v12o6fg&oe=6588F214',
            // }}
            source={require('../../../assets/images/user.png')}
          />
          <TouchableOpacity style={styles.paymentMethod}>
            <Image
              source={require('../../../assets/images/image-gallery.png')}
              style={[styles.paymentMethodImg, {width: 60}]}
            />
            <Text style={styles.mess}>From Gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.paymentMethod}>
            <Image
              source={require('../../../assets/images/camera.png')}
              style={styles.paymentMethodImg}
            />
            <Text style={styles.mess}>Take Photo</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.btnNext}>
        <CustomButton
          text={'Next'}
          widh={150}
          onPress={() => navigate('UserLocation')}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

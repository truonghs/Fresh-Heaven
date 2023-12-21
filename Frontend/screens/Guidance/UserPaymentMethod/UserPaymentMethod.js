import {
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Alert,
  ImageBackground,
  Image,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './UserPaymentMethod.style';
import CustomButton from '../../../components/CustomButton/CustomButton';
import {COLORS} from '../../../constants';
export default function UserPaymentMethod() {
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
          onPress={() => navigate('UserInfo')}>
          <Ionicons name="chevron-back" size={24} color={COLORS.brown} />
        </TouchableOpacity>
        <Text style={styles.title}>Payment Method</Text>
        <Text style={styles.text}>
          This data will be displayed in your account profile for security
        </Text>
        <TouchableOpacity style={styles.paymentMethod}>
          <Image
            source={require('../../../assets/images/visa.png')}
            style={styles.paymentMethodImg}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.paymentMethod}>
          <Image
            source={require('../../../assets/images/Paypal.png')}
            style={[styles.paymentMethodImg, {width:110}]}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.paymentMethod}>
          <Image
            source={require('../../../assets/images/Razorpay.png')}
            style={[styles.paymentMethodImg, {width: 150, objectFit: 'cover'}]}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.btnNext}>
        <CustomButton
          text={'Next'}
          widh={150}
          onPress={() => navigate('UserUploadPhoto')}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

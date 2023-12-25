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
import React, {useContext, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './UserPaymentMethod.style';
import CustomButton from '../../../components/CustomButton/CustomButton';
import {COLORS} from '../../../constants';
import {userContext} from '../../../Context/UserContext';
export default function UserPaymentMethod() {
  const {navigate} = useNavigation();
  const {currentUser, setCurrentUser} = useContext(userContext);
  const [paymentMethod, setPaymentMethod] = useState('');
  const handleNext = () => {
    if (paymentMethod === '') {
      Alert.alert('Please choose one payment method');
    } else {
      setCurrentUser({...currentUser, paymentMethod: paymentMethod});
      navigate('UserUploadPhoto');
    }
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
          onPress={() => navigate('UserInfo')}>
          <Ionicons name="chevron-back" size={24} color={COLORS.brown} />
        </TouchableOpacity>
        <Text style={styles.title}>Payment Method</Text>
        <Text style={styles.text}>
          This data will be displayed in your account profile for security
        </Text>
        <TouchableOpacity
          style={[
            styles.paymentMethod,
            paymentMethod === 'visa' ? styles.active : null,
          ]}
          onPress={() => setPaymentMethod('visa')}>
          <Image
            source={require('../../../assets/images/visa.png')}
            style={styles.paymentMethodImg}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.paymentMethod,
            paymentMethod === 'paypal' ? styles.active : null,
          ]}
          onPress={() => setPaymentMethod('paypal')}>
          <Image
            source={require('../../../assets/images/Paypal.png')}
            style={[styles.paymentMethodImg, {width: 130}]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.paymentMethod,
            paymentMethod === 'razorpay' ? styles.active : null,
          ]}
          onPress={() => setPaymentMethod('razorpay')}>
          <Image
            source={require('../../../assets/images/Razorpay.png')}
            style={[styles.paymentMethodImg, {width: 180, objectFit: 'cover'}]}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.btnNext}>
        <CustomButton text={'Next'} widh={150} onPress={handleNext} />
      </View>
    </KeyboardAvoidingView>
  );
}

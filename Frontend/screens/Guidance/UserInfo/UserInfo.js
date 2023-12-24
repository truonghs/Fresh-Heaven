import React, {useContext, useState} from 'react';
import {
  Text,
  View,
  Keyboard,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
  ScrollView,
  ImageBackground,
} from 'react-native';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../../constants';
import styles from './UserInfo.style';
import CustomButton from '../../../components/CustomButton/CustomButton';
import {useNavigation} from '@react-navigation/native';
import Ip from '../../../constants/ipAddress';
import {userContext} from '../../../Context/UserContext';
export default function UserInfo() {
  const {navigate} = useNavigation();
  const {userId, currentUser, setCurrentUser} = useContext(userContext);
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
  });
  const handleSubmit = async () => {
    if (
      userInfo.firstName === '' ||
      userInfo.lastName === '' ||
      userInfo.phoneNumber === ''
    ) {
      Alert.alert('Please fill full information!');
    } else if (
      userInfo.phoneNumber.match(
        /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
      )
    ) {
      setCurrentUser({...currentUser, ...userInfo});
      navigate('UserPaymentMethod');
    } else {
      Alert.alert('Please enter a valid phone number');
    }
  };
  return (
    <KeyboardAvoidingView style={styles.container}>
      <ImageBackground
        style={styles.imageBackground}
        source={require('../../../assets/images/bgImage.png')}
      />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView style={{flex: 1}}>
          <View style={styles.content}>
            <TouchableOpacity style={styles.btnBack}>
              <Ionicons name="chevron-back" size={24} color={COLORS.brown} />
            </TouchableOpacity>
            <Text style={styles.title}>Fill in your bio to get started</Text>
            <Text style={styles.text}>
              This data will be displayed in your account profile for security
            </Text>
            <View style={styles.formGroup}>
              <Ionicons name="person-circle" style={styles.formIcon} />
              <TextInput
                value={userInfo.firstName}
                onChangeText={value =>
                  setUserInfo({...userInfo, firstName: value})
                }
                style={styles.formControl}
                placeholder="Enter your first name"
                placeholderTextColor={'#cecece'}
              />
            </View>
            <View style={styles.formGroup}>
              <Ionicons name="person-circle" style={styles.formIcon} />
              <TextInput
                value={userInfo.lastName}
                onChangeText={value =>
                  setUserInfo({...userInfo, lastName: value})
                }
                style={styles.formControl}
                placeholder="Enter your last name"
                placeholderTextColor={'#cecece'}
              />
            </View>
            <View style={styles.formGroup}>
              <Ionicons name="call-sharp" style={styles.formIcon} />
              <TextInput
                value={userInfo.phoneNumber}
                onChangeText={value =>
                  setUserInfo({...userInfo, phoneNumber: value})
                }
                style={styles.formControl}
                placeholder="Enter your phone number"
                placeholderTextColor={'#cecece'}
              />
            </View>
          </View>
          <View style={styles.btnNext}>
            <CustomButton text={'Next'} widh={150} onPress={handleSubmit} />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

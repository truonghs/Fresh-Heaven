import React from 'react';
import {
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../../constants';
import styles from './UserInfo.style';
import CustomButton from '../../../components/CustomButton/CustomButton';
import {useNavigation} from '@react-navigation/native';

export default function UserInfo() {
  const {navigate} = useNavigation();
  return (
    <KeyboardAvoidingView style={styles.container}>
      <ImageBackground
        style={styles.imageBackground}
        source={require('../../../assets/images/bgImage.png')}
      />
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
            style={styles.formControl}
            placeholder="Enter your first name"
            placeholderTextColor={'#cecece'}
          />
        </View>
        <View style={styles.formGroup}>
          <Ionicons name="person-circle" style={styles.formIcon} />
          <TextInput
            style={styles.formControl}
            placeholder="Enter your last name"
            placeholderTextColor={'#cecece'}
          />
        </View>
        <View style={styles.formGroup}>
          <Ionicons name="call-sharp" style={styles.formIcon} />
          <TextInput
            style={styles.formControl}
            placeholder="Enter your phone number"
            placeholderTextColor={'#cecece'}
          />
        </View>
      </View>
      <View style={styles.btnNext}>
        <CustomButton text={'Next'} widh={150} onPress={() => navigate('UserPaymentMethod')} />
      </View>
    </KeyboardAvoidingView>
  );
}

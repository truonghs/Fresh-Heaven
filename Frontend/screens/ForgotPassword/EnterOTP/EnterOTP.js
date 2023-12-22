import {
  StyleSheet,
  Text,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Alert,
  ImageBackground,
  Pressable,
} from 'react-native';
import GradientText from 'react-native-gradient-texts';
import React, {useState, useEffect, useContext} from 'react';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
//---------------//---------------//
import Ip from '../../../constants/ipAddress';
import {useNavigation} from '@react-navigation/native';
//---------------/Context/---------------//
import {cartContext} from '../../../Context/CartContext';
import {userContext} from '../../../Context/UserContext';
import font from '../../../assets/fonts/font';
import {COLORS, SIZES} from '../../../constants';
import CustomButton from '../../../components/CustomButton/CustomButton';
import styles from './EnterOTP.style';
const EnterOTP = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <ImageBackground
        style={styles.imageBackground}
        source={require('../../../assets/images/bgImage.png')}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <View style={styles.headingContainer}>
              <Image
                style={styles.logo}
                source={require('../../../assets/images/logo-trans.png')}
              />
              <GradientText
                text={'Fresh Heaven'}
                fontSize={34}
                width={420}
                locations={{x: 210, y: 32}}
                isGradientFill
                height={40}
                style={styles.name}
                gradientColors={[COLORS.primary, COLORS.secondary]}
                fontFamily={font.bold}
              />
              {/* <Text style={styles.name}>Fresh Heaven</Text> */}
              <Text style={styles.slogan}>Taste the Difference</Text>
              <Text style={styles.slogan}>Choose Fresh Heaven</Text>
            </View>

            <View style={{alignItems: 'center'}}>
              <Text style={styles.title}>Enter 4 digit OPT code</Text>
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.shadow}>
                <View style={styles.inputField}>
                  <View style={styles.iconContainer}>
                    <MaterialIcons style={styles.icon} name="email" size={24} />
                  </View>
                  <TextInput
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.input}
                    placeholder="Enter your Email"
                    placeholderTextColor={'#cecece'}
                  />
                </View>
              </View>
            </View>

            <CustomButton
              onPress={() => navigation.navigate('EnterOTP')}
              text={'Verify Email'}
            />

            <View style={styles.linkContainer}>
              <Text style={styles.linkText}>
                Already have an account?{' '}
                <Text
                  onPress={() => navigation.navigate('AuthStack')}
                  style={styles.link}>
                  Log in here!
                </Text>
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default EnterOTP;

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
import styles from './Login.style';
//---------------//---------------//
import Ip from '../../constants/ipAddress';
import {useNavigation} from '@react-navigation/native';
//---------------/Context/---------------//
import {cartContext} from '../../Context/CartContext';
import {userContext} from '../../Context/UserContext';
import font from '../../assets/fonts/font';
import {COLORS, SIZES} from '../../constants';
import CustomButton from '../../components/CustomButton/CustomButton';

// import {COLORS} from '../../constants';
function Login() {
  const [isStay, setIsStay] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const {setUserId} = useContext(userContext);
  const {FetchCart} = useContext(cartContext);
  const [isEyePressed, setIsEyePressed] = useState(false);
  // const [onSelected, setOnSelected] = useState('');
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        const isFirstTime = await AsyncStorage.getItem('isFirstTime');
        if (token) {
          const decodedToken = jwt_decode(token);
          const userId = decodedToken.userId;
          if (isFirstTime === 'true') {
            navigation.replace('GuidanceStack');
          } else {
            FetchCart(userId);
            navigation.replace('BottomTabNavigation');
          }
          console.log('login id: ', userId);
          setUserId(userId);
        }
      } catch (err) {
        console.log('error login', err);
      }
    };
    checkLoginStatus();
  }, []);
  const handleLogin = () => {
    const user = {
      email: email,
      password: password,
    };
    axios
      .post(`http://${Ip}:3000/login`, user)
      .then(({data}) => {
        const token = data.token;
        if (token) {
          if (isStay) {
            AsyncStorage.setItem('authToken', token);
            AsyncStorage.setItem(
              'isFirstTime',
              String(jwt_decode(token).firstTime),
            );
          }
          const decodedToken = jwt_decode(token);
          const userId = decodedToken.userId;
          const firstTime = decodedToken.firstTime;
          if (firstTime) {
            navigation.replace('GuidanceStack');
          } else {
            FetchCart(userId);
            navigation.replace('BottomTabNavigation');
          }
          console.log('login id: ', userId);
          setUserId(userId);
        } else {
          Alert.alert('Please verify your email!');
        }
      })
      .catch(error => {
        Alert.alert('Login Error', error.response.data.message);
      });
  };
  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <ImageBackground
        style={styles.imageBackground}
        source={require('../../assets/images/bgImage.png')}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <View style={styles.headingContainer}>
              <Image
                style={styles.logo}
                source={require('../../assets/images/logo-trans.png')}
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
              <Text style={styles.title}>Login To Your Account</Text>
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

              <View style={styles.shadow}>
                <View style={styles.inputField}>
                  <View style={styles.flex}>
                    <View style={styles.iconContainer}>
                      <Fontisto name="locked" size={24} style={styles.icon} />
                    </View>
                    <TextInput
                      value={password}
                      onChangeText={text => setPassword(text)}
                      secureTextEntry={!isEyePressed}
                      style={styles.input}
                      placeholder="Enter your Password"
                      placeholderTextColor={'#cecece'}
                    />
                  </View>
                  <TouchableOpacity
                    onPress={() => setIsEyePressed(!isEyePressed)}>
                    <Entypo
                      name={!isEyePressed ? 'eye-with-line' : 'eye'}
                      style={styles.eye}
                      size={24}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={styles.forgotContainer}>
              <View style={styles.flexCheck}>
                <BouncyCheckbox
                  isChecked={isStay}
                  size={20}
                  fillColor={COLORS.primary}
                  unfillColor="#FFFFFF"
                  disableText={true}
                  iconStyle={{borderColor: COLORS.primary}}
                  innerIconStyle={{borderWidth: 2}}
                  textStyle={{fontFamily: font.regular}}
                  onPress={() => setIsStay(!isStay)}
                />
                <Text style={styles.checkText}>Keep me logged in</Text>
              </View>
              <Text style={styles.link}>Forgot Password</Text>
            </View>

            <CustomButton onPress={() => handleLogin()} text={'Login'} />

            <View style={styles.linkContainer}>
              <Text style={styles.linkText}>
                Don't have an account?{' '}
                <Text
                  onPress={() => navigation.navigate('Register')}
                  style={styles.link}>
                  Sign up here!
                </Text>
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

export default Login;

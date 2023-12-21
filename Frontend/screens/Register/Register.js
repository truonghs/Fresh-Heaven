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
  ScrollView,
} from 'react-native';
import GradientText from 'react-native-gradient-texts';
import React, {useState, useEffect, useContext} from 'react';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';

import jwt_decode from 'jwt-decode';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './Register.style';
//---------------//---------------//
import Ip from '../../constants/ipAddress';
import {useNavigation} from '@react-navigation/native';
//---------------/Context/---------------//
import {cartContext} from '../../Context/CartContext';
import {userContext} from '../../Context/UserContext';
import font from '../../assets/fonts/font';
import {COLORS, SIZES} from '../../constants';
import CustomButton from '../../components/CustomButton/CustomButton';
function Register() {
  const [isEyePressed, setIsEyePressed] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCPassword] = useState('');
  const [name, setName] = useState('');
  const navigation = useNavigation();
  const handleRegister = () => {
    if (cpassword === password) {
      const user = {
        name: name,
        email: email,
        password: password,
      };
      //send a POST  request to the backend API to register the user
      axios
        .post(`http://${Ip}:3000/register`, user)
        .then(response => {
          Alert.alert(
            'Registration successful',
            'You have been registered Successfully',
          );
          // setName('');
          // setEmail('');
          // setPassword('');
          // setCPassword('');
        })
        .catch(error => {
          Alert.alert(
            'Registration Error',
            'An error occurred while registering',
          );
          console.log('registration failed', error);
        });
    } else {
      Alert.alert('Password confirmation does not match!');
    }
  };
  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <ImageBackground
        style={styles.imageBackground}
        source={require('../../assets/images/bgImage.png')}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{flex: 1}}>
            <ScrollView>
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
                  <Text style={styles.title}>Sign Up For Free</Text>
                </View>

                <View style={styles.inputContainer}>
                  <View>
                    <View style={styles.inputField}>
                      <View style={styles.iconContainer}>
                        <FontAwesome
                          style={styles.icon}
                          name="user"
                          size={24}
                        />
                      </View>
                      <TextInput
                        value={name}
                        onChangeText={text => setName(text)}
                        style={styles.input}
                        placeholder="Enter your name"
                        placeholderTextColor={'#cecece'}
                      />
                    </View>
                  </View>

                  <View style={styles.shadow}>
                    <View style={styles.inputField}>
                      <View style={styles.iconContainer}>
                        <MaterialIcons
                          style={styles.icon}
                          name="email"
                          size={24}
                        />
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
                          <Fontisto
                            name="locked"
                            size={24}
                            style={styles.icon}
                          />
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
                  <View>
                    <View style={styles.inputField}>
                      <View style={styles.iconContainer}>
                        <Fontisto name="locked" size={24} style={styles.icon} />
                      </View>
                      <TextInput
                        value={cpassword}
                        onChangeText={text => setCPassword(text)}
                        secureTextEntry={!isEyePressed}
                        style={styles.input}
                        placeholder="Confim your Password"
                        placeholderTextColor={'#cecece'}
                      />
                    </View>
                  </View>
                </View>

                <CustomButton
                  onPress={() => handleRegister()}
                  text={'Create Account'}
                />

                <View style={styles.linkContainer}>
                  <Text style={styles.linkText}>
                    Don't have an account?{' '}
                    <Text
                      onPress={() => navigation.navigate('Login')}
                      style={styles.link}>
                      Log in here!
                    </Text>
                  </Text>
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

export default Register;

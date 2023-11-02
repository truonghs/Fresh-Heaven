import {
  StyleSheet,
  Text,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import Ip from '../../constants/ipAddress';
import {UserType} from '../../UserContext';

import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './Login.style';
import {COLORS} from '../../constants';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const {userId, setUserId} = useContext(UserType);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');

        if (token) {
          navigation.replace('BottomTabNavigation');
        }
      } catch (err) {
        console.log('error message', err);
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
      .then(response => {
        const token = response.data.token;
        if (token) {
          setUserId(userId);

          AsyncStorage.setItem('authToken', token);
          navigation.replace('BottomTabNavigation');
        } else {
          Alert.alert('Please verify your email!');
        }
      })
      .catch(error => {
        Alert.alert('Login Error', error.response.data.message);
      });
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View>
          <Image
            style={styles.logo}
            source={require('../../assets/images/logo-trans.png')}
          />
        </View>

        <KeyboardAvoidingView>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.title}>Login</Text>
          </View>

          <View style={styles.inputContainer}>
            <View>
              <View style={styles.inputField}>
                <View style={styles.iconContainer}>
                  <MaterialIcons
                    style={styles.icon}
                    name="email"
                    size={24}
                    color="gray"
                  />
                </View>
                <TextInput
                  value={email}
                  onChangeText={text => setEmail(text)}
                  style={styles.input}
                  placeholder="Enter your Email"
                />
              </View>
            </View>

            <View>
              <View style={styles.inputField}>
                <View style={styles.iconContainer}>
                  <Fontisto
                    name="locked"
                    size={24}
                    color="gray"
                    style={styles.icon}
                  />
                </View>
                <TextInput
                  value={password}
                  onChangeText={text => setPassword(text)}
                  secureTextEntry={true}
                  style={styles.input}
                  placeholder="Enter your Password"
                />
              </View>
            </View>
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.text}>Keep me logged in</Text>

            <Text style={styles.forgot}>Forgot Password</Text>
          </View>

          <Pressable onPress={handleLogin} style={styles.btn}>
            <Text style={styles.btnText}>Login</Text>
          </Pressable>

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
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default Login;

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
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import Ip from '../../constants/ipAddress';

import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './Register.style';
import {COLORS} from '../../constants';
function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCPassword] = useState('');

  const [name, setName] = useState('');
  const navigation = useNavigation();
  const handleRegister = () => {
    if (cpassword == password) {
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView>
        <View style={styles.container}>
          <View>
            <Image
              style={styles.logo}
              source={require('../../assets/images/logo-trans.png')}
            />
          </View>

          <KeyboardAvoidingView>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.title}>Register</Text>
            </View>

            <View style={styles.inputContainer}>
              <View>
                <View style={styles.inputField}>
                  <View style={styles.iconContainer}>
                    <FontAwesome style={styles.icon} name="user" size={24} />
                  </View>
                  <TextInput
                    value={name}
                    onChangeText={text => setName(text)}
                    style={styles.input}
                    placeholder="Enter your name"
                  />
                </View>
              </View>
              <View>
                <View style={styles.inputField}>
                  <View style={styles.iconContainer}>
                    <MaterialIcons style={styles.icon} name="email" size={24} />
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
                    <Fontisto name="locked" size={24} style={styles.icon} />
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
              <View>
                <View style={styles.inputField}>
                  <View style={styles.iconContainer}>
                    <Fontisto name="locked" size={24} style={styles.icon} />
                  </View>
                  <TextInput
                    value={cpassword}
                    onChangeText={text => setCPassword(text)}
                    secureTextEntry={true}
                    style={styles.input}
                    placeholder="Confim your Password"
                  />
                </View>
              </View>
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.text}>Keep me logged in</Text>

              <Text style={styles.forgot}>Forgot Password</Text>
            </View>

            <TouchableOpacity onPress={handleRegister} style={styles.btn}>
              <Text style={styles.btnText}>Register</Text>
            </TouchableOpacity>

            <View style={styles.linkContainer}>
              <Text style={styles.linkText}>
                Don't have an account?{' '}
                <Text
                  onPress={() => navigation.navigate('Login')}
                  style={styles.link}>
                  Login here!
                </Text>
              </Text>
            </View>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

export default Register;

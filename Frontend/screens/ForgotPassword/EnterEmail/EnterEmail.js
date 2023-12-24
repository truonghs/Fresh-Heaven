import {
  Text,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Alert,
  ImageBackground,
} from 'react-native';
import GradientText from 'react-native-gradient-texts';
import React, {useState} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import Ip from '../../../constants/ipAddress';
import {useNavigation} from '@react-navigation/native';
import font from '../../../assets/fonts/font';
import {COLORS, SIZES} from '../../../constants';
import CustomButton from '../../../components/CustomButton/CustomButton';
import styles from './EnterEmail.style';

const EnterEmail = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  const handleSubmit = async () => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      const userEmail = {
        email: email,
      };
      axios
        .put(`http://${Ip}:3000/forgot`, userEmail)
        .then(response => {
          Keyboard.dismiss();
          navigation.navigate('EnterOTP', {email});
        })
        .catch(error => {
          switch (error.response.status) {
            case 404: {
              Alert.alert(error.response.data.message);
              break;
            }
            case 405: {
              Alert.alert(error.response.data.message);
              break;
            }
            case 500: {
              Alert.alert(error.response.data.message);
              break;
            }
          }
        });
    } else {
      Alert.alert('You have entered an invalid email address!');
    }
  };

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
              <Text style={styles.title}>Enter Your Email</Text>
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.shadow}>
                <View style={styles.inputField}>
                  <View style={styles.iconContainer}>
                    <MaterialIcons style={styles.icon} name="email" size={24} />
                  </View>
                  <TextInput
                    value={email}
                    onChangeText={text => {
                      setEmail(text);
                    }}
                    style={styles.input}
                    placeholder="Enter your Email"
                    placeholderTextColor={'#cecece'}
                  />
                </View>
              </View>
            </View>

            <CustomButton
              onPress={() => handleSubmit()}
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

export default EnterEmail;

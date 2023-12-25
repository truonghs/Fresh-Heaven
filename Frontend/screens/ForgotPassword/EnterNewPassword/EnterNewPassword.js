import {
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
import React, {useState} from 'react';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import axios from 'axios';
//---------------//---------------//
import Ip from '../../../constants/ipAddress';
import {useNavigation} from '@react-navigation/native';
//---------------/Context/---------------//
import font from '../../../assets/fonts/font';
import {COLORS, SIZES} from '../../../constants';
import CustomButton from '../../../components/CustomButton/CustomButton';
import styles from './EnterNewPassword.style';
const EnterNewPassword = ({route}) => {
  const [newPassword, setNewPassword] = useState('');
  const [cNewPassword, setCNewPassword] = useState('');
  const [isEyePressed, setIsEyePressed] = useState(false);

  const navigation = useNavigation();
  const {token, email} = route.params;

  const handleSubmit = async () => {
    if (newPassword == cNewPassword) {
      const newPasswordData = {
        email: email,
        newPassword: newPassword,
        token: token,
      };
      axios
        .put(`http://${Ip}:3000/reset-password`, newPasswordData)
        .then(response => {
          Alert.alert('Password change successfully!');
          navigation.navigate('AuthStack');
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
              <Text style={styles.title}>Enter Your New Password</Text>
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.inputField}>
                <View style={styles.flex}>
                  <View style={styles.iconContainer}>
                    <Fontisto name="locked" size={24} style={styles.icon} />
                  </View>
                  <TextInput
                    value={newPassword}
                    onChangeText={text => setNewPassword(text)}
                    secureTextEntry={!isEyePressed}
                    style={styles.input}
                    placeholder="Enter your new Password"
                    placeholderTextColor={'#cecece'}
                  />
                </View>
                <TouchableOpacity
                  style={styles.eye}
                  onPress={() => setIsEyePressed(!isEyePressed)}>
                  <Entypo
                    color="#dbdbdb"
                    name={!isEyePressed ? 'eye-with-line' : 'eye'}
                    size={24}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.inputField}>
                <View style={styles.iconContainer}>
                  <Fontisto name="locked" size={24} style={styles.icon} />
                </View>
                <TextInput
                  value={cNewPassword}
                  onChangeText={text => setCNewPassword(text)}
                  secureTextEntry={!isEyePressed}
                  style={styles.input}
                  placeholder="Confim your new Password"
                  placeholderTextColor={'#cecece'}
                />
              </View>
            </View>

            <CustomButton
              onPress={() => handleSubmit()}
              text={'Change password'}
            />
          </View>
        </TouchableWithoutFeedback>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default EnterNewPassword;

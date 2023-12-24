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
  Pressable,
} from 'react-native';
import GradientText from 'react-native-gradient-texts';
import React, {useState} from 'react';
import axios from 'axios';
//---------------//---------------//
import Ip from '../../../constants/ipAddress';
import {useNavigation} from '@react-navigation/native';
//---------------/Context/---------------//
import font from '../../../assets/fonts/font';
import {COLORS, SIZES} from '../../../constants';
import CustomButton from '../../../components/CustomButton/CustomButton';
import styles from './EnterOTP.style';
const EnterOTP = ({route}) => {
  const [OTP, setOTP] = useState([null, null, null, null]);
  const [color1, setColor1] = useState('#cecece');
  const [color2, setColor2] = useState('#cecece');
  const [color3, setColor3] = useState('#cecece');
  const [color4, setColor4] = useState('#cecece');

  const navigation = useNavigation();
  const {email} = route.params;
  const handleInput = (index, value) => {
    var tmp = [...OTP];
    tmp[index] = value;
    setOTP(tmp);
  };
  const emptyInput = index => {
    var tmp = [...OTP];
    if (color1 != '#cecece') {
      setColor1('#cecece');
      setColor2('#cecece');
      setColor3('#cecece');
      setColor4('#cecece');
    }
    tmp[index] = '';
    setOTP(tmp);
  };
  const handleSubmit = async () => {
    const otp = OTP[0] + OTP[1] + OTP[2] + OTP[3];

    const verifyData = {
      email: email,
      otp: otp,
    };

    axios
      .put(`http://${Ip}:3000/getOtp`, verifyData)
      .then(response => {
        setColor1(COLORS.secondary);
        setTimeout(() => {
          setColor2(COLORS.secondary);
          setTimeout(() => {
            setColor3(COLORS.secondary);
            setTimeout(() => {
              setColor4(COLORS.secondary);
              setTimeout(() => {
                const token = response.data.token;
                Keyboard.dismiss();
                navigation.navigate('EnterNewPassword', {token, email});
              }, 100);
            }, 20);
          }, 20);
        }, 20);
      })
      .catch(error => {
        switch (error.response.status) {
          case 404: {
            Alert.alert(error.response.data.message);
            break;
          }
          case 405: {
            setColor1(COLORS.red);
            setTimeout(() => {
              setColor2(COLORS.red);
              setTimeout(() => {
                setColor3(COLORS.red);
                setTimeout(() => {
                  setColor4(COLORS.red);
                  setTimeout(() => {}, 100);
                }, 20);
              }, 20);
            }, 20);
            break;
          }
          case 406: {
            Alert.alert(error.response.data.message);
            navigation.navigate('AuthStack');
            break;
          }
          case 500: {
            Alert.alert(error.response.data.message);
            break;
          }
        }
      });
  };
  // useEffect(() => {
  // }, [OTP[0], OTP[1], OTP[2], OTP[3]]);
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
              <Text style={styles.title}>Enter OPT code</Text>
            </View>
            <View style={{}}>
              <Text style={styles.text}>
                We have sent a 4 digit OTP code to your email.
              </Text>
              <Text style={styles.text}>
                The OTP will expire after 5 minutes!
              </Text>
              <View style={styles.flexRow}>
                <Text style={styles.text}>Didn't receive any emails?</Text>
                <Pressable>
                  <Text style={styles.againText}>Send again</Text>
                </Pressable>
              </View>
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.inputField(color1)}>
                <TextInput
                  style={styles.input(color1)}
                  value={OTP[0]}
                  onChangeText={value => {
                    handleInput(0, value);
                    this.secondTextInput.focus();
                  }}
                  onFocus={() => (OTP[0] ? emptyInput(0) : null)}
                  blurOnSubmit={false}
                  maxLength={1}
                  inputMode={'decimal'}
                />
              </View>
              <View style={styles.inputField(color2)}>
                <TextInput
                  style={styles.input(color2)}
                  blurOnSubmit={false}
                  ref={input => {
                    this.secondTextInput = input;
                  }}
                  value={OTP[1]}
                  onChangeText={value => {
                    handleInput(1, value);
                    this.thirdTextInput.focus();
                  }}
                  maxLength={1}
                  inputMode={'decimal'}
                  onFocus={() => (OTP[1] ? emptyInput(1) : null)}
                />
              </View>
              <View style={styles.inputField(color3)}>
                <TextInput
                  style={styles.input(color3)}
                  blurOnSubmit={false}
                  ref={input => {
                    this.thirdTextInput = input;
                  }}
                  value={OTP[2]}
                  onChangeText={value => {
                    handleInput(2, value);
                    this.fourthTextInput.focus();
                  }}
                  maxLength={1}
                  inputMode={'decimal'}
                  onFocus={() => (OTP[2] ? emptyInput(2) : null)}
                />
              </View>
              <View style={styles.inputField(color4)}>
                <TextInput
                  style={styles.input(color4)}
                  blurOnSubmit={false}
                  ref={input => {
                    this.fourthTextInput = input;
                  }}
                  value={OTP[3]}
                  onChangeText={value => {
                    handleInput(3, value);
                  }}
                  maxLength={1}
                  inputMode={'decimal'}
                  onFocus={() => (OTP[3] ? emptyInput(3) : null)}
                />
              </View>
            </View>

            <CustomButton onPress={() => handleSubmit()} text={'Verify OTP'} />
          </View>
        </TouchableWithoutFeedback>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default EnterOTP;

import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  Pressable,
} from 'react-native';
import React from 'react';
import styles from './Banner.style';
import GradientText from 'react-native-gradient-texts';
import {COLORS} from '../../constants';
import font from '../../assets/fonts/font';
const Banner = ({
  backgroundImage,
  title,
  titleColor,
  btnTextFirstColor,
  btnTextSecondColor,
  btnText,
}) => {
  return (
    <ImageBackground source={backgroundImage} style={styles.bgImage}>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.start}>
            <Text style={styles.title(titleColor)}>{title}</Text>
            <View style={styles.btnView}>
              <TouchableOpacity style={styles.btn}>
                <GradientText
                  text={btnText}
                  fontSize={12}
                  width={100}
                  locations={{x: 50, y: 22}}
                  isGradientFill
                  height={36}
                  style={styles.name}
                  gradientColors={[btnTextFirstColor, btnTextSecondColor]}
                  fontFamily={font.bold}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Banner;

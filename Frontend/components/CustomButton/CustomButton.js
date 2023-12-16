import {View, Text, Pressable, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import React from 'react';
import styles from './CustomButton.style';
import {COLORS} from '../../constants';
const CustomButton = ({
  widh,
  height,
  onPress,
  text,
  backgroundColor,
  textStyle,
}) => {
  if (!backgroundColor) {
    return (
      <TouchableOpacity onPress={onPress ? () => onPress() : null}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={[COLORS.primary, COLORS.secondary]}
          style={styles.btnContainer(widh, height, backgroundColor)}>
          <Text style={textStyle ? textStyle : styles.btnText}>{text}</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  } else
    return (
      <TouchableOpacity
        onPress={onPress ? () => onPress() : null}
        style={styles.btnContainer(widh, height, backgroundColor)}>
        <Text style={textStyle ? textStyle : styles.btnText}>{text}</Text>
      </TouchableOpacity>
    );
};

export default CustomButton;

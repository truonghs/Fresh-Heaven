import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../../constants';
import font from '../../assets/fonts/font';
const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  welcomeTxt: {
    fontFamily: font.bold,
    fontSize: SIZES.xxLarge - 5,
  },
});
export default styles;

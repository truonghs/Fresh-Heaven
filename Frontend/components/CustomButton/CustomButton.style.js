import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../../constants';
import font from '../../assets/fonts/font';
const styles = StyleSheet.create({
  btnContainer: (widh, height, backgroundColor) => ({
    width: widh ? widh : 200,
    height: height ? height : 50,
    backgroundColor: backgroundColor ? backgroundColor : null,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  }),
  btnText: {
    fontFamily: font.semiBold,
    fontSize: SIZES.medium,
    color: '#fff',
  },
});
export default styles;

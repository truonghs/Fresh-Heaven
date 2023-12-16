import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../../constants';
import font from '../../assets/fonts/font';
const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'flex-end',
    // justifyContent: 'center',
  },
  btnText: {
    fontFamily: font.semiBold,
    fontSize: SIZES.medium,
    backgroundColor: 'transparent',
  },
  bgImage: {
    width: '100%',
    height: '100%',
  },
  btn: {
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 6,
  },
  btnView: {
    width: 100,
    borderRadius: 10,
    position: 'relative',
  },
  start: {
    width: 140,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginRight: 0,
    height: '100%',
  },
  title: titleColor => ({
    fontFamily: font.bold,
    color: titleColor ? titleColor : '#fff',
    fontSize: 20,
    maxWidth: 140,
    height: 54,
    marginBottom: 10,
  }),
});
export default styles;

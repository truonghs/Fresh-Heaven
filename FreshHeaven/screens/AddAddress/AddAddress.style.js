import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../../constants';
import font from '../../assets/fonts/font';
const styles = StyleSheet.create({
  heading: {
    height: 50,
    backgroundColor: COLORS.thirth,
  },
  logoContainer: {
    marginTop: 10,
    flexDirection: 'column',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 55,
  },
  title: {
    fontSize: 15,
    fontFamily: font.bold,
    color: COLORS.primary,
  },
  input: {
    padding: 10,
    borderColor: '#D0D0D0',
    borderWidth: 1,
    marginTop: 10,
    borderRadius: 5,
    color: '#000',
  },
  inputContainer: {
    marginVertical: 10,
  },
  btn: {
    backgroundColor: COLORS.thirth,
    padding: 19,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  btnTxt: {
    color: '#fff',
    fontFamily: font.bold,
  },
});
export default styles;

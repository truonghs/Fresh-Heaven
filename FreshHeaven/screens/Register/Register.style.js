import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../../constants';
import font from '../../assets/fonts/font';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingTop: 70,
  },
  logo: {
    width: 266,
    height: 92,
  },
  title: {
    fontFamily: font.semiBold,
    fontSize: SIZES.xxLarge,
    marginTop: 30,
    color: '#041E42',
  },
  inputContainer: {
    marginTop: 10,
  },
  inputField: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'lightgray',
    borderRadius: 5,
    marginTop: 10,
  },
  input: {
    color: 'gray',
    marginVertical: 10,
    width: 300,
    fontSize: 16,
  },
  textContainer: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    color: '#000',
    fontFamily: font.regular,
  },
  iconContainer: {
    alignItems: 'center',
    width: 36,
  },
  icon: {
    color: COLORS.thirth,
    marginLeft: 10,
  },
  linkContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  linkText: {
    color: '#000',
    fontFamily: font.regular,
  },
  link: {
    color: '#007FFF',
    fontWeight: 'bold',
  },
  forgot: {
    color: '#007FFF',
    fontWeight: '500',
  },
  btn: {
    width: 200,
    backgroundColor: COLORS.thirth,
    borderRadius: 6,
    marginTop: 30,
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 15,
  },
  btnText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
export default styles;

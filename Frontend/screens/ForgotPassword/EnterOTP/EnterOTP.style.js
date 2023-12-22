import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../../../constants';
import font from '../../../assets/fonts/font';
const styles = StyleSheet.create({
  imageBackground: {
    position: 'absolute',
    width: SIZES.width,
    height: SIZES.height,
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorzontal: 20,
  },
  headingContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 110,
    height: 110,
    resizeMode: 'contain',
    marginBottom: 4,
  },
  slogan: {
    fontFamily: font.semiBold,
    fontSize: SIZES.medium - 4,
    padding: 0,
    lineHeight: SIZES.medium - 2,
    color: '#000',
  },
  title: {
    fontFamily: font.semiBold,
    fontSize: SIZES.xLarge,
    marginTop: 30,
    color: '#000',
  },
  inputContainer: {
    marginTop: 10,
    width: SIZES.width - 50,
    marginBottom: 20,
  },
  inputField: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#fff',
    borderRadius: 20,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#cecece',
  },
  input: {
    color: '#000',
    marginVertical: 10,
    width: 200,
    fontSize: 16,
    paddingVertical: 2,
    lineHeight: 20,
  },
  iconContainer: {
    alignItems: 'center',
    width: 36,
  },
  icon: {
    color: COLORS.primary,
    marginLeft: 8,
  },
  linkContainer: {
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'center',
  },
  linkText: {
    color: '#000',
    fontFamily: font.regular,
  },
  link: {
    color: '#007FFF',
    fontFamily: font.semiBold,
  },
});
export default styles;

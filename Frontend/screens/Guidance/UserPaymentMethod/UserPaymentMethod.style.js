import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../../../constants';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#fefeff',
  },
  imageBackground: {
    position: 'absolute',
    width: SIZES.width,
    height: SIZES.height,
    opacity: 0.3,
  },
  content: {
    marginHorizontal: 25,
    marginVertical: 45,
  },
  btnBack: {
    width: 50,
    height: 50,
    backgroundColor: COLORS.brownlight,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 28,
    marginBottom: 20,
  },
  text: {
    color: '#000',
    fontSize: 18,
    marginBottom: 40,
    lineHeight: 25,
  },
  paymentMethodImg: {
    width: 75,
    height: 70,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 30,
    shadowColor: '#afc5fa',
    elevation: 20,
  },
  formIcon: {
    fontSize: 24,
    color: COLORS.primary,
    width: 36,
    alignItems: 'center',
    marginLeft: 8,
  },
  formControl: {
    color: '#000',
    marginVertical: 10,
    width: 240,
    fontSize: 18,
    paddingVertical: 4,
  },
  btnNext: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 60,
    left: 140,
  },
  active: {
    backgroundColor: COLORS.primary,
  },
});
export default styles;

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
  imageChoosen: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  paymentMethodImg: {
    width: 50,
    height: 50,
  },
  paymentMethod: {
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    marginTop: 20,
    shadowColor: '#afc5fa',
    elevation: 20,
    padding: 10,
  },
  mess: {
    fontWeight: 'bold',
    marginTop: 5,
    fontSize: 16,
    color: '#000',
  },
  btnNext: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 60,
    left: 140,
  },
});
export default styles;

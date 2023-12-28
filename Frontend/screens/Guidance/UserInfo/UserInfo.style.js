import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../../../constants';
import font from '../../../assets/fonts/font';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // position: 'relative',
    backgroundColor: '#fff',
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
  formGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 30,
    padding: 8,
    // borderWidth: 1,
    // borderColor: '#cecece',
    shadowColor: '#afc5fa',
    elevation: 20,
  },
  formIcon: {
    fontSize: 30,
    color: COLORS.primary,
    width: 36,
    alignItems: 'center',
    marginLeft: 8,
    marginRight:8,
  },
  formControl: {
    color: '#000',
    marginVertical: 10,
    width: 240,
    fontSize: 18,
    paddingVertical: 4,
  },
  btnNext: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:120,
  },
});

export default styles;

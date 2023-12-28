import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefeff',
    alignItems: 'center',
  },
  imageBackground: {
    position: 'absolute',
    width: SIZES.width,
    height: SIZES.height,
    opacity: 0.3,
  },
  content: {
    marginHorizontal: 10,
    marginVertical: 30,
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
  icon: {
    width: 40,
    height: 40,
  },
  wrapper: {
    padding: 10,
    borderRadius: 15,
    backgroundColor: '#fff',
    shadowColor: '#afc5fa',
    elevation: 20,
  },
  subWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnSetLocation: {
    backgroundColor: '#f6f6f6',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    borderRadius: 10,
    marginTop: 25,
  },
  mess: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
    marginLeft: 15,
  },
  location: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
    marginLeft: 6,
    marginTop: 10,
  },
  btnNext: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 60,
  },
});
export default styles;

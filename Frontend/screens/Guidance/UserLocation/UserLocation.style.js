import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../../../constants';

const styles = StyleSheet.create({
  container: {
    flex:1,
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
  btnNext: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 60,
    left: 140,
  },
});
export default styles;

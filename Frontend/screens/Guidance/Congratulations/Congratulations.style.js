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
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    color: COLORS.fourth,
    fontSize: 25,
    marginBottom: 20,
    marginTop:20,
  },
  text: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 24,
    marginBottom: 40,
    lineHeight: 25,
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

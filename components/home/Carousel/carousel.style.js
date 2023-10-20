import {COLORS} from '../../../constants';
import {StyleSheet, Dimensions} from 'react-native';
const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    width: width - 24,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginLeft: 12,
    overflow: 'hidden',
  },
  swiper: {
    borderRadius: 10,
  },
  imgContainer: {
    borderRadius: 10,
    width: width - 10,
    height: 200,
    borderRadius: 10,
  },
  child: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
  },

  dot: {
    width: 8,
    height: 8,
  },
  dotActive: {
    backgroundColor: COLORS.primary,
  },
  dotInActive: {
    backgroundColor: COLORS.secondary,
  },
});
export default styles;

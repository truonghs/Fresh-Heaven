import {COLORS, SIZES} from '../../../constants';
import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  container: {
    height: 200,
    borderRadius: SIZES.small,
    width: SIZES.width,

    overflow: 'hidden',
  },
  child: {
    height: (SIZES.width * 9) / 16,
    width: SIZES.width,

    resizeMode: 'contain',
  },

  dot: {
    width: 6,
    height: 6,
    margin: SIZES.small,
  },
  dotActive: {
    backgroundColor: COLORS.primary,
  },
  dotInActive: {
    backgroundColor: COLORS.secondary,
  },
});
export default styles;

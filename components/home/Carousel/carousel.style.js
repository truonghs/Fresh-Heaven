import {COLORS, SIZES} from '../../../constants';
import {StyleSheet, Dimensions} from 'react-native';
const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    height: 200,
    width: width - SIZES.xLarge,
    marginHorizontal: SIZES.small,
    borderRadius: SIZES.small,
    overflow: 'hidden',
  },
  child: {
    height: 200,
    width: width,
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

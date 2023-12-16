import {COLORS, SIZES} from '../../../constants';
import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  bannerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SIZES.small,
    overflow: 'hidden',
    margin: 10,
  },
});
export default styles;

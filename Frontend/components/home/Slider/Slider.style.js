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
    elevation: 8,
    margin: 12,
    borderWidth: 0.5,
    borderColor: '#ccc',
    borderStyle: 'solid',
  },
});
export default styles;

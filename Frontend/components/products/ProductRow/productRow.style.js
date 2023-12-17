import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../../../constants';
import font from '../../../assets/fonts/font';
const styles = StyleSheet.create({
  container: {},
  flatListContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: scale => ({
    transform: [{scale: scale ? scale : 1}],
    width: scale ? 140 * scale : null,
    height: scale ? 230 * scale : null,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: scale ? 10 : 0,
  }),
});
export default styles;

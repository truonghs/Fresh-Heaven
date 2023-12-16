import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../../../constants';
import font from '../../../assets/fonts/font';
const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.medium,
    marginHorizontal: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontFamily: font.bold,
    fontSize: SIZES.xLarge - 2,
    color: '#000',
  },
  more: {
    color: COLORS.brown,
    fontFamily: font.regular,
    padding: 4,
  },
});

export default styles;

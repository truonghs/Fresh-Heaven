import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../../constants';
import font from '../../assets/fonts/font';
const styles = StyleSheet.create({
  textStyle: {
    fontFamily: font.bold,
    fontSize: 40,
    color: '#000',
  },
  appBarWrapper: {
    marginHorizontal: 16,
    marginTop: SIZES.xLarge,
  },
  appBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  location: {
    fontFamily: font.semiBold,
    fontSize: SIZES.medium,
    color: COLORS.gray,
  },
  cartCount: {
    position: 'absolute',
    bottom: SIZES.medium,
    width: SIZES.medium,
    height: SIZES.medium,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
    backgroundColor: 'green',
  },
  cartNumber: {
    fontFamily: font.regular,
    fontSize: 10,
    color: COLORS.lightWhite,
  },
});
export default styles;

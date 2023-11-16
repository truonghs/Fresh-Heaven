import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../../constants';
import font from '../../assets/fonts/font';
const styles = StyleSheet.create({
  title: {
    fontSize: SIZES.xLarge,
    fontFamily: font.bold,
    color: '#000',
  },
  link: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    paddingVertical: 7,
    paddingHorizontal: 5,
  },
  linkTxt: {
    fontFamily: font.regular,
    color: COLORS.primary,
    fontSize: SIZES.medium,
  },
  itemContainer: {
    borderWidth: 1,
    borderColor: '#D0D0D0',
    padding: 10,
    flexDirection: 'column',
    gap: 5,
    marginVertical: 10,
  },
  itemTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  itemName: {
    fontSize: SIZES.large,
    fontFamily: font.bold,
    color: COLORS.primary,
  },
  itemTxt: {
    fontSize: SIZES.medium,
    fontFamily: font.regular,
    color: '#181818',
  },
  btn: {
    color: '#000',
  },
});
export default styles;

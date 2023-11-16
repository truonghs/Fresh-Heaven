import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../../constants';
import font from '../../assets/fonts/font';
const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.medium,
    marginVertical: SIZES.medium,
    height: 50,
    marginHorizontal: SIZES.small,
  },
  searchIcon: {
    marginHorizontal: 10,
    color: COLORS.gray,
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: COLORS.secondary,
    borderRadius: 4,
  },
  searchInput: {
    fontFamily: font.regular,
    width: '100%',
    height: '100%',
    paddingHorizontal: SIZES.small,
    color: COLORS.gray,
  },
  searchBtn: {
    width: 50,
    height: '100%',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
  },
  searchImage: {
    resizeMode: 'center',
    width: SIZES.width - 100,
    height: SIZES.height - 100,
    opacity: 0.9,
  },
});
export default styles;

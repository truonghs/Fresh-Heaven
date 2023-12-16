import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../../../constants';
import font from '../../../assets/fonts/font';
const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  headingContainer: {
    marginTop: 10,
  },
  welcomeTxt: {
    fontFamily: font.bold,
    fontSize: 34,
    color: '#000',
    marginTop: 0,
    marginHorizontal: 12,
    lineHeight: 40,
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SIZES.medium,
    marginVertical: SIZES.medium,
    height: 50,
    marginHorizontal: SIZES.small,
    // backgroundColor: 'blue',
  },
  searchIcon: {
    marginLeft: 54,
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: '#fff8e8',
    elevation: 4,

    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    marginRight: SIZES.small,
    justifyContent: 'center',
    borderRadius: 10,
    width: '100%',
  },
  searchInput: {
    fontFamily: font.regular,
    width: '100%',
    height: '100%',
    paddingHorizontal: SIZES.small,
    backgroundColor: 'transparent',
  },
  searchBtn: {
    width: 50,
    height: '100%',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff8e8',
    elevation: 4,
  },
});
export default styles;

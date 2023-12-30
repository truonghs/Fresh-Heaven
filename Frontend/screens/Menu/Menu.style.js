import {StyleSheet, Text, View} from 'react-native';
import {COLORS, SIZES} from '../../constants';
import font from '../../assets/fonts/font';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.offwhite,
  },
  header: {
    backgroundColor: '#fff',
  },
  btnBack: {
    width: 50,
    height: '100%',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff8e8',
    elevation: 4,
    marginRight: 10,
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
    flexDirection: 'row',
    width: 60,
    height: '100%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff8e8',
    elevation: 4,
  },
  text: {
    color: COLORS.brown,
  },
  sortList: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    elevation: 4,
    marginBottom: 8,
  },
  sortItem: {
    flex: 0.4,
    padding: 10,
    borderRightWidth: 1,
    borderRightColor: '#ccc',
  },
  sortItemText: {
    fontSize: 18,
    color: '#000',
    textAlign: 'center',
    fontWeight: '500',
  },
  sortBasicActive: {
    backgroundColor: COLORS.primary,
  },
  noResult: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultText: {
    color: '#000',
    fontSize: 24,
  },
});
export default styles;

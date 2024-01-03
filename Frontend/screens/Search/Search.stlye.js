import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../../constants';
import font from '../../assets/fonts/font';
const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.offwhite,
    flex: 1,
  },
  header: {
    padding: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: '#000',
    fontSize: 20,
    fontWeight: '700',
  },
  imageBackground: {
    position: 'absolute',
    width: SIZES.width,
    height: SIZES.height,
    opacity: 0.3,
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: SIZES.medium,
    marginBottom: SIZES.medium,
    height: 50,
    marginHorizontal: SIZES.small,
  },
  searchBtn: {
    width: 30,
    marginLeft: 60,
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: '#fff8e8',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 50,
    elevation: 4,
    borderRadius: 10,
    // backgroundColor: 'red',
  },
  searchInput: {
    fontFamily: font.regular,
    width: '100%',
    height: '100%',
    paddingHorizontal: SIZES.small,
    backgroundColor: 'transparent',
  },
  btnBack: {
    width: 50,
    height: '100%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff8e8',
    elevation: 4,
    marginRight: 10,
  },
  bannerSearchContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  bannerSearch: {
    width: '100%',
    height: 400,
  },
});
export default styles;

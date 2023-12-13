import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../../constants';
import font from '../../assets/fonts/font';
const styles = StyleSheet.create({
  container: {
    width: 182,
    height: 240,
    marginEnd: 22,
    marginBottom: 120,
    borderRadius: SIZES.medium,
    backgroundColor: COLORS.secondary,
  },
  imgContainer: {
    flex: 1,
    width: 170,
    marginLeft: SIZES.small / 2,
    marginTop: SIZES.small / 2,
    borderRadius: SIZES.small,
    overflow: 'hidden',
    backgroundColor: 'gray',
  },
  img: {
    aspectRatio: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  details: {
    padding: SIZES.small,
  },
  title: {
    fontFamily: font.bold,
    fontSize: SIZES.large,
    color: '#000',
    height: 28,
  },
  suplier: {
    fontFamily: font.regular,
    fontSize: SIZES.small,
    color: COLORS.gray,
    height: 16,
  },
  price: {
    fontFamily: font.bold,
    fontSize: SIZES.medium,
    color: COLORS.gray,
  },
  addBtn: {
    position: 'absolute',
    bottom: SIZES.xSmall,
    right: SIZES.xSmall,
  },
});
export default styles;

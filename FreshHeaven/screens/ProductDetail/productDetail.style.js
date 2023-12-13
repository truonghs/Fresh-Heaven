import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../../constants';
import font from '../../assets/fonts/font';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  upperRow: {
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    top: SIZES.xLarge,
    zIndex: 999,
    width: SIZES.width - 44,
  },
  img: {
    // aspectRatio: 1,
    resizeMode: 'cover',
    width: '100%',
    height: 300,
  },
  detail: {
    marginTop: -SIZES.large,
    backgroundColor: COLORS.lightWhite,
    width: SIZES.width,
    borderTopLeftRadius: SIZES.medium,
    borderTopRightRadius: SIZES.medium,
  },
  titleRow: {
    marginHorizontal: 20,
    paddingBottom: SIZES.small,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: SIZES.width - 44,
    top: 20,
  },
  title: {
    fontFamily: font.bold,
    fontSize: SIZES.large,
    color: '#000',
  },
  priceWrapper: {
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.large,
  },
  price: {
    textAlignVertical: 'center',
    textAlign: 'center',
    paddingHorizontal: 10,
    fontFamily: font.semiBold,
    fontSize: SIZES.large,
    color: '#000',
  },
  ratingRow: {
    paddingBottom: SIZES.small,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: SIZES.width - 10,
    top: 5,
  },
  rating: {
    top: SIZES.large,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: SIZES.large,
  },
  ratingText: {
    color: COLORS.gray,
    fontFamily: font.medium,
    paddingHorizontal: SIZES.xSmall,
  },
  descWraper: {
    marginTop: SIZES.large * 2,
    marginHorizontal: SIZES.large,
  },
  desc: {
    fontFamily: font.bold,
    fontSize: SIZES.large,
    color: '#000',
  },
  descText: {
    fontFamily: font.regular,
    fontSize: SIZES.small,
    textAlign: 'justify',
    marginBottom: SIZES.small,
    color: '#000',
  },
  locationWrapper: {
    marginBottom: SIZES.small,
  },
  location: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.secondary,
    padding: 5,
    borderRadius: SIZES.large,
    marginHorizontal: 12,
  },
  locationRow: {
    flexDirection: 'row',
  },
  locationTxt: {
    marginLeft: 8,
    color: '#000',
  },
  deliveryTxt: {
    marginLeft: 8,
    color: '#000',
    marginRight: 8,
  },
  cartRow: {
    paddingBottom: SIZES.small,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: SIZES.width,
  },
  cartBtn: {
    width: SIZES.width * 0.7,
    backgroundColor: '#000',
    padding: SIZES.small / 2,
    borderRadius: SIZES.large,
    marginLeft: 12,
  },
  cartTitle: {
    fontFamily: font.semiBold,
    fontSize: SIZES.medium,
    color: COLORS.lightWhite,
    marginLeft: SIZES.small,
    marginTop: 4,
  },
  addCart: {
    width: 44,
    height: 44,
    borderRadius: 44,
    margin: SIZES.small,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default styles;

import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../../../constants';
import font from '../../../assets/fonts/font';
const styles = StyleSheet.create({
  container: scale => ({
    transform: [{scale: scale ? scale : 1}],
    width: 180,
    height: 260,
    borderRadius: SIZES.medium,
    backgroundColor: '#fff',
    elevation: 4,
    marginVertical: 10,
    overflow: 'hidden',
    paddingHorizontal: 10,
    marginHorizontal: scale ? 0 : 10,

    // marginRight: scale ? (1 - parseInt(scale)) * -24 : 0,
    // marginTop: scale ? (1 - parseInt(scale)) * -22 : 0,
  }),
  imgContainer: {
    // flex: 1,
    width: '100%',
    height: 120,
    // marginLeft: SIZES.small / 2,
    // marginTop: SIZES.small / 2,
    // borderRadius: SIZES.small,
    // overflow: 'hidden',
    backgroundColor: '#fff',
    overflow: 'hidden',
    alignItems: 'center',
  },
  img: {
    aspectRatio: 1,
    height: 120,
    backgroundColor: '#fff',
    resizeMode: 'center',
  },
  details: {
    // padding: SIZES.small,
  },
  title: {
    fontFamily: font.semiBold,
    fontSize: SIZES.medium,
    textAlign: 'center',
    color: '#000',
    height: 44,
    width: '100%',
  },
  suplier: {
    fontFamily: font.regular,
    fontSize: SIZES.small,
    color: COLORS.gray,
    height: 16,
  },
  price: {
    fontFamily: font.bold,
    fontSize: SIZES.medium + 2,
    color: COLORS.red,
    textAlignVertical: 'center',
    height: SIZES.medium,
    lineHeight: SIZES.medium + 6,
    marginLeft: 10,
  },

  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
  },
  priceBefore: {
    height: '100%',
    color: COLORS.gray,

    // textAlignVertical: 'center',
    // height: SIZES.medium,
    // lineHeight: SIZES.medium + 4,
    textDecorationLine: 'line-through',
  },
  priceAfter: {
    fontFamily: font.bold,
    fontSize: SIZES.medium + 2,
    color: COLORS.red,
    textAlignVertical: 'center',
    height: SIZES.medium,
    lineHeight: SIZES.medium + 6,
    marginLeft: 10,
  },
  tagContainer: {
    width: '100%',
    marginTop: 6,
  },
  tag: {
    width: 60,
    backgroundColor: '#96ffc0',
    borderRadius: 20,
    // borderWidth: 0.2,
    // borderBlockColor: '#000',
    overflow: 'hidden',
  },
  tagText: {
    width: '100%',
    color: COLORS.red,
    textAlign: 'center',
  },
  suplierAndRatingContainer: {
    marginTop: 6,
    // flexDirection: 'row',
    justifyContent: 'center',
  },
  suplierContainer: {},
  suplierText: {
    color: '#000',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingNumber: {
    // fontFamily: font.regular,
    color: COLORS.gray,
    marginRight: 6,
    // fontSize: SIZES.small,
    // height: SIZES.small + 4,
    // padding: 0,
  },
  addBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    elevation: 2,
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default styles;

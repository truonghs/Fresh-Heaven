import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../../constants';
import font from '../../assets/fonts/font';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.offwhite,
    paddingTop: 10,
  },

  orderItemContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 10,

    elevation: 4,
    marginHorizontal: 16,
    marginVertical: 10,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  imageContainer: {
    backgroundColor: '#fff',
    marginRight: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: '#ccc',
  },
  productImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },

  titleContainer: {},
  titleRow: {},
  title: {
    fontFamily: font.semiBold,
    color: '#000',
    fontSize: 16,
    lineHeight: 18,
    maxWidth: SIZES.width * 0.4,
  },
  packing: {
    color: '#000',
  },
  quantity: {
    fontFamily: font.regular,
    color: '#000',
  },
  middleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 20,
  },
  priceRow: {
    flexDirection: 'row',
    height: 20,
  },
  totalProduct: {
    fontFamily: font.regular,
    color: '#000',
    height: 20,
  },
  priceTitle: {
    color: '#000',
    fontFamily: font.regular,
    height: 20,
    textAlign: 'center',
  },
  priceValue: {
    fontSize: 16,
    color: COLORS.red,
    height: 20,
    lineHeight: 22,
    fontFamily: font.bold,
    textAlign: 'center',
  },
  statusRow: {
    borderTopWidth: 0.6,
    borderBottomWidth: 0.6,
    borderColor: COLORS.secondary,
    alignItems: 'center',
    marginTop: 4,
  },
  status: {
    color: COLORS.secondary,
    fontFamily: font.regular,
  },
  feedbackRow: {
    marginTop: 10,
    alignItems: 'center',
  },
  moreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: SIZES.width * 0.65,
    alignItems: 'center',
  },
  viewmoreContainer: {
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#ccc',
    alignItems: 'center',
    width: 70,
    flexDirection: 'row',
    padding: 4,
    justifyContent: 'center',
  },
  viewmore: {
    fontFamily: font.regular,
  },
});
export default styles;

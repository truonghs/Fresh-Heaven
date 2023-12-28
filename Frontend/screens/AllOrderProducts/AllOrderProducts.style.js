import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../../constants';
import font from '../../assets/fonts/font';
const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.offwhite,
  },
  main: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  heading: {
    borderTopWidth: 0.8,
    borderBottomWidth: 0.8,
    width: SIZES.width,
    alignItems: 'center',
    borderColor: COLORS.secondary,
    justifyContent: 'center',
    marginVertical: 10,
    backgroundColor: '#fff',
  },
  headingTitle: {
    fontFamily: font.semiBold,
    fontSize: 16,
    color: COLORS.secondary,
    textAlign: 'center',
  },
  deliveryRow: {
    backgroundColor: COLORS.secondary,
    width: '100%',
    padding: 16,
  },
  deliveryHeading: {
    flexDirection: 'row',
  },
  deliveryTitle: {
    fontFamily: font.semiBold,
    fontSize: 16,
    color: COLORS.white,
    marginLeft: 16,
  },
  deliveryDetails: {},
  deliveryDetailItemRow: {
    flexDirection: 'row',
  },
  deliveryDetailsTitle: {
    fontFamily: font.regular,
    color: COLORS.offwhite,
  },
  deliveryDetailsText: {
    fontFamily: font.regular,
    color: COLORS.offwhite,
  },
  deliveryType: {
    fontFamily: font.semiBold,
    fontSize: 16,
    color: COLORS.red,
    marginLeft: SIZES.width * 0.07,
  },
  orderIdContainer: {
    padding: 16,
    backgroundColor: '#fff',
    marginTop: 10,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: COLORS.primary,
  },
  orderIdRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  copyRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  copy: {
    fontFamily: font.bold,
    lineHeight: 30,
  },
  orderIdTitle: {
    fontFamily: font.bold,
    color: COLORS.red,
    fontSize: 15,
  },
  orderIdValue: {
    fontFamily: font.bold,
    color: '#000',
    fontSize: 15,
  },
  orderDateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderDateTitle: {
    fontFamily: font.regular,
    color: '#000',
    fontSize: 15,
  },
  orderDateValue: {
    fontFamily: font.regular,
    color: '#000',
    fontSize: 15,
    marginRight: 20,
  },
  productsContainer: {
    marginTop: 10,
    backgroundColor: '#fff',
    paddingVertical: 10,
  },
  productsTitleRow: {},
  productsTitle: {
    fontFamily: font.bold,
    fontSize: 18,
    color: COLORS.secondary,
    marginLeft: 16,
  },
  productItem: {
    backgroundColor: '#fff',
    marginBottom: 16,
    borderTopWidth: 0.6,
    borderBottomWidth: 0.6,
    borderColor: '#000',
    // width: SIZES.width - 32,
    // marginHorizontal: 16,
    // elevation: 4,
  },
  productTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productImageContainer: {
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  productImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  productTitleContainer: {},
  productTitle: {
    fontFamily: font.semiBold,
    color: '#000',
    fontSize: 16,
    maxWidth: SIZES.width * 0.7,
  },
  descRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  descTitle: {
    color: '#000',
    fontFamily: font.regular,
  },
  descValue: {
    color: '#000',
    fontFamily: font.regular,
  },
  priceTitle: {
    color: '#000',
    fontFamily: font.semiBold,
  },
  priceValue: {
    color: COLORS.red,
    fontFamily: font.semiBold,
  },
  productsTotalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  productsTotalTitle: {
    color: '#000',
    fontFamily: font.semiBold,
    fontSize: 14,
  },
  productsTotal: {
    color: COLORS.red,
    fontFamily: font.semiBold,
    fontSize: 14,
  },
  productsFinalTitle: {
    color: '#000',
    fontFamily: font.bold,
    fontSize: 18,
  },
  productsFinal: {
    color: COLORS.red,
    fontFamily: font.bold,
    fontSize: 18,
  },
  feedbackContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 60,
  },
});
export default styles;

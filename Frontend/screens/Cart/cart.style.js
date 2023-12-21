import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../../constants';
import font from '../../assets/fonts/font';
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.offwhite,
  },
  scroll: {
    flex: 1,
  },
  empty: {
    fontFamily: font.bold,
    fontSize: SIZES.large,
    color: '#000',
    paddingHorizontal: 20,
    textAlign: 'center',
    marginTop: 20,
  },
  main: {
    backgroundColor: 'white',
    marginVertical: 4,
    borderBottomColor: '#F0F0F0',
    borderRadius: 20,
    paddingHorizontal: 10,
    height: 160,
  },
  checkArea: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
  },
  checkBox: {
    height: '100%',
  },
  productInfo: {
    marginVertical: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImg: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  productName: {
    fontSize: 16,
    width: 160,
    marginTop: 10,
    color: '#000',
    fontFamily: font.semiBold,
  },
  priceRow: {
    flexDirection: 'row',
    paddingVertical: 6,
  },
  productPrice: {
    marginRight: 10,
    textDecorationLine: 'line-through',
  },
  productPriceFinal: {
    fontSize: 20,
    fontFamily: font.bold,
    color: COLORS.red,
    lineHeight: 24,
  },
  classifyRow: {
    flexDirection: 'row',
  },
  unitTitle: {
    color: '#000',
  },
  unitText: {
    color: '#000',
  },
  quantity: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  quantityLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    // paddingHorizontal: 10,
    // paddingVertical: 5,
    borderRadius: 7,

    marginTop: 4,
  },
  decreaseBtn: {
    backgroundColor: '#e8faee',
    padding: 2,
    borderRadius: 7,
  },
  increaseBtn: {
    padding: 2,
    borderRadius: 7,
  },
  quantityTxt: {
    backgroundColor: 'white',
    paddingHorizontal: 8,
    color: '#000',
  },
  deleteItem: {
    backgroundColor: 'white',
    width: 40,
    height: 40,
    borderRadius: 5,
    borderColor: '#C0C0C0',
    borderWidth: 0.6,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 20,
  },
  totalContainer: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  totalTitle: {
    fontSize: 18,
    fontFamily: font.regular,
    color: '#000',
  },
  totalValue: {
    fontSize: 20,
    fontFamily: font.bold,
    color: '#000',
  },
  buyBtn: {
    backgroundColor: COLORS.secondary,
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 50,
  },
  buyBtnInActive: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 50,
    opacity: 0.5,
  },
  btnTxt: {
    color: '#fff',
    fontFamily: font.bold,
  },

  txt: {
    color: '#000',
  },
  checkOutContainer: {
    backgroundColor: '#fff',
    elevation: 6,
  },
});
export default styles;

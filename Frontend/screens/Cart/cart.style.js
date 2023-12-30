import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../../constants';
import font from '../../assets/fonts/font';
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },

  scrollContainer: {
    height: SIZES.height - 200,
    width: SIZES.width,
    paddingTop: 10,
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
    marginVertical: 8,
    borderRadius: 20,
    paddingHorizontal: 10,
    height: 90,
    elevation: 2,
    marginHorizontal: 10,
  },
  productInfo: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 90,
  },
  checkArea: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
  },
  checkBox: {
    paddingHorizontal: 10,
    paddingVertical: 30,
  },

  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 2,
    marginLeft: 6,
  },
  productImg: {
    width: SIZES.width * 0.14,
    height: SIZES.width * 0.14,
    resizeMode: 'center',
    borderRadius: 10,
  },
  detailArea: {
    marginLeft: 10,
    width: 100,
  },
  nameRow: {
    flexDirection: 'row',
    width: SIZES.width * 0.6,
    justifyContent: 'space-between',
  },
  productName: {
    fontSize: 16,
    width: 150,
    color: '#000',
    fontFamily: font.semiBold,
    paddingBottom: 4,
  },
  deleteItem: {
    backgroundColor: 'white',
    width: 30,
    height: 30,
    borderRadius: 5,
    borderColor: '#C0C0C0',
  },
  detailFlex: {
    width: SIZES.width * 0.57,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priceRow: {
    flexDirection: 'row',
  },
  productPrice: {
    marginRight: 10,
    fontSize: 14,
    textDecorationLine: 'line-through',
    textAlignVertical: 'center',
    color: '#ccc',
  },
  productPriceFinal: {
    fontSize: 16,
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
    marginLeft: 40,
    // backgroundColor:'red',
    minWidth: 100,
  },
  quantityLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 7,
    marginTop: 4,
  },
  decreaseBtn: {
    backgroundColor: COLORS.greenBtn,
    padding: 3,
    borderRadius: 7,
  },
  increaseBtn: {
    padding: 3,
    borderRadius: 7,
  },
  quantityTxt: {
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    color: '#000',
    minWidth: 35,
  },
  txt: {
    color: '#000',
    fontSize: 16,
    textAlign: 'center',
  },
  totalContainer: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  totalTitle: {
    fontSize: 16,
    fontFamily: font.regular,
    color: '#fff',
  },
  totalValue: {
    fontSize: 18,
    fontFamily: font.bold,
    color: '#fff',
  },
  buyBtn: {
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 50,
    width: 240,
    height: 46,
    alignSelf: 'center',
    elevation: 4,
  },
  buyBtnInActive: {
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 50,
    width: 240,
    height: 46,
    alignSelf: 'center',
  },
  btnTxt: {
    color: '#fff',
    color: '#000',
    fontFamily: font.bold,
    fontSize: 14,
  },

  checkOutBase: {
    backgroundColor: '#fff',
    borderRadius: 20,
    borderColor: '#ccc',
    borderWidth: 0.5,
    borderStyle: 'solid',
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    width: SIZES.width,
  },
  checkOutContainer: {
    backgroundColor: 'transparent',
    elevation: 4,
    width: SIZES.width - 32,
    // marginLeft: 16,
    marginBottom: 70,
    height: 150,
    borderRadius: 20,
    padding: 10,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
  },
});
export default styles;

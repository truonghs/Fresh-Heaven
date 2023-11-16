import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../../constants';
import font from '../../assets/fonts/font';
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  scroll: {
    flex: 1,
    backgroundColor: 'white',
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
    marginVertical: 10,
    borderBottomColor: '#F0F0F0',
    borderWidth: 2,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderRightWidth: 0,
  },
  productInfo: {
    marginVertical: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productImg: {
    width: 140,
    height: 140,
    resizeMode: 'contain',
  },
  productName: {
    fontSize: 16,
    width: 150,
    marginTop: 10,
    color: '#000',
    fontFamily: font.regular,
  },
  productPrice: {
    fontSize: 20,
    fontFamily: font.bold,
    color: '#000',
    marginTop: 6,
  },
  logo: {
    top: -10,
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  quantity: {
    marginTop: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  quantityLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 7,
  },
  decreaseBtn: {
    backgroundColor: '#D8D8D8',
    padding: 7,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
  },
  increaseBtn: {
    backgroundColor: '#D8D8D8',
    padding: 7,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
  },
  quantityTxt: {
    backgroundColor: 'white',
    paddingHorizontal: 18,
    paddingVertical: 6,
  },
  deleteItem: {
    backgroundColor: 'white',
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderRadius: 5,
    borderColor: '#C0C0C0',
    borderWidth: 0.6,
  },
  totalContainer: {
    padding: 10,
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
    backgroundColor: COLORS.thirth,
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 50,
  },
  buyBtnInActive: {
    backgroundColor: COLORS.thirth,
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
  line: {
    height: 1,
    borderColor: '#D0D0D0',
    borderWidth: 1,
    marginBottom: 16,
  },
  txt: {
    color: '#000',
  },
});
export default styles;

import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../../constants';
import font from '../../assets/fonts/font';
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  step: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepTxt: {
    fontSize: 16,
    color: COLORS.gray,
    fontFamily: font.bold,

    color: 'white',
  },
  stepTitle: {
    color: '#000',
    textAlign: 'center',
    marginTop: 8,
  },
  title: {
    fontSize: SIZES.xLarge,
    color: COLORS.primary,
    fontFamily: font.bold,
  },
  address: {
    borderWidth: 1,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingBottom: 17,
    marginVertical: 7,
    borderRadius: 6,
  },
  addressTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  addressTitleTxt: {
    color: '#000',
    fontSize: SIZES.medium,
    fontFamily: font.bold,
  },
  addressTxt: {
    fontSize: SIZES.medium,
    color: '#000',
  },
  addressBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 7,
  },
  addressBtn: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 5,
    borderWidth: 0.9,
    borderColor: '#D0D0D0',
  },
  addressBtnTxt: {
    color: '#000',
    fontFamily: font.regular,
  },
  addressSubmitContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitActive: {
    backgroundColor: COLORS.thirth,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  submitInActive: {
    backgroundColor: COLORS.secondary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  submitTxt: {
    textAlign: 'center',
    color: 'white',
    fontFamily: font.regular,
  },
  delivery: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 8,
    gap: 7,
    borderWidth: 1,
    marginTop: 10,
  },
  deliveryTitle: {
    color: 'green',
    fontSize: SIZES.medium,
    fontFamily: font.bold,
  },
  deliveryTxt: {
    color: '#000',
    fontFamily: font.regular,
  },
  deliveryPrice: {
    color: 'red',
    fontFamily: font.semiBold,
    fontSize: SIZES.medium,
  },

  payment: {
    padding: 8,
    backgroundColor: 'white',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginTop: 12,
  },
  orderDetail: {
    backgroundColor: 'white',
    padding: 8,
    borderColor: '#D0D0D0',
    borderWidth: 1,
    marginTop: 10,
  },
  orderAddress: {
    color: COLORS.primary,
    fontFamily: font.bold,
  },
  orderFee: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  orderFeeTitle: {
    fontSize: 16,
    color: COLORS.thirth,

    fontFamily: font.bold,
  },
  orderFeePrice: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
    fontFamily: font.regular,
    color: '#000',
  },
  orderTotalFee: {
    fontSize: 20,
    fontFamily: font.bold,
    color: '#000',
  },
  orderFeeFinal: {
    color: '#C60C30',
    fontSize: 17,
    fontFamily: font.bold,
  },
  orderPayment: {
    backgroundColor: 'white',
    padding: 8,
    borderColor: '#D0D0D0',
    borderWidth: 1,
    marginTop: 10,
  },
  orderPaymentTitle: {
    fontSize: 16,
    color: '#000',
    fontFamily: font.bold,
  },
  orderPaymentTxt: {
    fontSize: 16,
    fontFamily: font.semiBold,
    color: COLORS.primary,
    marginTop: 7,
  },
  orderFeeTxt: {
    color: COLORS.thirth,
    fontSize: 16,
    fontFamily: font.regular,
  },
});
export default styles;

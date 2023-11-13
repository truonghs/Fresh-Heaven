import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../../constants';
import font from '../../assets/fonts/font';
const styles = StyleSheet.create({
  textStyle: {
    fontFamily: font.bold,
    fontSize: 40,
    color: '#000',
  },
  appBarWrapper: {
    marginHorizontal: 16,
    marginTop: SIZES.xLarge,
  },
  appBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  location: {
    fontFamily: font.semiBold,
    fontSize: SIZES.medium,
    color: COLORS.gray,
  },
  modal: {
    width: '100%',
    height: 450,
  },
  addressTitle: {
    color: COLORS.primary,
    fontSize: SIZES.large,
    fontFamily: font.bold,
  },
  addressDesc: {
    marginTop: 5,
    fontSize: SIZES.medium,
    color: COLORS.gray,
    fontFamily: font.regular,
  },
  addressLect: color => ({
    width: 140,
    height: 140,
    borderColor: '#D0D0D0',
    borderWidth: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 3,
    marginLeft: 15,
    marginTop: 10,
    backgroundColor: color,
  }),
  addressName: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  addressTxt: {
    color: COLORS.blue,
    fontSize: 14,
    fontFamily: font.bold,
  },
  addressDetail: {
    color: COLORS.gray,

    fontFamily: font.regular,
    width: 130,
    fontSize: 14,
    textAlign: 'center',
  },
  addressScroll: {
    minHeight: 150,
    marginBottom: 20,
  },
  addressAddBox: {
    width: 140,
    height: 140,
    borderColor: '#D0D0D0',
    marginTop: 10,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  addressAddTxt: {
    textAlign: 'center',
    color: COLORS.blue,
    fontFamily: font.bold,
    paddingHorizontal: 10,
  },
  addressOptContainer: {
    flexDirection: 'column',
    gap: 7,
    marginBottom: 100,
  },
  addressOpt: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  addressOptTxt: {
    color: COLORS.blue,
    fontFamily: font.bold,
  },
  cartCount: {
    position: 'absolute',
    bottom: SIZES.medium,
    width: SIZES.medium,
    height: SIZES.medium,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
    backgroundColor: 'green',
  },
  cartNumber: {
    fontFamily: font.regular,
    fontSize: 10,
    color: COLORS.lightWhite,
  },
});
export default styles;

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
    fontFamily: font.regular,
    fontSize: SIZES.small + 2,
    color: '#000',
    maxWidth: 160,
  },
  // modalContainer: {
  //   backgroundColor: 'blue',
  //   alignItems: 'flex-end',
  // },
  modal: {
    width: '100%',
    height: 450,
    marginBottom: 180,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 200,
  },
  addressTitle: {
    color: COLORS.secondary,
    fontSize: SIZES.large,
    fontFamily: font.bold,
  },
  addressDesc: {
    marginTop: 5,
    fontSize: SIZES.medium,
    color: COLORS.gray,
    fontFamily: font.regular,
  },
  addressLect: (color) => ({
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
  addressTxt: (param) => ({
    color: param,
    fontSize: 14,
    fontFamily: font.bold,
  }),
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
  dot: {
    position: 'absolute',
    right: 10,
    top: 6,
    bottom: SIZES.medium,
    width: 6,
    height: 6,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
    backgroundColor: 'red',
  },
  cartNumber: {
    fontFamily: font.regular,
    fontSize: 10,
    color: COLORS.lightWhite,
  },
  scrollView: {
    width: '100%',
    height: '100%',
    paddingBottom: 200,
    marginBottom: 200,
  },
  headingIcon: {
    // width: 8,
    // height: 8,
    padding: 6,
    backgroundColor: '#fff',
    borderRadius: 14,
  },
  addProduct: {
    alignSelf: 'center',
    backgroundColor: 'green',
    color: '#fff',
    padding: 10,
  },
});
export default styles;

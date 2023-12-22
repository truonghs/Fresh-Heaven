import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../../constants';
import font from '../../assets/fonts/font';
const styles = StyleSheet.create({
  title: {
    fontSize: SIZES.xLarge,
    fontFamily: font.bold,
    color: '#000',
    marginHorizontal: 10,
  },
  link: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    borderColor: COLORS.blue,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    paddingVertical: 7,
    paddingHorizontal: 5,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  linkTxt: {
    fontFamily: font.regular,
    color: COLORS.blue,
    fontSize: SIZES.medium,
  },
  itemContainer: {
    borderWidth: 1,
    borderColor: '#D0D0D0',
    padding: 10,
    flexDirection: 'column',
    gap: 5,
    marginHorizontal: 10,
    borderRadius: 20,
    elevation: 4,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  itemTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  itemName: {
    fontSize: SIZES.large,
    fontFamily: font.bold,
    color: COLORS.secondary,
  },
  itemTxt: {
    fontSize: SIZES.medium - 3,
    fontFamily: font.regular,
    color: '#181818',
    lineHeight: SIZES.medium,
  },
  btn: {
    color: COLORS.thirth,
  },
  btnContainer: {
    backgroundColor: COLORS.greenBtn,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 0.4,
    borderColor: COLORS.gray,
    elevation: 2,
  },
  scroll: {
    paddingBottom: 180,
  },
});
export default styles;

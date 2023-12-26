import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../../constants';
import font from '../../assets/fonts/font';
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    minHeight: 160,
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 30,
    paddingVertical: 20,
    alignItems: 'center',

    elevation: 5,
    justifyContent: 'space-between',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  title: {
    textAlign: 'center',
    color: '#000',
    fontFamily: font.semiBold,
    fontSize: 18,
  },
  flexBtn: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    width: 240,
  },
  leftBtn: {
    backgroundColor: '#ccc',
    padding: 6,
    borderRadius: 4,
    minWidth: 70,
    left: 0,
    bottom: 0,
    position: 'absolute',
  },
  rightBtn: {
    backgroundColor: COLORS.red,
    padding: 6,
    borderRadius: 4,
    minWidth: 70,
    right: 0,
    bottom: 0,
    position: 'absolute',
  },
  textStyle: {
    textAlign: 'center',
    width: '100%',
    fontFamily: font.regular,
    textAlignVertical: 'center',
    color: '#fff',
  },
});
export default styles;

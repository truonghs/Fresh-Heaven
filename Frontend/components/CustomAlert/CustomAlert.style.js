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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
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
    justifyContent: 'space-between',
    width: 240,
  },
  leftBtn: {
    backgroundColor: '#ccc',
    padding: 6,
    borderRadius: 4,
    minWidth: 70,
  },
  rightBtn: {
    backgroundColor: COLORS.red,
    padding: 6,
    borderRadius: 4,
    minWidth: 70,
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

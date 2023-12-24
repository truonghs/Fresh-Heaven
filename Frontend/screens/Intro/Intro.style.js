import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../../constants';
import font from '../../assets/fonts/font';
import {colors} from 'react-native-swiper-flatlist/src/themes';
const styles = StyleSheet.create({
  imageBackground: {
    position: 'absolute',
    width: SIZES.width,
    height: SIZES.height,
    zIndex: -1,
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    // paddingTop: 50,
    // paddingHorzontal: 20,
  },
  btn: color => ({
    backgroundColor: 'blue',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: color,
    position: 'absolute',
    bottom: 140,
    right: 40,
    paddingHorizontal: 10,
    borderRadius: 6,
    elevation: 4,
  }),
  btnText: color => ({
    color: color,
    fontFamily: font.bold,
    fontSize: 18,
  }),
});
export default styles;

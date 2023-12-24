import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'red',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    marginTop: 110,
  },
  search: {
    flex: 0.35,
    zIndex: 1,
  },
  btnBack: {
    width: 50,
    height: 50,
    backgroundColor: COLORS.brownlight,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    padding: 10,
  },
  title: {
    flex: 0.9,
    color: '#000',
    fontWeight: 'bold',
    fontSize: 24,

    textAlign: 'center',
  },
});
export default styles;

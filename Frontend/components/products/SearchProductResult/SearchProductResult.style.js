import {StyleSheet} from 'react-native';

import {COLORS, SIZES, SHADOWS} from '../../../constants';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: SIZES.small,
    padding: SIZES.medium,
    borderRadius: SIZES.small,
    ...SHADOWS.medium,
    shadowColor: '#9fadf4',
    elevation: 10,
  },
  image: {
    width: 70,
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.medium,
    justifyContent: 'center',
    alignContent: 'center',
  },
  productImg: {
    width: '100%',
    height: 65,
    borderRadius: SIZES.small,
    resizeMode: 'cover',
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    marginHorizontal: SIZES.medium,
  },
  productTitle: {
    width: 190,
    fontSize: SIZES.medium + 2,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  origin: {
    fontSize: SIZES.small + 5,
    fontWeight: '300',
    color: COLORS.gray,
    marginTop: 3,
  },
  price: {
    fontSize: 20,
    color: '#fdad1c',
    fontWeight: '900',
  },
});

export default styles;

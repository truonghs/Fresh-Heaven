import {StyleSheet} from 'react-native';

import {COLORS, SIZES, SHADOWS} from '../../constants';
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
    shadowColor: COLORS.lightWhite,
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
    flex: 1,
    marginHorizontal: SIZES.medium,
  },
  productTitle: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  supplier: {
    fontSize: SIZES.small + 2,
    fontWeight:'500',
    color: COLORS.gray,
    marginTop: 3
  },
});

export default styles;

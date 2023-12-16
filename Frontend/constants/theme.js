import {Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');

const COLORS = {
  primary: '#76eba4',
  // secondary: '#19c178',
  secondary: '#17ad6c',
  thirth: '#0f7046',
  tertiary: '#fff8e8',
  brown: '#dd6e27',
  gray: '#83829A',
  gray2: '#C1C0C8',
  orange: '#fead1d',
  offwhite: '#F3F4F8',
  white: '#FFFFFF',
  black: '#000000',
  red: '#ff4445',
  green: '#23c77d',
  lightWhite: '#FAFAFC',
};

const SIZES = {
  xSmall: 10,
  small: 12,
  medium: 16,
  large: 20,
  xLarge: 24,
  xxLarge: 44,
  height,
  width,
};

const SHADOWS = {
  small: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  },
};

export {COLORS, SIZES, SHADOWS};

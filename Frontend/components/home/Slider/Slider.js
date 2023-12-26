import {Image, View, Text} from 'react-native';
import React from 'react';
import Carousel from 'react-native-reanimated-carousel';
import {COLORS, SIZES} from '../../../constants';

import styles from './Slider.style';
import Banner from '../../Banner/Banner';
const Slider = ({setIsScrollEnable}) => {
  const sliders = [
    {
      backgroundImage: require('../../../assets/SliderImage/banner-summer.png'),
      title: 'Special Offer for Summer',
      titleColor: COLORS.brown,
      btnText: 'Buy Now',
      btnTextFirstColor: COLORS.brown,
      btnTextSecondColor: 'brown',
    },
    {
      backgroundImage: require('../../../assets/SliderImage/banner-organic.png'),
      title: 'Organic Fruits for Your Life',
      titleColor: COLORS.primary,
      btnText: 'Buy Now',
      btnTextFirstColor: COLORS.primary,
      btnTextSecondColor: COLORS.secondary,
    },
    {
      backgroundImage: require('../../../assets/SliderImage/banner-yearend.png'),
      title: 'Year End discount 10%',
      titleColor: 'brown',
      btnText: 'Buy Now',
      btnTextFirstColor: COLORS.brown,
      btnTextSecondColor: 'brown',
    },
  ];

  return (
    <View style={styles.container}>
      <Carousel
        // onScrollBegin={() => setIsScrollEnable(false)}
        // onScrollEnd={() => setIsScrollEnable(true)}
        loop
        width={SIZES.width}
        height={SIZES.width / 2}
        autoPlay={true}
        data={sliders}
        scrollAnimationDuration={1500}
        autoPlayInterval={5000}
        onConfigurePanGesture={(gestureChain) => gestureChain.activeOffsetY([-1, 1])}
        renderItem={({item}) => (
          <View style={styles.bannerContainer}>
            <Banner
              backgroundImage={item.backgroundImage}
              title={item.title}
              btnText={item.btnText}
              btnTextFirstColor={item.btnTextFirstColor}
              btnTextSecondColor={item.btnTextSecondColor}
              titleColor={item.titleColor}
            />
          </View>
        )}
      />
    </View>
  );
};

export default React.memo(Slider);

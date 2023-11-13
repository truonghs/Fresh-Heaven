import {Image, View} from 'react-native';
import React from 'react';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import {COLORS, SIZES} from '../../../constants';

import styles from './carousel.style';
const Carousel = () => {
  const sliders = [
    require('../../../assets/SliderImage/slider1.jpg'),
    require('../../../assets/SliderImage/slider2.jpg'),
    require('../../../assets/SliderImage/slider3.jpg'),
    require('../../../assets/SliderImage/slider4.jpg'),
    require('../../../assets/SliderImage/slider5.jpg'),
  ];

  return (
    <View style={styles.container}>
      <SwiperFlatList
        style={{flex: 1}}
        autoplayDelay={3}
        autoplayLoopKeepAnimation={true}
        paginationStyleItem={styles.dot}
        paginationStyleItemActive={styles.dotActive}
        paginationStyleItemInActive={styles.dotInActive}
        renderAll={true}
        autoplay
        autoplayLoop
        index={0}
        showPagination
        data={sliders}
        renderItem={({item}) => <Image source={item} style={styles.child} />}
      />
    </View>
  );
};

export default Carousel;

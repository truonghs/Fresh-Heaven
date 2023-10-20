import {Image, View} from 'react-native';
import React from 'react';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import styles from './carousel.style';
const Carousel = () => {
  const sliders = [
    require('../../../assets/SliderImage/slider1.jpg'),
    require('../../../assets/SliderImage/slider2.jpg'),
    require('../../../assets/SliderImage/slider3.jpg'),
  ];

  return (
    <View style={styles.container}>
      <SwiperFlatList
        style={styles.swiper}
        autoplayDelay={3}
        autoplayLoopKeepAnimation={true}
        paginationStyleItem={styles.dot}
        paginationStyleItemActive={styles.dotActive}
        paginationStyleItemInActive={styles.dotInActive}
        renderAll={true}
        autoplay
        autoplayLoop
        index={2}
        showPagination
        data={sliders}
        renderItem={({item}) => (
          <View style={styles.imgContainer}>
            <Image source={item} style={styles.child} />
          </View>
        )}
      />
    </View>
  );
};

export default Carousel;

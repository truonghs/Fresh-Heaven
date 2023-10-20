import {StyleSheet, Text, Image, View, Dimensions} from 'react-native';
import React from 'react';
// import Swiper from 'react-native-swiper';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import {COLORS} from '../../constants';
const Carousel = () => {
  const sliders = [
    require('../../assets/SliderImage/slider1.jpg'),
    require('../../assets/SliderImage/slider2.jpg'),
    require('../../assets/SliderImage/slider3.jpg'),
  ];

  return (
    <View style={styles.container}>
      <SwiperFlatList
        autoplayDelay={3}
        autoplayLoopKeepAnimation={true}
        paginationStyleItem={styles.dot}
        paginationStyleItemActive={styles.dotActive}
        renderAll={true}
        autoplay
        autoplayLoop
        index={2}
        showPagination
        data={sliders}
        renderItem={({item}) => <Image style={styles.child} source={item} />}
      />
    </View>
  );
};
const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  child: {
    width,
    justifyContent: 'center',
    height: 200,
  },
  dot: {
    width: 8,
    height: 8,
  },
  dotActive: {
    backgroundColor: COLORS.primary,
  },
});
export default Carousel;

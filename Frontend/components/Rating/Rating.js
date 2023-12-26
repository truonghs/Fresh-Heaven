import {View, Text, Image} from 'react-native';
import React from 'react';
import styles from './Rating.style';
const Rating = ({rating}) => {
  var arr = [1, 2, 3, 4, 5];
  return (
    <View style={styles.container}>
      {arr.map((item) =>
        rating >= item ? (
          <Image key={item} style={styles.ratingIcon} source={require('../../assets/icons/star.png')} />
        ) : rating >= item - 1 && rating < item ? (
          <Image key={item} style={styles.ratingIcon} source={require('../../assets/icons/rating.png')} />
        ) : (
          <Image key={item} style={styles.ratingIcon} source={require('../../assets/icons/star-gray.png')} />
        ),
      )}
    </View>
  );
};

export default React.memo(Rating);

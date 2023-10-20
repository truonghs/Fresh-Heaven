import {View, TouchableOpacity, Image, Text} from 'react-native';
import React, {useState} from 'react';
import styles from './productDetail.style';
import Ionicon from 'react-native-vector-icons/Ionicons';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {COLORS} from '../../constants';

const ProducDetail = ({navigation}) => {
  const [rating, setRating] = useState(1);
  const increase = () => {
    rating < 5 ? setRating(rating + 1) : null;
  };
  const decrease = () => {
    rating > 0 ? setRating(rating - 1) : null;
  };
  return (
    <View style={styles.container}>
      <View style={styles.upperRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicon name="chevron-back-circle" size={30} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <Ionicon name="heart" size={30} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
      <Image
        style={styles.img}
        source={require('../../assets/images/fn1.jpg')}
      />
      <View style={styles.detail}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>Product</Text>
          <View style={styles.priceWrapper}>
            <Text style={styles.price}>$1234.00</Text>
          </View>
        </View>
        <View style={styles.ratingRow}>
          <View style={styles.rating}>
            {[1, 2, 3, 4, 5].map(index => (
              <Ionicon key={index} name="star" size={24} color="gold" />
            ))}
            <Text style={styles.ratingText}>(4.9)</Text>
          </View>
          <View style={styles.rating}>
            <TouchableOpacity onPress={() => decrease()}>
              <SimpleLineIcon name="minus" size={20} color="#000" />
            </TouchableOpacity>
            <Text style={styles.ratingText}>{rating}</Text>
            <TouchableOpacity onPress={() => increase()}>
              <SimpleLineIcon name="plus" size={20} color="#000" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.descWraper}>
          <Text style={styles.desc}>Description</Text>
          <Text style={styles.descText}>
            Bàn là một món đồ nội thất quan trọng và không thể thiếu trong mọi
            không gian sống và làm việc. Nó không chỉ là nơi để đặt những vật
            dụng cần thiết mà còn thể hiện phong cách và sở thích cá nhân của
            chủ nhân. Bàn có nhiều kiểu dáng và chất liệu khác nhau, từ bàn gỗ
            truyền thống đến bàn hiện đại bằng kính, kim loại hoặc acrylic. Một
            chiếc bàn tạo điểm nhấn trong phòng khách, nơi bạn có thể sắp xếp
            sách, hoa và các vật trang trí. Trên bàn là nơi chúng ta làm việc,
            viết, hoặc thậm chí là thưởng thức bữa ăn nhanh vào buổi sáng. Chọn
            bàn phù hợp là việc làm quan trọng để tạo nên không gian ấm cúng và
            thú vị.
          </Text>
        </View>
        <View style={styles.locationWrapper}>
          <View style={styles.location}>
            <View style={styles.locationRow}>
              <Ionicon name="location-outline" size={20} color="#000" />
              <View style={styles.locationTxt}>
                <Text style={styles.locationTxt}>VungTau</Text>
              </View>
            </View>
            <View style={styles.locationRow}>
              <MaterialCommunityIcon
                name="truck-delivery-outline"
                size={20}
                color="#000"
              />
              <View style={styles.deliveryTxt}>
                <Text style={styles.locationTxt}>Free Delivery</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.cartRow}>
          <TouchableOpacity style={styles.cartBtn} onPress={() => {}}>
            <Text style={styles.cartTitle}>BUY NOW</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addCart} onPress={() => {}}>
            <Fontisto name="shopping-bag" size={20} color={COLORS.lightWhite} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProducDetail;

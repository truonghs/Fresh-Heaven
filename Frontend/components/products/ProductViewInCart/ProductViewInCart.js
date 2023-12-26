import {Text, View, ScrollView, Image, TouchableOpacity, Button} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import React, {useEffect} from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

import styles from '../ProductViewInCart/ProductViewInCart.style';
import {COLORS, SIZES} from '../../../constants';
import font from '../../../assets/fonts/font';
const ProductViewInCart = ({item, index, increaseQuantity, decreaseQuantity, setAddToOrder, handleDelete}) => {
  const navigation = useNavigation();
  console.log(1);
  useEffect(() => {
    console.log('item');
  }, [item]);
  return (
    <View style={styles.main} key={index}>
      <View style={styles.productInfo}>
        <View style={styles.checkArea}>
          <BouncyCheckbox
            style={styles.checkBox}
            isChecked={item.inOrderIndex != null && item.inOrderIndex != undefined ? true : false}
            size={20}
            fillColor={COLORS.primary}
            unfillColor="#FFFFFF"
            disableText={true}
            iconStyle={{borderColor: COLORS.primary}}
            innerIconStyle={{borderWidth: 2}}
            textStyle={{fontFamily: font.regular}}
            onPress={() => setAddToOrder(item, index)}
          />
        </View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('ProductDetail', {
              product: item.product,
            })
          }
          style={styles.imageContainer}
        >
          <Image style={styles.productImg} source={{uri: item.product?.imageUrl[0]}} />
        </TouchableOpacity>

        <View style={styles.detailArea}>
          <View style={styles.nameRow}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ProductDetail', {
                  product: item.product,
                })
              }
            >
              <Text numberOfLines={1} style={styles.productName}>
                {item.product?.title}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDelete(item, index)} style={styles.deleteItem}>
              <AntDesign name="close" size={16} color={COLORS.red} />
            </TouchableOpacity>
          </View>
          <View style={styles.detailFlex}>
            <View>
              {item.discount == 0 ? (
                <Text style={styles.productPriceFinal}>${item?.price}</Text>
              ) : (
                <View style={styles.priceRow}>
                  <Text style={styles.productPrice}>${item?.price}</Text>
                  <Text style={styles.productPriceFinal}>${item?.finalPrice}</Text>
                </View>
              )}
              <View style={styles.classifyRow}>
                <Text style={styles.unitTitle}>Type: </Text>
                <Text style={styles.unitText}>{item?.packing}</Text>
              </View>
            </View>
            <View style={styles.quantity}>
              <View style={styles.quantityLeft}>
                <TouchableOpacity onPress={() => (item.quantity > 1 ? decreaseQuantity(item, index) : handleDelete(item, index))} style={styles.decreaseBtn}>
                  <AntDesign name="minus" size={18} color={COLORS.secondary} />
                </TouchableOpacity>

                <View style={styles.quantityTxt}>
                  <Text style={styles.txt}>{item?.quantity}</Text>
                </View>

                <TouchableOpacity
                  onPress={() => {
                    increaseQuantity(item, index);
                  }}
                >
                  <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={[COLORS.primary, COLORS.secondary]} style={styles.increaseBtn}>
                    <Feather name="plus" size={18} color={COLORS.white} />
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default React.memo(ProductViewInCart);

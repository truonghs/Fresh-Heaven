import {View, Text, TouchableOpacity, ScrollView, Image} from 'react-native';
import React, {useContext, useState} from 'react';
import styles from './AllOrderProducts.style';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {productsContext} from '../../Context/ProductContext';
import CustomButton from '../../components/CustomButton/CustomButton';
import Clipboard from '@react-native-clipboard/clipboard';
import {COLORS} from '../../constants';
const AllOrderProducts = ({route, navigation}) => {
  const {order} = route.params;
  const {products} = useContext(productsContext);
  const [copied, setCopied] = useState(false);
  const copyToClipboard = () => {
    Clipboard.setString(order._id);
    setCopied(true);
  };
  const dateObject = new Date(order.createdAt);
  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <View style={styles.heading}>
          <Text style={styles.headingTitle}>This order has been created!</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.deliveryRow}>
            <View style={styles.deliveryHeading}>
              <Feather name={'truck'} color={'#fff'} size={20} />
              <Text style={styles.deliveryTitle}>Delivery information:</Text>
              <Text style={styles.deliveryType}>{order.shippingMethod[0].toUpperCase() + order.shippingMethod.substring(1)}</Text>
            </View>
            <View style={styles.deliveryDetails}>
              <View style={styles.deliveryDetailItemRow}>
                <Text style={styles.deliveryDetailsText}>{order.shippingAddress.fullName}</Text>
              </View>
              <View style={styles.deliveryDetailItemRow}>
                <Text style={styles.deliveryDetailsText}>{order.shippingAddress.phoneNumber}</Text>
              </View>
              <View style={styles.deliveryDetailItemRow}>
                <Text style={styles.deliveryDetailsText}>{order.shippingAddress.addressDetail}</Text>
              </View>
            </View>
          </View>
          <View style={styles.orderIdContainer}>
            <View style={styles.orderIdRow}>
              <Text style={styles.orderIdTitle}>Order ID: </Text>
              <View style={styles.copyRow}>
                <Text style={styles.orderIdValue}>{order._id} </Text>
                <TouchableOpacity onPress={() => copyToClipboard()}>
                  <AntDesign name={'copy1'} style={styles.copy} color={copied == true ? '#ccc' : COLORS.blue} size={16} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.orderDateRow}>
              <Text style={styles.orderDateTitle}>Created at: </Text>
              <Text style={styles.orderDateValue}>
                {`${dateObject.getDate()}-${dateObject.getMonth() + 1}-${dateObject.getFullYear()} `} {` ${dateObject.getHours()}:${dateObject.getMinutes()}:${dateObject.getSeconds()}`}
              </Text>
            </View>
            <View style={styles.orderDateRow}>
              <Text style={styles.orderDateTitle}>Payment method: </Text>
              <Text style={styles.orderDateValue}>{order.paymentMethod}</Text>
            </View>
          </View>
          <View style={styles.productsContainer}>
            <View style={styles.productsTitleRow}>
              <Text style={styles.productsTitle}>All products</Text>
            </View>
            <View style={styles.productsScroll}>
              {order.products.map((item, index) => (
                <View key={index} style={styles.productItem}>
                  <View style={styles.productTitleRow}>
                    <View style={styles.productImageContainer}>
                      <Image
                        style={styles.productImage}
                        source={{uri: products.find((product) => product._id == item.productId).imageUrl[0] ? products.find((product) => product._id == item.productId).imageUrl[0] : null}}
                      />
                    </View>
                    <View style={styles.productTitleContainer}>
                      <Text numberOfLines={1} style={styles.productTitle}>
                        {item.title}
                      </Text>
                      <View style={styles.descContainer}>
                        <View style={styles.descRow}>
                          <Text style={styles.descTitle}>Type: </Text>
                          <Text style={styles.descValue}>{item.packing}</Text>
                        </View>
                        <View style={styles.descRow}>
                          <Text style={styles.descTitle}>Quantity: </Text>
                          <Text style={styles.descValue}>{item.quantity}</Text>
                        </View>
                        <View style={styles.descRow}>
                          <Text style={styles.priceTitle}>Price: </Text>
                          <Text style={styles.priceValue}>${item.finalPrice}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              ))}
            </View>
            <View style={styles.totalContainer}>
              <View style={styles.productsTotalRow}>
                <Text style={styles.productsTotalTitle}>Products price: </Text>
                <Text style={styles.productsTotal}>{Math.round((parseFloat(order.totalPrice) - parseInt(order.shippingFee)) * 10) / 10}</Text>
              </View>
              <View style={styles.productsTotalRow}>
                <Text style={styles.productsTotalTitle}>Shipping fee: </Text>
                <Text style={styles.productsTotal}>{parseInt(order.shippingFee)}</Text>
              </View>
              <View style={styles.productsTotalRow}>
                <Text style={styles.productsFinalTitle}>Total price: </Text>
                <Text style={styles.productsFinal}>{parseFloat(order.totalPrice)}</Text>
              </View>
            </View>
            <View style={styles.feedbackContainer}>
              <CustomButton text={'Leave a FeedBack'} />
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default AllOrderProducts;

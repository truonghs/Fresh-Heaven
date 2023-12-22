import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useEffect, useContext, useState, useCallback} from 'react';

import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Ip from '../../constants/ipAddress';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import axios from 'axios';
import styles from './AddressDetail.style';
import {COLORS} from '../../constants';
import {userContext} from '../../Context/UserContext';
const AddressDetail = () => {
  const navigation = useNavigation();
  const [addresses, setAddresses] = useState([]);
  const {userId, setUserId} = useContext(userContext);
  useEffect(() => {
    fetchAddresses();
  }, []);
  const fetchAddresses = async () => {
    try {
      const response = await axios.get(`http://${Ip}:3000/addresses/${userId}`);
      const {addresses} = response.data;

      setAddresses(addresses);
    } catch (error) {
      console.log('error address detail', error);
    }
  };
  //refresh the addresses when the component comes to the focus ie basically when we navigate back
  useFocusEffect(
    useCallback(() => {
      fetchAddresses();
    }, []),
  );
  return (
    <View>
      <View style={{}}>
        {/* <Text style={styles.title}>Your Addresses</Text> */}

        <TouchableOpacity
          onPress={() => navigation.navigate('AddAddress')}
          style={styles.link}>
          <Text style={styles.linkTxt}>Add a new Address</Text>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={24}
            color={COLORS.blue}
          />
        </TouchableOpacity>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* all the added adresses */}
          <View style={styles.scroll}>
            {addresses?.map((item, index) => (
              <View key={index} style={styles.itemContainer}>
                <View style={styles.itemTitle}>
                  <Text style={styles.itemName}>Name: {item?.name}</Text>
                  <Entypo name="location-pin" size={24} color="red" />
                </View>

                <Text style={styles.itemTxt}>
                  House Number: {item?.houseNumber}
                </Text>

                <Text style={styles.itemTxt}>Detail: {item?.detail}</Text>

                <Text style={styles.itemTxt}>Viet Nam</Text>

                <Text style={styles.itemTxt}>
                  phone Number : {item?.phoneNumber}
                </Text>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                    marginTop: 7,
                  }}>
                  <TouchableOpacity style={styles.btnContainer}>
                    <Text style={styles.btn}>Edit</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.btnContainer}>
                    <Text style={styles.btn}>Remove</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.btnContainer}>
                    <Text style={styles.btn}>Set as Default</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default AddressDetail;

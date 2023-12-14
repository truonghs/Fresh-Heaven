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
import {UserType} from '../../Context/UserContext';
import styles from './AddressDetail.style';
import {COLORS} from '../../constants';

const AddressDetail = () => {
  const navigation = useNavigation();
  const [addresses, setAddresses] = useState([]);
  const {userId, setUserId} = useContext(UserType);
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{padding: 10}}>
          <Text style={styles.title}>Your Addresses</Text>

          <TouchableOpacity
            onPress={() => navigation.navigate('AddAddress')}
            style={styles.link}>
            <Text style={styles.linkTxt}>Add a new Address</Text>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color={COLORS.primary}
            />
          </TouchableOpacity>

          <TouchableOpacity>
            {/* all the added adresses */}
            {addresses?.map((item, index) => (
              <TouchableOpacity key={index} style={styles.itemContainer}>
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
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#F5F5F5',
                      paddingHorizontal: 10,
                      paddingVertical: 6,
                      borderRadius: 5,
                      borderWidth: 0.9,
                      borderColor: '#D0D0D0',
                    }}>
                    <Text style={styles.btn}>Edit</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      backgroundColor: '#F5F5F5',
                      paddingHorizontal: 10,
                      paddingVertical: 6,
                      borderRadius: 5,
                      borderWidth: 0.9,
                      borderColor: '#D0D0D0',
                    }}>
                    <Text style={styles.btn}>Remove</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      backgroundColor: '#F5F5F5',
                      paddingHorizontal: 10,
                      paddingVertical: 6,
                      borderRadius: 5,
                      borderWidth: 0.9,
                      borderColor: '#D0D0D0',
                    }}>
                    <Text style={styles.btn}>Set as Default</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default AddressDetail;

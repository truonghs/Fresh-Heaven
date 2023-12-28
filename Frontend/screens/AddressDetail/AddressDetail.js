import {StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput} from 'react-native';
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
import CustomAlert from '../../components/CustomAlert/CustomAlert';
const AddressDetail = () => {
  const navigation = useNavigation();
  const [addressIdxRemove, setAddressIdxRemove] = useState([]);
  const [alertVisible, setAlertVisible] = useState(false);
  const {userId,currentUser, setCurrentUser} = useContext(userContext);
  const handleAlertDeleteAddress = (indexAddress) => {
    setAddressIdxRemove(indexAddress);
    setAlertVisible(true);
  };
  const handleDeleteAddress = () => {
    const newAddresses = currentUser.addresses.filter((address, index) => index !== addressIdxRemove);

    setCurrentUser({...currentUser, addresses: newAddresses});
    setAlertVisible(false);
    axios
      .put(`http://${Ip}:3000/setaddresses/${userId}`, newAddresses)
      .then((response) => {
        console.log('add location success');
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <View>
      <View style={{}}>
        {/* <Text style={styles.title}>Your Addresses</Text> */}

        <TouchableOpacity onPress={() => navigation.navigate('AddAddress')} style={styles.link}>
          <Text style={styles.linkTxt}>Add a new Address</Text>
          <MaterialIcons name="keyboard-arrow-right" size={24} color={COLORS.blue} />
        </TouchableOpacity>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* all the added adresses */}
          <View style={styles.scroll}>
            {currentUser.addresses?.map((item, index) => (
              <View key={index} style={styles.itemContainer}>
                <View style={styles.itemTitle}>
                  <Text style={styles.itemName}>Name: {item?.fullName}</Text>
                  <Entypo name="location-pin" size={24} color="red" />
                </View>
                <Text style={styles.itemTxt}>phone Number : {item?.phoneNumber}</Text>
                <Text style={styles.itemTxt}>{item.addressDetail}</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                    marginTop: 7,
                  }}
                >
                  <TouchableOpacity style={styles.btnContainer}>
                    <Text style={styles.btn}>Edit</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => handleAlertDeleteAddress(index)} style={styles.btnContainer}>
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
      <CustomAlert
        title={'Are you want to remove this product from your cart?'}
        setAlertVisible={setAlertVisible}
        alertVisible={alertVisible}
        leftBtnText={'Cancel'}
        rightBtnText={'Yes'}
        leftBtnFnc={() => setAlertVisible(false)}
        rightBtnFnc={() => handleDeleteAddress()}
      />
    </View>
  );
};

export default AddressDetail;

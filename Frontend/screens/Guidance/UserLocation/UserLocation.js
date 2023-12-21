import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  ImageBackground,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './UserLocation.style';
import CustomButton from '../../../components/CustomButton/CustomButton';
import {COLORS} from '../../../constants';
export default function UserLocation() {
  const {navigate} = useNavigation();
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.imageBackground}
        source={require('../../../assets/images/bgImage.png')}
      />
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => navigate('UserUploadPhoto')}>
          <Ionicons name="chevron-back" size={24} color={COLORS.brown} />
        </TouchableOpacity>
        <Text style={styles.title}>Set Your Location</Text>
        <Text style={styles.text}>
          This data will be displayed in your account profile for security
        </Text>

        <View style={styles.wrapper}>
          <View style={styles.subWrapper}>
            <Image
              style={styles.icon}
              source={require('../../../assets/images/location.png')}
            />
            <Text style={styles.mess}>Your location</Text>
          </View>
          <TouchableOpacity style={styles.btnSetLocation}>
            <Text style={styles.mess}>Set Location</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.btnNext}>
        <CustomButton
          text={'Next'}
          widh={150}
          onPress={() => navigate('Congratulations')}
        />
      </View>
    </View>
  );
}

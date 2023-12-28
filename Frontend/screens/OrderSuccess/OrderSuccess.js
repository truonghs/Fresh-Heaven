import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React, {useEffect} from 'react';
import LottieView from 'lottie-react-native';
import {useNavigation} from '@react-navigation/native';

const OrderSuccess = () => {
  const navigation = useNavigation();
  useEffect(() => {
    // setTimeout(() => {
    //   navigation.replace('BottomTabNavigation');
    // }, 2000);
  }, []);
  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <LottieView
        source={require('../../assets/animation/thumbs.json')}
        // ref={animation}
        style={{
          height: 260,
          width: 300,
          alignSelf: 'center',
          marginTop: 40,
          justifyContent: 'center',
        }}
        autoPlay
        loop={false}
        speed={0.7}
      />
      <Text
        style={{
          marginTop: 20,
          fontSize: 19,
          fontWeight: '600',
          textAlign: 'center',
        }}
      >
        Your Order Has been Recieved
      </Text>
      <LottieView
        source={require('../../assets/animation/sparkle.json')}
        style={{
          height: 300,
          position: 'absolute',
          top: 100,
          width: 300,
          alignSelf: 'center',
        }}
        autoPlay
        loop={false}
        speed={0.7}
      />
    </SafeAreaView>
  );
};

export default OrderSuccess;

const styles = StyleSheet.create({});

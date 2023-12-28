import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ProductDetail, AddAddress, AddressDetail, NewRivals, Confirm, OrderSuccess, Order} from '../screens';
import BottomTabNavigatior from './BottomTabNavigation';
import GuidanceStack from './GuidanceStack';
import AuthStack from './AuthStack';
import ForgotPassword from './ForgotPasswordStack';
import IntroStack from './IntroStack';
import Map from '../screens/Map/Map';
import {COLORS} from '../constants';
import font from '../assets/fonts/font';
const Stack = createNativeStackNavigator();
const StackNavigation = ({isFirstLaunch}) => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isFirstLaunch ? 'IntroStack' : 'AuthStack'}>
        <Stack.Screen name="IntroStack" component={IntroStack} options={{headerShown: false}} />
        <Stack.Screen name="AuthStack" component={AuthStack} options={{headerShown: false}} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{headerShown: false}} />
        <Stack.Screen name="GuidanceStack" component={GuidanceStack} options={{headerShown: false}} />
        <Stack.Screen name="BottomTabNavigation" component={BottomTabNavigatior} options={{headerShown: false}} />
        <Stack.Screen name="ProductDetail" component={ProductDetail} options={{headerShown: false}} />
        <Stack.Screen name="ProductList" component={NewRivals} options={{headerShown: false}} />
        <Stack.Screen name="Map" component={Map} options={{headerShown: false}} />
        <Stack.Screen
          name="AddAddress"
          component={AddAddress}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: COLORS.thirth,
            },
            headerTitleStyle: {
              fontFamily: font.bold,
            },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="AddressDetail"
          component={AddressDetail}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: COLORS.thirth,
            },
            headerTitleStyle: {
              fontFamily: font.bold,
            },
            headerTintColor: '#fff',
            title: 'All Addresses',
          }}
        />
        <Stack.Screen
          name="Confirm"
          component={Confirm}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: COLORS.thirth,
            },
            headerTitleStyle: {
              fontFamily: font.bold,
            },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="Order"
          component={Order}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: COLORS.thirth,
            },
            headerTitleStyle: {
              fontFamily: font.bold,
            },
            headerTintColor: '#fff',
            // headerShown: false,
          }}
        />
        <Stack.Screen name="OrderSuccess" component={OrderSuccess} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;

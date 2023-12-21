import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  Cart,
  ProductDetail,
  Login,
  Register,
  AddAddress,
  AddressDetail,
  NewRivals,
  Confirm,
  Order,
  VnPay,
  Congratulations
} from '../screens';
import BottomTabNavigatior from './BottomTabNavigation';
import GuidanceStack from './GuidanceStack';
import {COLORS} from '../constants';
import font from '../assets/fonts/font';

const Stack = createNativeStackNavigator();
const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="GuidanceStack">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false, presentation: 'transparentModal'}}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{headerShown: false, presentation: 'transparentModal'}}
        />
        <Stack.Screen
          name="GuidanceStack"
          component={GuidanceStack}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BottomTabNavigation"
          component={BottomTabNavigatior}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Cart"
          component={Cart}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: COLORS.thirth,
            },
            headerTitleStyle: {
              fontFamily: font.bold,
            },
            headerTintColor: '#fff',
            title: 'Cart',
          }}
        />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetail}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ProductList"
          component={NewRivals}
          options={{headerShown: false}}
        />
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
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="VnPay"
          component={VnPay}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;

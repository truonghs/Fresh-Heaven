import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Cart, ProductDetail, Login, Register, AddAddress} from '../screens';
import BottomTabNavigatior from './BottomTabNavigation';
import {COLORS} from '../constants';

const Stack = createNativeStackNavigator();
const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
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
          name="BottomTabNavigation"
          component={BottomTabNavigatior}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Cart"
          component={Cart}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetail}
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
            headerTintColor: '#fff',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;

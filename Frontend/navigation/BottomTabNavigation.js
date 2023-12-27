import React, {useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home, Profile, Search, Cart, Menu} from '../screens';
import Icon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {COLORS} from '../constants';
import {cartContext} from '../Context/CartContext';
import font from '../assets/fonts/font';
const Tab = createBottomTabNavigator();
const screenOptions = {
  tabBarShowLabel: true,
  tabBarHideOnKeyboard: true,
  headerShown: false,
  tabBarStyle: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 50,
  },
  tabBarActiveTintColor: COLORS.primary,
  tabBarLabelStyle: {
    fontFamily: font.semiBold,
    fontWeight: 'bold',
    fontSize: 14,
    top: -2,
  },
};
function BottomTabNavigatior() {
  const {cartData} = useContext(cartContext);
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => {
            return <Icon name={focused ? 'home' : 'home-outline'} size={24} color={focused ? COLORS.primary : COLORS.gray2} />;
          },
          tabBarLabelStyle: {
            fontFamily: font.semiBold,
            top: -2,
            fontSize: 12,
          },
          freezeOnBlur: true,
        }}
      />

      <Tab.Screen
        name="Menu"
        component={Menu}
        options={{
          tabBarIcon: ({focused}) => {
            return <Feather name={'shopping-bag'} size={24} color={focused ? COLORS.primary : COLORS.gray2} />;
          },
          freezeOnBlur: true,
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarBadge: cartData.cart.products?.length ? cartData.cart.products?.length : 0,
          tabBarBadgeStyle: {
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 1,
          },

          tabBarIcon: ({focused}) => {
            return <Icon name={focused ? 'cart' : 'cart-outline'} size={24} color={focused ? COLORS.primary : COLORS.gray2} />;
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => {
            return <Icon name={focused ? 'person' : 'person-outline'} size={24} color={focused ? COLORS.primary : COLORS.gray2} />;
          },
          freezeOnBlur: true,
        }}
      />
    </Tab.Navigator>
  );
}

export default React.memo(BottomTabNavigatior);

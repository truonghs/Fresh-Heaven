import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Cart, ProductDetail, Login, Register} from './screens';
import BottomTabNavigatior from './navigation/BottomTabNavigation';

const Stack = createNativeStackNavigator();

function App() {
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

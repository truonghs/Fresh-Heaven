import {View, Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Login, Register} from '../screens';

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
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
    </Stack.Navigator>
  );
}

export default AuthStack;

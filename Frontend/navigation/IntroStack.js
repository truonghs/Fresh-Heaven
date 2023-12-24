import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Intro2 from '../screens/Intro/Intro2';
import Intro1 from '../screens/Intro/Intro1';

function IntroStack() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName="Intro1">
      <Stack.Screen
        name="Intro1"
        component={Intro1}
        options={{headerShown: false, presentation: 'transparentModal'}}
      />
      <Stack.Screen
        name="Intro2"
        component={Intro2}
        options={{headerShown: false, presentation: 'transparentModal'}}
      />
    </Stack.Navigator>
  );
}

export default IntroStack;

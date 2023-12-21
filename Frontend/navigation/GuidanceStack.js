import {View, Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UserInfo from '../screens/Guidance/UserInfo/UserInfo';
import UserPaymentMethod from '../screens/Guidance/UserPaymentMethod/UserPaymentMethod';
import UserUploadPhoto from '../screens/Guidance/UserUploadPhoto/UserUploadPhoto';
import UserLocation from '../screens/Guidance/UserLocation/UserLocation';
import Congratulations from '../screens/Congratulations/Congratulations';
const Stack = createNativeStackNavigator();

function GuidanceStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="UserInfo"
        component={UserInfo}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UserPaymentMethod"
        component={UserPaymentMethod}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UserUploadPhoto"
        component={UserUploadPhoto}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UserLocation"
        component={UserLocation}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Congratulations"
        component={Congratulations}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default GuidanceStack;

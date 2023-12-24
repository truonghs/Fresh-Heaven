import {View, Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UserInfo from '../screens/Guidance/UserInfo/UserInfo';
import EnterEmail from '../screens/ForgotPassword/EnterEmail/EnterEmail';
import EnterOTP from '../screens/ForgotPassword/EnterOTP/EnterOTP';
import EnterNewPassword from '../screens/ForgotPassword/EnterNewPassword/EnterNewPassword';

const Stack = createNativeStackNavigator();

function ForgotPassword() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="EnterEmail"
        component={EnterEmail}
        options={{headerShown: false, presentation: 'transparentModal'}}
      />
      <Stack.Screen
        name="EnterOTP"
        component={EnterOTP}
        options={{headerShown: false, presentation: 'transparentModal'}}
      />
      <Stack.Screen
        name="EnterNewPassword"
        component={EnterNewPassword}
        options={{headerShown: false, presentation: 'transparentModal'}}
      />
    </Stack.Navigator>
  );
}

export default ForgotPassword;

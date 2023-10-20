import * as React from 'react';
import {Dimensions, Text, View} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

function App() {
  return (
    <View style={{flex: 1}}>
      <Carousel
        loop
        width={300}
        height={300 / 2}
        autoPlay={true}
        data={[...new Array(6).keys()]}
        scrollAnimationDuration={1000}
        onSnapToItem={index => console.log('current index:', index)}
        renderItem={({index}) => (
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              justifyContent: 'center',
            }}>
            <Text style={{textAlign: 'center', fontSize: 30}}>{index}</Text>
          </View>
        )}
      />
    </View>
  );
}

export default App;

// import {NavigationContainer} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import React from 'react';
// import {Cart} from './screens';
// import BottomTabNavigatior from './navigation/BottomTabNavigation';

// const Stack = createNativeStackNavigator();

// function App(): JSX.Element {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen
//           name="BottomTabNavigation"
//           component={BottomTabNavigatior}
//           options={{headerShown: false}}
//         />
//         <Stack.Screen
//           name="Cart"
//           component={Cart}
//           options={{headerShown: false}}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// export default App;

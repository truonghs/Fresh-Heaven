import StackNavigation from './navigation/StackNavigation';
import {CartProvider} from './Context/CartContext';
import {ProductsProvider} from './Context/ProductContext';
import {UserProvider} from './Context/UserContext';
import SplashScreen from 'react-native-splash-screen';
import {useContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Intro} from './screens';
import IntroStack from './navigation/IntroStack';

function App() {
  const [isFirstLaunch, setIsFirstLaunch] = useState('loading');
  useEffect(() => {
    const checkFirstLaunch = async () => {
      try {
        const value = await AsyncStorage.getItem('isFirstLaunch');
        if (!value) {
          // Ứng dụng được khởi động lần đầu tiên
          setIsFirstLaunch(true);
          SplashScreen.hide();

          await AsyncStorage.setItem('isFirstLaunch', 'true');
        } else {
          setIsFirstLaunch(false);
          SplashScreen.hide();
        }
      } catch (error) {
        console.error('Error checking first launch:', error);
      }
    };

    checkFirstLaunch();
  }, []);
  if (isFirstLaunch != 'loading') {
    return (
      <UserProvider>
        <ProductsProvider>
          <CartProvider>
            <StackNavigation isFirstLaunch={isFirstLaunch} />
          </CartProvider>
        </ProductsProvider>
      </UserProvider>
    );
  }
}

export default App;

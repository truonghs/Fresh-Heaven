import StackNavigation from './navigation/StackNavigation';
import {CartProvider} from './Context/CartContext';
import {ProductsProvider} from './Context/ProductContext';
import {UserProvider} from './Context/UserContext';
import SplashScreen from 'react-native-splash-screen';

function App() {
  SplashScreen.hide();
  return (
    <UserProvider>
      <ProductsProvider>
        <CartProvider>
          <StackNavigation />
        </CartProvider>
      </ProductsProvider>
    </UserProvider>
  );
}

export default App;

import {Provider} from 'react-redux';
import StackNavigation from './navigation/StackNavigation';
import store from './store';
import {UserContext} from './UserContext';
import SplashScreen from 'react-native-splash-screen';

function App() {
  SplashScreen.hide();
  return (
    <Provider store={store}>
      <UserContext>
        <StackNavigation />
      </UserContext>
    </Provider>
  );
}

export default App;

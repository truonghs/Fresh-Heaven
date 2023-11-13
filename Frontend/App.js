import {Provider} from 'react-redux';
import StackNavigation from './navigation/StackNavigation';
import store from './store';
import {UserContext} from './UserContext';

function App() {
  return (
    <Provider store={store}>
      <UserContext>
        <StackNavigation />
      </UserContext>
    </Provider>
  );
}

export default App;

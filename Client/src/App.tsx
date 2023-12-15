import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import './App.css';
import Navigator from './navigators';
import { persistor, store } from './redux/store';

const App = () => {
  return (
    <Provider store={store} >
      <PersistGate loading={null} persistor={persistor}>
        <div className="App">
          <Navigator />
        </div>
      </PersistGate>
    </Provider>
  );
};

export default App;

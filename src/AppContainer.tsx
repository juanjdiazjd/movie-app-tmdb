import React from 'react';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import { toastConfig } from './core/configs/config';
import { persistor, store } from './redux/store';

const AppContainer: React.FC = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
    <Toast config={toastConfig} />
  </Provider>
);

export default AppContainer;

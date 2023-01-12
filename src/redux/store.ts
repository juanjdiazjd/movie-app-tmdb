import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore,combineReducers } from "@reduxjs/toolkit";
import authReducer from './auth/slices'
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['authState']
}

const rootReducer = combineReducers({
    authState: authReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
})

export const persistor = persistStore(store)
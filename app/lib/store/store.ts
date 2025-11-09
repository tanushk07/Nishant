import { configureStore } from '@reduxjs/toolkit';
import tokenReducer from './slices/tokenSlice';
import uiReducer from './slices/tokenSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      tokens: tokenReducer,
      ui: uiReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

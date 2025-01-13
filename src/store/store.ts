import { configureStore } from '@reduxjs/toolkit';
import toolsReducer from './toolsSlice';
import themeReducer from './themeSlice';

export const store = configureStore({
  reducer: {
    tools: toolsReducer,
    theme: themeReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
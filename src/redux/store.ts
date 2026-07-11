import { configureStore } from "@reduxjs/toolkit";

import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistStore,
} from "redux-persist";
import authReducer from "./features/auth/authSlice";
import sectionGenerationReducer from "./features/sectionGeneration/sectionGenerationSlice";
import storage from "redux-persist/lib/storage";
import sessionStorage from "redux-persist/lib/storage/session";
import { baseApi } from "./api/baseApi";

const persistConfig = {
  key: "auth",
  storage,
};

const sectionGenerationPersistConfig = {
  key: "sectionGeneration",
  storage: sessionStorage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedSectionGenerationReducer = persistReducer(
  sectionGenerationPersistConfig,
  sectionGenerationReducer
);

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: persistedAuthReducer,
    sectionGeneration: persistedSectionGenerationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware), // Make sure to concatenate the baseApi.middleware properly
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);

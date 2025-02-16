import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import pollsReducer from "../reducer/pollsSlice"

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["polls"],
};

const rootReducer = combineReducers({
  polls: pollsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

// For making the store fluid
// persistor.purge()

export default store;

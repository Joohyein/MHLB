import { configureStore } from "@reduxjs/toolkit";
import websocketReducer from "../modules/websocket";

const store = configureStore({
  reducer: {
    websocket : websocketReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
  }),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

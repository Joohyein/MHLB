import { createSlice } from "@reduxjs/toolkit";

const websocketSlice = createSlice({
  name: "websocket",
  initialState : {
    stompClient: {},
  },
  reducers: {
    setStompClient: (state, action) => {
        state.stompClient = action.payload;
    }
  },
  extraReducers: {},
});

export default websocketSlice.reducer;
export const { setStompClient } = websocketSlice.actions;
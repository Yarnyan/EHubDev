import { createSlice } from '@reduxjs/toolkit'

interface ChatSliceState {
    activeUser: {
        title: string;
        avatar: string;
        status: string;
    } | null;
}

const initialState: ChatSliceState = {
    activeUser: null,
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setActiveUser: (state, action) => {
      state.activeUser = action.payload;
    },
  },
})

export const { setActiveUser } = chatSlice.actions;

export default chatSlice.reducer;

import { createSlice } from '@reduxjs/toolkit'

interface ChatSliceState {
    activeUser: {
        id: number;
        title: string;
        avatar: string;
        status: string;
    } | null;
    activeId: string | null; 
    activeChatId: number,
}

const initialState: ChatSliceState = {
    activeUser: null,
    activeId: null, 
    activeChatId: 1,
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setActiveUser: (state, action) => {
      state.activeUser = action.payload;
    },
    setActiveId: (state, action) => { 
      state.activeId = action.payload;
    },
    setActiveChatId: (state, action) => {
      state.activeChatId = action.payload
    }
  },
})

export const { setActiveUser, setActiveId, setActiveChatId } = chatSlice.actions;

export default chatSlice.reducer;

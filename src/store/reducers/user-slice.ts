import { createSlice } from '@reduxjs/toolkit'
import { User } from '../../models/User.ts'

interface UserSliceState {
  //получаем юзера по токену
  user: User | null | 'unknown'
}

const initialState: UserSliceState = {
  user: {
    type: 'company',
    id: '111'
  }
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
})

export default userSlice.reducer
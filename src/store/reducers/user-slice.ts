import { createSlice } from '@reduxjs/toolkit'
import { User } from '../../models/User.ts'

interface UserSliceState {
  user: User | null | 'unknown'
}

const initialState: UserSliceState = {
  // user: {
  //   type: 'user',
  //   name: 'root',
  //   id: 111
  // }
  user: 'unknown'
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
})

export default userSlice.reducer
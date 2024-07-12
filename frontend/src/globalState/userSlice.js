import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  username: "",
  bLoggedIn : false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.username = action.payload
      state.bLoggedIn = true      
    },
    logout: (state) => {
      state.username = ""
      state.bLoggedIn = false    
    },    
  },
})

export const { login, logout } = userSlice.actions
export default userSlice.reducer
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import setAuthToken from '../utils/setAuthToken'
import axios from 'axios';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: false,
  user: null
}

export const loadUser = createAsyncThunk(
  'auth/loadUser',
  async (_, { rejectWithValue }) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.get('http://localhost:5000/api/auth/me');
      return res.data
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  })

  export const registerUser  = createAsyncThunk(
    'auth/registerUser',
    async ( newUser , { rejectWithValue , dispatch }) => {
      
      try {
        const config = { headers: { 'Content-Type': 'application/json' } }
        const body = JSON.stringify(newUser);
        const res = await axios.post('http://localhost:5000/api/auth/register', body, config);
        dispatch(loadUser(newUser))
        
        return res.data
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    })



export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(loadUser.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.token = localStorage.setItem('token', action.payload.token)
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
  }
})

// Action creators are generated for each case reducer function
export const { } = authSlice.actions

export default authSlice.reducer
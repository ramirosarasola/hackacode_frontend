import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  games: [],
  isLoading: false,
};

export const createGame = createAsyncThunk(
  'games/createGame',
  async (gameFormData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const response = await axios.post(
        'http://localhost:5000/api/games/register',
        gameFormData,
        config
      );

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getGames = createAsyncThunk(
  'games/getGames',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:5000/api/games');
      console.log(response.data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const gameSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getGames.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGames.fulfilled, (state, action) => {
        state.isLoading = false;
        state.games = action.payload;
      })
      .addCase(getGames.rejected, (state) => {
        state.isLoading = false;
        state.games = [];
      })
      .addCase(createGame.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createGame.fulfilled, (state, action) => {
        state.isLoading = false;
        state.games.push(action.payload);
      })
      .addCase(createGame.rejected, (state) => {
        state.isLoading = false;
        state.games = [];
      });
  },
});

export const { actios } = gameSlice.actions;

export default gameSlice.reducer;

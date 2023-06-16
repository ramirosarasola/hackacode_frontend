import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  games: [],
  isLoading: false,
};

export const createGame = createAsyncThunk(
  'games/createGame',
  async (game, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const body = JSON.stringify(game);
      const response = await axios.post(
        'http://localhost:5000/api/games/register',
        body,
        config
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const uploadPhoto = createAsyncThunk(
  'games/uploadPhoto',
  async ({ id, file }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.put(
        `http://localhost:5000/api/games/${id}/photo`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (!response || !response.data) {
        throw new Error('Invalid response received');
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
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
      })
      .addCase(uploadPhoto.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadPhoto.fulfilled, (state, action) => {
        state.isLoading = false;
        const game = state.games.find(
          (game) => game._id === action.payload._id
        );
        if (game) {
          game.photo = action.payload.photo;
        }
      })
      .addCase(uploadPhoto.rejected, (state) => {
        state.isLoading = false;
        state.games = [];
      });
  },
});

export const {} = gameSlice.actions;

export default gameSlice.reducer;

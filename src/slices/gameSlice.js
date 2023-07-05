import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  games: [],
  isLoading: false,
  expandedCards: {},
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

export const getGame = createAsyncThunk(
  'games/getGame',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/games/${id}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteGame = createAsyncThunk(
  'games/deleteGame',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:5000/api/games/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const editGame = createAsyncThunk(
  'games/editGame',
  async (game, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/games/${game.id}`,
        game
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const gameSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    toggleSeeMore(state, action) {
      const gameId = action.payload;
      state.expandedCards[gameId] = !state.expandedCards[gameId];
      console.log(JSON.stringify(state.expandedCards));
    },
  },
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
      })
      .addCase(getGame.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGame.fulfilled, (state, action) => {
        state.isLoading = false;
        const game = state.games.find(
          (game) => game._id === action.payload._id
        );
        if (game) {
          Object.assign(game, action.payload);
        }
      })
      .addCase(getGame.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteGame.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteGame.fulfilled, (state, action) => {
        state.isLoading = false;
        state.games = state.games.filter((game) => game._id !== action.payload);
      })
      .addCase(deleteGame.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(editGame.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editGame.fulfilled, (state, action) => {
        state.isLoading = false;
        const editedGame = action.payload;
        const index = state.games.findIndex((game) => game._id === editedGame._id);
        if (index !== -1) {
          state.games[index] = editedGame;
        }
      })
      .addCase(editGame.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { toggleSeeMore } = gameSlice.actions;

export default gameSlice.reducer;

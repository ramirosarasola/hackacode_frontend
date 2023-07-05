import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  games: [],
  isLoading: false,
  expandedCards: {},
  tickets: null,
  moreTicketsTodayGame: null,
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

//Get all the tickets for all games in a specific date

export const ticketsForGamesByDate = createAsyncThunk(
  'games/ticketsForGamesByDate',
  async ({ year, month, day }, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/games/tickets-sold-by-date?year=${year}&month=${month}&day=${day}`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//Get the Game that sold more Tickets until today´s Date
export const gameWithMoreTicketsToday = createAsyncThunk(
  'games/gameWithMoreTicketsToday',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        'http://localhost:5000/api/games/most-tickets'
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

/* export const ticketsForAGameByDate = createAsyncThunk(
  'games/ticketsForAGameByDate',
  async ({ gameId, year, month, day }, { rejectWithValue }) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/games/${gameId}`);
    } catch {}
  }
); */

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
      .addCase(ticketsForGamesByDate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(ticketsForGamesByDate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tickets = action.payload.data;
      })
      .addCase(ticketsForGamesByDate.rejected, (state) => {
        state.isLoading = false;
        state.tickets = null;
      })
      .addCase(gameWithMoreTicketsToday.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(gameWithMoreTicketsToday.fulfilled, (state, action) => {
        state.isLoading = false;
        state.moreTicketsTodayGame = action.payload.data;
      })
      .addCase(gameWithMoreTicketsToday.rejected, (state) => {
        state.isLoading = false;
        state.moreTicketsTodayGame = null;
      });
  },
});

export const { toggleSeeMore } = gameSlice.actions;

export default gameSlice.reducer;

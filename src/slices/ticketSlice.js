import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
// import { Alert } from '../components/UI/alert';

const initialState = {
  tickets: [],
  loading: false,
  error: null,
}

export const createTicket = createAsyncThunk(
  'tickets/createTicket',
  async ({customerId, gameId, dueDate}, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const body = JSON.stringify({ customerId, gameId, dueDate });
      const response = await axios.post(
        'http://localhost:5000/api/tickets/create',
        body,
        config
      );
      console.log('tickets created successfully');
      console.log(response.data.data);
      return response.data;
    } catch (error) {
      console.warn('error creating tickets');
      return rejectWithValue(error.response.data);
    }
  }
);

export const getTickets = createAsyncThunk(
  'tickets/getTickets',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:5000/api/tickets');
      // console.log(response.data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getTicket = createAsyncThunk(
  'tickets/getTicket',
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/tickets/${id}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const ticketSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTickets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTickets.fulfilled, (state, action) => {
        state.loading = false;
        state.tickets = action.payload;
      })
      .addCase(getTickets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createTicket.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTicket.fulfilled, (state, action) => {
        state.loading = false;
        state.tickets.push(action.payload);
      })
      .addCase(createTicket.rejected, (state) => {
        state.loading = false;
        state.tickets = [];
      })
  },
});

export default ticketSlice.reducer;
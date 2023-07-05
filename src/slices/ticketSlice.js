import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
// import { Alert } from '../components/UI/alert';

const initialState = {
  tickets: [],
  loading: false,
  error: null,
  ticketsByGame:null,
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

export const getTicketsByGameAndDate = createAsyncThunk(
  'tickets/getTicketsByGameAndDate',
  async ({id , year, month, day }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/games/${id}/tickets-by-game?year=${year}&month=${month}&day=${day}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteTicket = createAsyncThunk(
  'tickets/deleteTicket',
  async (id, { rejectWithValue }) => {
    try {
      const confirmDelete = await ConfirmAlert(
        'Delete Ticket',
        'Are you sure you want to delete this ticket?',
        'Delete',
        'Cancel'
      );
      if (confirmDelete) {
        await axios.delete(`http://localhost:5000/api/tickets/${id}`);
        Alert('success', 'Ticket deleted successfully');
        return id;
      } else {
        return rejectWithValue('Cancelled');
      }
    } catch (error) {
      Alert('error', 'Sorry, try again');
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateTicket = createAsyncThunk(
  'tickets/updateTickets',
  async ({ id, ticketData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/tickets/${id}`,
        ticketData
      );
      Alert('success', 'Ticket updated successfully');
      return response.data.data;
    } catch (error) {
      Alert('error', 'Sorry, try again');
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
      .addCase(getTicketsByGameAndDate.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTicketsByGameAndDate.fulfilled, (state, action) => {
        state.loading = false;
        state.ticketsByGame = action.payload.data;
      })
      .addCase(getTicketsByGameAndDate.rejected, (state) => {
        state.loading = false;
        state.ticketsByGame = null;
        
      })
  },
});

export default ticketSlice.reducer;
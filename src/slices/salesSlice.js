import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Alert } from '../components/UI/alert';
import axios from 'axios';

const initialState = {
  sales: [],
  loading: false,
  error: null,
}

export const newSale = createAsyncThunk(
  'sales/newSale',
  async (tickets, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const body = JSON.stringify(tickets);
      const response = await axios.post(
        'http://localhost:5000/api/sales',
        body,
        config
      );
      Alert("success", "Sale created succesfully")
      return response.data;
    } catch (error) {
      Alert("error", "Sorry, try again")
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchSales = createAsyncThunk(
  'sales/fetchSales',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:5000/api/sales');
      // console.log(response.data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getSale = createAsyncThunk(
  'sales/getSale',
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/sales/${id}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



export const updateSale = createAsyncThunk(
  'sales/updateSale',
  async ({ id, saleData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/sales/${id}`, saleData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteSale = createAsyncThunk(
  'sales/deleteSale',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:5000/api/sales/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const saleSlice = createSlice({
  name: 'sales',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSales.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSales.fulfilled, (state, action) => {
        state.loading = false;
        state.sales = action.payload;
      })
      .addCase(fetchSales.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(newSale.pending, (state) => {
        state.loading = true;
      })
      .addCase(newSale.fulfilled, (state, action) => {
        state.loading = false;
        state.sales.push(action.payload);
      })
      .addCase(newSale.rejected, (state) => {
        state.loading = false;
        state.sales = [];
      })
      .addCase(updateSale.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSale.fulfilled, (state, action) => {
        state.loading = false;
        const updatedSale = action.payload;
        const index = state.sales.findIndex(sale => sale._id === updatedSale._id);
        if (index !== -1) {
          state.sales[index] = updatedSale;
        }
      })
      .addCase(updateSale.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteSale.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSale.fulfilled, (state, action) => {
        state.loading = false;
        const deletedSaleId = action.payload;
        state.sales = state.sales.filter(sale => sale._id !== deletedSaleId);
      })
      .addCase(deleteSale.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default saleSlice.reducer;
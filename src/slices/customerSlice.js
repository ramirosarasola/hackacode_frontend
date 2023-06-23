import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Alert } from '../components/UI/alert';
import axios from 'axios';

const initialState = {
  customers: [],
  loading: false,
  error: null,
}

export const registerCustomer = createAsyncThunk(
  'auth/registerCustomer',
  async (newCustomer, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const body = JSON.stringify(newCustomer);
      const response = await axios.post(
        'http://localhost:5000/api/customers/register',
        body,
        config
      );
      Alert("success", "Customer created succesfully")
      return response.data;
    } catch (error) {
      Alert("error", "Sorry, try again")
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchCustomers = createAsyncThunk(
  'customers/fetchCustomers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:5000/api/customers');
      // console.log(response.data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getCustomer = createAsyncThunk(
  'customers/getCustomer',
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/customers/${id}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



export const updateCustomer = createAsyncThunk(
  'customers/updateCustomer',
  async ({ id, customerData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/customers/${id}`, customerData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteCustomer = createAsyncThunk(
  'customers/deleteCustomer',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:5000/api/customers/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const customerSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = action.payload;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        state.loading = false;
        const updatedCustomer = action.payload;
        const index = state.customers.findIndex(customer => customer._id === updatedCustomer._id);
        if (index !== -1) {
          state.customers[index] = updatedCustomer;
        }
      })
      .addCase(updateCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.loading = false;
        const deletedCustomerId = action.payload;
        state.customers = state.customers.filter(customer => customer._id !== deletedCustomerId);
      })
      .addCase(deleteCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default customerSlice.reducer;
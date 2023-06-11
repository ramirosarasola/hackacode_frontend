import { configureStore } from '@reduxjs/toolkit';
import {authSlice} from '../slices/authSlice';
import { uiSlice } from '../slices/uiSlice';
import { employeeSlice } from '../slices/employeeSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    ui: uiSlice.reducer,
    employees: employeeSlice.reducer,
  },
})
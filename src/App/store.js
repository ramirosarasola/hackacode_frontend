import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from '../slices/authSlice';
import { uiSlice } from '../slices/uiSlice';
import { employeeSlice } from '../slices/employeeSlice';
import { userSlice } from '../slices/userSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    ui: uiSlice.reducer,
    employees: employeeSlice.reducer,
    users: userSlice.reducer,
  },
});

import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from '../slices/authSlice';
import { uiSlice } from '../slices/uiSlice';
import { employeeSlice } from '../slices/employeeSlice';
import { userSlice } from '../slices/userSlice';
import { gameSlice } from '../slices/gameSlice';
import { customerSlice } from '../slices/customerSlice';
import { saleSlice } from "../slices/saleSlice";
import {ticketSlice} from '../slices/ticketSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    ui: uiSlice.reducer,
    employees: employeeSlice.reducer,
    users: userSlice.reducer,
    games: gameSlice.reducer,
    customers: customerSlice.reducer,
    sales: saleSlice.reducer,
    tickets: ticketSlice.reducer,
  },
});

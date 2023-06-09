import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isMenuOpen: false,
  isHidden: false,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggle(state, action) {
      const gameId = action.payload;
      console.log(gameId);
      state.isMenuOpen = !state.isMenuOpen;
    },

    toggleVisibility(state) {
      state.isHidden = !state.isHidden;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;

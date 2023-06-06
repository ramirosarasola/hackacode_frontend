import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isMenuOpen: false
}

export const uiSlice = createSlice({
    name:'ui',
    initialState,
    reducers:{
        toggle(state){
            state.isMenuOpen = !state.isMenuOpen;
        }
    }
})

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;
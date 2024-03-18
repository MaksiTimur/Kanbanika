import { createSlice } from "@reduxjs/toolkit";

export const dragSlice = createSlice({
    name: 'drag',
    initialState: {},
    reducers: {
        setCurrentCard: (state, action) => {
            state.currentTask = action.payload;
        }
    }
});

export const {
    setCurrentCard
} = dragSlice.actions;

export default dragSlice.reducer;
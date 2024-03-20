import { createSlice } from "@reduxjs/toolkit";

export const currentSlice = createSlice({
    name: 'current',
    initialState: {},
    reducers: {
        setCurrentTask: (state, action) => {
            state.currentTask = action.payload;
        },
        setCurrentColumn: (state, action) => {
            state.currentColumn = action.payload;
        }
    }
});

export const {
    setCurrentTask,
    setCurrentColumn
} = currentSlice.actions;

export default currentSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

export const columnsSlice = createSlice({
	name: 'modal',
	initialState: false,
	reducers: {
		show: (state, action) => {
            return state = action.payload;
		}
	}
});

export const {
	show
} = columnsSlice.actions;

export default columnsSlice.reducer;
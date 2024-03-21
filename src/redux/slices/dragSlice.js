import { createSlice } from "@reduxjs/toolkit";

export const dragSlice = createSlice({
	name: 'drag',
	initialState: {item: null, isDragging: false},
	reducers: {
		setDraggable: (state, action) => {
            state.item = action.payload;
		},
        setDragging:  (state, action) => {
            state.isDragging = action.payload;
		}
	}
});

export const {
	setDraggable,
    setDragging
} = dragSlice.actions;

export default dragSlice.reducer;
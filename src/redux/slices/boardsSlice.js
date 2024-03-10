import { createSlice, current } from "@reduxjs/toolkit";

export const boardsSlice = createSlice({
	name: 'boards',
	initialState: JSON.parse(localStorage.getItem('boards')) ?? [],
	reducers: {
		create: (state, action) => {
			const newBoard = { title: action.payload.title, id: self.crypto.randomUUID() };

			state.push(newBoard);

			localStorage.setItem('boards', JSON.stringify(current(state)));
		}
	}
});

export const {
	create
} = boardsSlice.actions;

export default boardsSlice.reducer;
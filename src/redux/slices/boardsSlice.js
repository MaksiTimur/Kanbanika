import { createSlice, current } from "@reduxjs/toolkit";

export const boardsSlice = createSlice({
	name: 'boards',
	initialState: JSON.parse(localStorage.getItem('boards')) ?? { boards: [], current: null },
	reducers: {
		setCurrent: (state, action) => {
			state.current = action.payload;
		},
		create: (state, action) => {
			const newBoard = { title: action.payload.title, id: self.crypto.randomUUID() };

			state.boards.push(newBoard);

			localStorage.setItem('boards', JSON.stringify(current(state)));
		},
		setTitle: (state, action) => {
			const board = state.boards.find(board => board.id === action.payload.id)

			board.title = action.payload.value;

			localStorage.setItem('boards', JSON.stringify(current(state)));
		}
	}
});

export const {
	setCurrent,
	create,
	setTitle
} = boardsSlice.actions;

export default boardsSlice.reducer;
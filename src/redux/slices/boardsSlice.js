import { createSlice, current } from "@reduxjs/toolkit";

export const boardsSlice = createSlice({
	name: 'boards',
	initialState: JSON.parse(localStorage.getItem('boards')) ?? { boards: [], current: null },
	reducers: {
		setCurrent: (state, action) => {
			state.current = action.payload;
		},
		create: (state, action) => {
			const newBoard = { type: "board", title: action.payload.title, id: self.crypto.randomUUID() };

			state.boards.push(newBoard);

			localStorage.setItem('boards', JSON.stringify(current(state)));
		},
		remove: (state, action) => {
			const board = action.payload;
			const boardInState = state.boards.find(stateBoard => stateBoard.id === board.id);
			const boardIndex = state.boards.indexOf(boardInState);

			state.boards.splice(boardIndex, 1);
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
	remove,
	setTitle
} = boardsSlice.actions;

export default boardsSlice.reducer;